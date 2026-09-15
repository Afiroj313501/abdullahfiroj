import { motion } from "framer-motion";

const researchEntries = [
  {
    label: "IEEE Transactions on Sustainable Computing (Submitted)",
    title: "Energy-Aware Tool Discovery for Agentic AI with Model Context Protocol (MCP)",
    detail: "Research on energy-efficient Agentic AI using MCP for optimized tool discovery, resource efficiency, and sustainable AI execution.",
  },
  {
    label: "Final Year Design Project",
    title: "Multimodal Deepfake Detection",
    detail: "Research on audio-visual deepfake detection using deep learning with human-in-the-loop verification for robust synthetic media identification.",
  },
];

export default function Research() {
  return (
    <section id="research" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">
              <span className="h-px w-8 bg-signal" />
              Research
            </p>
            <h2 className="font-display text-5xl leading-[0.94] md:text-7xl">Research</h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">Published &amp; ongoing work</p>
          </div>
        </motion.div>

        <div className="border-t border-line">
          {researchEntries.map((entry, index) => (
            <motion.article
              key={entry.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-line py-8 md:grid md:grid-cols-[0.45fr_1fr] md:gap-12"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-signal">{entry.label}</p>
              <div className="mt-4 md:mt-0">
                <h3 className="max-w-3xl font-display text-2xl leading-tight text-ink md:text-4xl">{entry.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">{entry.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
