type VercelRequest = { method?: string; body?: { question?: unknown } };
type VercelResponse = { status: (code: number) => { json: (payload: unknown) => unknown } };

const PROFILE_PDF_PATH = "/All_about_Firoz.pdf";

const PROFILE_CONTEXT = `
You are Abdullah Firoj's portfolio assistant. Answer only from this profile context.
Abdullah Firoj is a Computer Science and Engineering graduate from United International University with a major in Data Science.
He is a full-stack MERN/PERN developer, AI/ML engineer, generative AI developer, and researcher.
He builds ResearchPilot AI, an AI employee onboarding platform, LumenLearner, CareerForge AI, airline management software, and a medical information platform.
His research includes Energy-Aware Tool Discovery for Agentic AI with the Model Context Protocol (MCP), sustainable computing, AI security, and multimodal audio-visual deepfake detection with human-in-the-loop verification.
His stack includes Java, Python, JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, MongoDB, MySQL, Prisma, PyTorch, TensorFlow, OpenCV, Gemini, RAG, embeddings, semantic search, vector search, Git, Docker, and Vercel.
He enjoys football, video games, cooking, gardening, movies and series, and listening to music.
If the answer is not in this context, say that the information is not listed on the portfolio. Do not invent personal details, contact information, achievements, or links.
Answer in complete, natural sentences using only information from the attached PDF. Answer the question directly, and never return an unfinished phrase or sentence fragment. If the PDF does not contain the answer, say: "That information is not listed in the profile."
`;

function isCompleteAnswer(answer: string) {
  return /[.!?)]$/.test(answer.trim());
}

async function getProfilePdf() {
  const configuredUrl = process.env.PROFILE_PDF_URL?.trim();
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173";
  const profilePdfUrl = configuredUrl && !configuredUrl.includes("example.com")
    ? configuredUrl
    : `${baseUrl}${PROFILE_PDF_PATH}`;
  const pdfResponse = await fetch(profilePdfUrl);
  if (!pdfResponse.ok) return undefined;

  const pdf = await pdfResponse.arrayBuffer();
  return Buffer.from(pdf).toString("base64");
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Only POST requests are supported." });
  }

  const question = typeof request.body?.question === "string" ? request.body.question.trim() : "";
  if (!question || question.length > 500) {
    return response.status(400).json({ error: "Please send a question under 500 characters." });
  }

  if (/\b(resume|cv|curriculum vitae)\b/i.test(question)) {
    return response.status(200).json({
      answer: "Download Abdullah's resume",
      link: "/Resume.pdf",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: "Gemini is not configured yet. Add GEMINI_API_KEY to the deployment environment." });
  }

  try {
    const profilePdf = await getProfilePdf();
    const configuredModel = process.env.GEMINI_MODEL?.trim();
    const models = [configuredModel, "gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.5-flash-lite"].filter(
      (model, index, allModels): model is string => Boolean(model) && allModels.indexOf(model) === index,
    );
    let lastStatus = 502;

    for (const model of models) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: `${PROFILE_CONTEXT}\n\nUse the attached profile PDF as the primary source for the answer. Write one or two complete sentences and finish with punctuation.\nQuestion: ${question}` },
                ...(profilePdf ? [{ inlineData: { mimeType: "application/pdf", data: profilePdf } }] : []),
              ],
            }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 500 },
          }),
        },
      );
      lastStatus = geminiResponse.status;
      const result = (await geminiResponse.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const answer = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (geminiResponse.ok && answer && isCompleteAnswer(answer)) return response.status(200).json({ answer: answer.trim() });
    }

    if (lastStatus === 404) {
      return response.status(502).json({ error: "Gemini model was not found. Restart the local server or redeploy Vercel so GEMINI_MODEL=gemini-3.6-flash is loaded." });
    }

    return response.status(502).json({ error: `Gemini request failed with status ${lastStatus}. Check the API key and Generative Language API access.` });
  } catch {
    return response.status(500).json({ error: "The AI assistant is temporarily unavailable." });
  }
}
