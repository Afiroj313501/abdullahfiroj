import { motion } from "framer-motion";

const FOCUS = [
  ["01", "Full-stack engineering", "MERN / PERN systems"],
  ["02", "Generative AI", "RAG, LLMs, agentic workflows"],
  ["03", "Research direction", "MCP and sustainable computing"],
];

export default function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.72fr_1.28fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">
            <span className="h-px w-8 bg-signal" />
            About me
          </p>
          <h2 className="max-w-sm font-display text-5xl leading-[0.95] md:text-7xl">
            Building with intent.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">
            Abdullah Firoj · CSE graduate · Data Science
          </p>
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-body text-xl leading-relaxed text-ink md:text-3xl"
          >
            I design and build practical software at the intersection of
            full-stack engineering, artificial intelligence, and research.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base"
          >
            A Computer Science &amp; Engineering graduate from United International
            University, I turn complex ideas into useful products: AI assistants,
            RAG platforms, intelligent learning systems, and multimodal computer
            vision. My research explores the Model Context Protocol, energy-aware
            tool discovery, AI security, and sustainable computing.
          </motion.p>

          <div className="mt-12 border-t border-line">
            {FOCUS.map(([number, title, detail], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-300 hover:border-signal"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] text-signal/80">{number}</span>
                <span className="font-display text-xl text-ink transition-transform duration-300 group-hover:translate-x-1">{title}</span>
                <span className="ml-auto text-right text-xs text-ink-muted">{detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}