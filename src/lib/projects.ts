export type Project = {
  slug: string;
  title: string;
  category?: "project" | "research";
  year: number;
  role: string;
  summary: string;
  challenge: string;
  stack: string[];
  metrics?: { label: string; before: string; after: string }[];
  codeUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "researchpilot-ai",
    title: "ResearchPilot AI",
    year: 2026,
    role: "RAG-powered academic copilot",
    summary:
      "Research assistant for reading, searching, and extracting data from PDFs with citation-grounded answers.",
    challenge:
      "Custom PDF chunking and pgvector semantic search, built to keep citations traceable back to source pages rather than hallucinated.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "pgvector", "Prisma", "Gemini"],
    codeUrl: "https://github.com/Afiroj313501/ResearchPilot",
    liveUrl: "https://research-pilot-orcin.vercel.app",
  },
  {
    slug: "ai-onboarding-platform",
    title: "AI Employee Onboarding Platform",
    year: 2026,
    role: "Enterprise SaaS",
    summary:
      "Role-scoped onboarding portal with automated plans, document processing, and feedback sentiment analysis.",
    challenge:
      "Role-based access control layered over a RAG pipeline so different employee tiers see different generated content from the same source documents.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Gemini", "pgvector"],
    codeUrl: "https://github.com/Afiroj313501/onboarding-platform",
    liveUrl: "https://onboarding-platform-xi.vercel.app/",
  },
  {
    slug: "lumenlearner",
    title: "LumenLearner",
    year: 2025,
    role: "AI-powered LMS — capstone project",
    summary:
      "Full-stack learning platform with multi-role dashboards, automated quiz generation, and RAG course advisors.",
    challenge:
      "Certificate generation gated behind real-time progress recalculation; quiz auto-generation reads PDF/PPTX/DOCX directly.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Gemini"],
    codeUrl: "https://github.com/Afiroj313501/LumosLearn",
    liveUrl: "https://lumenlearner-iota.vercel.app",
  },
  {
    slug: "multimodal-deepfake-detection",
    title: "Multimodal Deepfake Detection",
    category: "research",
    year: 2026,
    role: "Deep learning / computer vision research",
    summary:
      "Audio-visual fusion system detecting deepfakes and media manipulation using dual-modality neural networks.",
    challenge:
      "Fusing two modalities without one dominating the loss signal; tuned across CNN/LSTM/EfficientNet/MobileNetV3 variants.",
    stack: ["PyTorch", "OpenCV", "CNN", "LSTM", "EfficientNet", "MobileNetV3"],
    metrics: [
      { label: "Accuracy", before: "68.36%", after: "86.0%" },
      { label: "ROC-AUC", before: "0.723", after: "0.88" },
      { label: "Fake Recall", before: "56.0%", after: "84.0%" },
    ],
  },
  {
    slug: "careerforge-ai",
    title: "CareerForge AI",
    year: 2025,
    role: "Career development platform",
    summary:
      "End-to-end career guidance platform with an AI resume builder, ATS scoring, and coding assessments.",
    challenge:
      "Automated ATS scoring pipeline that had to stay explainable — surfacing which resume sections drove the score, not a black-box number.",
    stack: ["Generative AI", "React", "TypeScript", "Express", "PostgreSQL"],
  },
  {
    slug: "airlines-management-system",
    title: "Airlines Management System",
    year: 2024,
    role: "Desktop application",
    summary: "JavaFX desktop system for flight scheduling, ticket booking, seat selection, and payment management.",
    challenge: "Connected a role-aware desktop workflow to JDBC and MySQL while keeping scheduling, booking, and seat state consistent.",
    stack: ["Java", "JavaFX", "JDBC", "MySQL"],
  },
  {
    slug: "extensive-medical-hub",
    title: "Extensive Medical Hub",
    year: 2024,
    role: "Healthcare information platform",
    summary: "Centralized platform for hospital information, doctor availability, blood services, ambulance requests, and pharmacies.",
    challenge: "Brought time-sensitive healthcare services into one searchable experience for patients and service providers.",
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    codeUrl: "https://github.com/Afiroj313501/IMH",
  },
];