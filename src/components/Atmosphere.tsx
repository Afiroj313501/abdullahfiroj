import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const STARS = Array.from({ length: 22 }, (_, index) => ({
  left: `${(index * 47 + 11) % 100}%`,
  top: `${(index * 61 + 7) % 100}%`,
  size: index % 7 === 0 ? 2 : 1,
  delay: `${(index % 6) * 0.7}s`,
}));

const LIGHT_LINES = [
  { top: "14%", width: "64vw", delay: "-3s", tone: "a" },
  { top: "27%", width: "42vw", delay: "-11s", tone: "b" },
  { top: "39%", width: "76vw", delay: "-7s", tone: "c" },
  { top: "54%", width: "50vw", delay: "-15s", tone: "a" },
  { top: "68%", width: "68vw", delay: "-5s", tone: "b" },
  { top: "83%", width: "38vw", delay: "-18s", tone: "c" },
];

export default function Atmosphere() {
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);
  const glowX = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.7 });
  const glowY = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.7 });
  const dotX = useSpring(pointerX, { stiffness: 180, damping: 18, mass: 0.35 });
  const dotY = useSpring(pointerY, { stiffness: 180, damping: 18, mass: 0.35 });
  const drift = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const sweep = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="atmosphere-base absolute inset-0" />
      <motion.div
        className="atmosphere-ribbon atmosphere-ribbon-a absolute -left-1/4 top-[8%] h-[24rem] w-[150%]"
        style={{ y: drift }}
      />
      <motion.div
        className="atmosphere-ribbon atmosphere-ribbon-b absolute -left-1/4 top-[34%] h-[20rem] w-[150%]"
        style={{ x: sweep }}
      />
      <motion.div
        className="atmosphere-ribbon atmosphere-ribbon-c absolute -left-1/4 top-[62%] h-[18rem] w-[150%]"
        style={{ y: drift, x: sweep }}
      />
      <div className="absolute inset-0">
        {LIGHT_LINES.map((line, index) => (
          <span
            key={`${line.top}-${index}`}
            className={`atmosphere-line atmosphere-line-${line.tone} absolute left-[-18%] h-px`}
            style={{ top: line.top, width: line.width, animationDelay: line.delay }}
          />
        ))}
      </div>
      <div className="atmosphere-horizon absolute inset-x-0 bottom-0 h-[55vh]" />
      <div className="absolute inset-0">
        {STARS.map((star) => (
          <span
            key={`${star.left}-${star.top}`}
            className="atmosphere-star absolute rounded-full bg-ink"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
      <div className="atmosphere-grain absolute inset-0" />
      <div className="atmosphere-vignette absolute inset-0" />
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} />
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
    </div>
  );
}