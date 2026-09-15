import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ROLES = ["Full-stack Developer", "Researcher", "AI / ML Engineer"];
const PERMANENT_PHOTO_PATH = "/profile.jpeg";

const roleTransition = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -24, filter: "blur(8px)" },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string | null>(PERMANENT_PHOTO_PATH);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen items-center px-6 py-32 md:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">
              <span className="h-px w-10 bg-signal" />
              Software · AI · Research
            </p>
            <h1 className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.88] tracking-tight text-ink">
              Abdullah <span className="text-signal">Firoj.</span>
            </h1>
            <div className="mt-8 flex flex-nowrap items-center gap-2 whitespace-nowrap font-display text-lg text-ink sm:gap-3 sm:text-xl md:text-3xl">
              <span>CSE Graduate</span>
              <span className="text-signal">·</span>
              <div className="relative flex h-8 min-w-[12rem] items-center overflow-hidden sm:h-9 sm:min-w-[15rem] md:h-12 md:min-w-[21rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={ROLES[roleIndex]}
                    variants={roleTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="text-signal"
                  >
                    {ROLES[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base"
            >
              Building practical systems across full-stack engineering, generative AI,
              RAG, agentic workflows, and multimodal computer vision.
            </motion.p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#work" className="hero-primary-link">Explore work <span aria-hidden="true">↗</span></a>
              <a href="https://github.com/Afiroj313501" target="_blank" rel="noreferrer" className="hero-secondary-link">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hero-photo-wrap"
          >
            {photoUrl ? (
              <img src={photoUrl} alt="Abdullah Firoj portrait" className="hero-photo" onError={() => setPhotoUrl(null)} />
            ) : (
              <div className="hero-photo-placeholder">
                <span className="hero-photo-mark">+</span>
                <span className="hero-photo-label">Portrait</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
