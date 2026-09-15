import { motion } from "framer-motion";

const HOBBIES = [
  ["01", "Football", "Game day energy", "⚽"],
  ["02", "Video games", "Worlds to explore", "🎮"],
  ["03", "Cooking", "Experiments with flavor", "🍳"],
  ["04", "Gardening", "Slow, patient growth", "🌱"],
  ["05", "Movies & series", "Stories after hours", "🎬"],
  ["06", "Listening to music", "Soundtrack for the day", "🎧"],
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">
              <span className="h-px w-8 bg-signal" />
              Beyond the code
            </p>
            <h2 className="max-w-sm font-display text-5xl leading-[0.94] md:text-7xl">The things that keep me curious.</h2>
          </div>
          <div className="border-t border-line">
            {HOBBIES.map(([number, title, detail, icon], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 8 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="hobby-row group flex items-center gap-4 border-b border-line py-5"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] text-signal/80">{number}</span>
                <motion.span
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
                  transition={{ duration: 0.45 }}
                  className="hobby-icon"
                  aria-hidden="true"
                >
                  {icon}
                </motion.span>
                <span className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-signal md:text-3xl">{title}</span>
                <span className="ml-auto text-right text-xs text-ink-muted">{detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
