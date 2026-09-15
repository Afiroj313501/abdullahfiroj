import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const TOOLKIT = [
  {
    title: "Languages",
    skills: [
      ["Java", "java"],
      ["Python", "python"],
      ["JavaScript", "js"],
      ["TypeScript", "ts"],
      ["C", "c"],
      ["C++", "cpp"],
    ],
  },
  {
    title: "Frontend",
    skills: [
      ["HTML", "html"],
      ["CSS", "css"],
      ["React", "react"],
      ["Vite", "vite"],
      ["Tailwind", "tailwind"],
    ],
  },
  {
    title: "Backend",
    skills: [
      ["Node.js", "nodejs"],
      ["Express", "express"],
      ["REST APIs", "fastapi"],
      ["JWT Auth", "keycloak"],
    ],
  },
  {
    title: "Database",
    skills: [
      ["PostgreSQL", "postgres"],
      ["MongoDB", "mongodb"],
      ["MySQL", "mysql"],
      ["Prisma", "prisma"],
      ["pgvector", "postgres"],
    ],
  },
  {
    title: "AI / ML",
    skills: [
      ["PyTorch", "pytorch"],
      ["TensorFlow", "tensorflow"],
      ["OpenCV", "opencv"],
      ["CNN", "pytorch"],
      ["ResNet3D", "pytorch"],
      ["HuBERT", "pytorch"],
      ["DINOv2", "pytorch"],
      ["Computer Vision", "opencv"],
    ],
  },
  {
    title: "AI / GenAI",
    skills: [
      ["Google Gemini", "gemini"],
      ["LLMs", "openai"],
      ["RAG", "pinecone"],
      ["Embeddings", "huggingface"],
      ["Semantic Search", "elasticsearch"],
      ["Vector Search", "pinecone"],
      ["Agentic AI", "langchain"],
      ["MCP", "graphql"],
    ],
  },
  {
    title: "Tools",
    skills: [
      ["Git", "git"],
      ["GitHub", "github"],
      ["Docker", "docker"],
      ["VS Code", "vscode"],
      ["Figma", "figma"],
      ["Postman", "postman"],
      ["Vercel", "vercel"],
    ],
  },
];

const ORBIT_SKILLS = TOOLKIT.flatMap((category) => category.skills);

export default function Toolkit() {
  return (
    <section id="toolkit" className="px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">
            <span className="h-px w-8 bg-signal" />
            Current focus
          </p>
          <h2 className="max-w-4xl font-display text-5xl leading-[0.94] md:text-7xl lg:text-8xl">The stack I bring to <span className="text-signal">every problem.</span></h2>
        </motion.div>
        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div>
            {TOOLKIT.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="toolkit-row group grid gap-5 border-t border-white/10 py-7 transition-colors duration-500 sm:grid-cols-[minmax(7rem,0.42fr)_1fr] sm:gap-8"
              >
                <div className="flex items-start gap-4">
                  <span className="pt-1 font-mono text-[10px] tracking-[0.16em] text-signal/80">0{index + 1}</span>
                  <h3 className="font-display text-2xl leading-none text-ink transition-transform duration-500 group-hover:translate-x-1">{item.title}</h3>
                </div>
                <ul className="flex flex-wrap items-center gap-2.5">
                  {item.skills.map(([name, icon], skillIndex) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4, scale: 1.04 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{ duration: 0.35, delay: index * 0.08 + skillIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className="toolkit-skill group/skill flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs text-ink-muted transition-all duration-300 hover:text-ink"
                    >
                      <img src={`https://skillicons.dev/icons?i=${icon}`} alt="" aria-hidden="true" className="h-6 w-6 rounded-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]" />
                      <span>{name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="orbit-stage" aria-hidden="true">
            <div className="orbit-ring orbit-ring-outer" />
            <div className="orbit-ring orbit-ring-inner" />
            <div className="orbit-core">AF</div>
            {ORBIT_SKILLS.map(([name, icon], index) => {
              const angle = (360 / ORBIT_SKILLS.length) * index;
              const radius = [104, 142, 180][index % 3];
              const style = {
                "--orbit-angle": `${angle}deg`,
                "--orbit-counter-angle": `${-angle}deg`,
                "--orbit-radius": `${radius}px`,
                "--orbit-delay": `${index * -0.45}s`,
                "--orbit-duration": `${28 + (index % 5) * 3}s`,
              } as CSSProperties;

              return (
                <span key={`${name}-${index}`} className="orbit-node" style={style}>
                  <span className="orbit-chip" title={name}>
                    <img src={`https://skillicons.dev/icons?i=${icon}`} alt="" />
                    <span>{name}</span>
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}