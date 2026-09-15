import { motion } from "framer-motion";

const LINKS = [
  { label: "GitHub", href: "https://github.com/Afiroj313501", detail: "Code, experiments, and shipped work" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-firoj-900697375", detail: "Professional conversations" },
  { label: "Portfolio", href: "https://portfolio-firoj2.vercel.app/", detail: "The live version of this work" },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">
              <span className="h-px w-8 bg-signal" />
              Contact
            </p>
            <h2 className="max-w-md font-display text-5xl leading-[0.94] md:text-7xl">Let&apos;s build something useful.</h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
              Open to thoughtful collaborations, ambitious software projects, and conversations about AI research.
            </p>
            <div className="mt-10 border-t border-line">
              {LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 8 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-4 border-b border-line py-5"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-signal/80">0{index + 1}</span>
                  <span className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-signal">{link.label}</span>
                  <span className="ml-auto text-right text-xs text-ink-muted">{link.detail} ↗</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
