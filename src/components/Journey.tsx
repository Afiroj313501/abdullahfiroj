import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyNodes } from "@/lib/journey";

gsap.registerPlugin(ScrollTrigger);

const NODE_HEIGHT = 172; // px of vertical space per milestone

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // The line fill and the marker are BOTH bound to scroll progress via
      // scrub — this is what makes it feel physically tied to scrolling
      // rather than a fixed-duration animation that just fires once.
      gsap.set(fillRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.set(markerRef.current, { top: "0%" });

      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: trackWrapRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      gsap.to(markerRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: trackWrapRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      // Each card slides in from its side as it enters view, and reverses
      // if you scroll back up — toggleActions makes it feel responsive to
      // actual scroll direction, not a one-shot reveal.
      gsap.utils.toArray<HTMLElement>(".journey-node").forEach((node) => {
        const side = node.dataset.side;
        gsap.fromTo(
          node,
          { opacity: 0, x: side === "left" ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            ease: "power3.out",
            duration: 0.6,
            scrollTrigger: {
              trigger: node,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax star layers — pure scroll-scrub, no fixed timers.
      gsap.utils.toArray<HTMLElement>(".star-layer").forEach((layer, i) => {
        gsap.to(layer, {
          y: (i + 1) * -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const totalHeight = journeyNodes.length * NODE_HEIGHT;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative px-6 md:px-12 py-24 overflow-hidden"
    >
      {[0, 1, 2].map((i) => (
        <div key={i} className="star-layer absolute inset-0 pointer-events-none">
          {Array.from({ length: 25 }, (_, s) => (
            <span
              key={s}
              className="absolute rounded-full bg-ink"
              style={{
                left: `${(s * 37 + i * 17) % 100}%`,
                top: `${(s * 53 + i * 29) % 100}%`,
                width: i + 1,
                height: i + 1,
                opacity: 0.3 + i * 0.2,
              }}
            />
          ))}
        </div>
      ))}

      <div className="relative mx-auto mb-14 max-w-4xl text-center">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-signal">The long way around</p>
        <h2 className="font-display text-5xl leading-none md:text-7xl">A work in progress.</h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
          From first classrooms to intelligent systems, every chapter adds another layer.
        </p>
      </div>

      <div
        ref={trackWrapRef}
        className="relative max-w-3xl mx-auto"
        style={{ height: totalHeight }}
      >
        <div className="journey-track-glow absolute left-1/2 top-0 bottom-0 -translate-x-1/2" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-line" />
        <div
          ref={fillRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: "var(--color-signal)", boxShadow: "0 0 8px var(--color-signal)" }}
        />
        <div
          ref={markerRef}
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full -ml-1.5"
          style={{ background: "var(--color-signal)", boxShadow: "0 0 16px 4px var(--color-signal)" }}
        />

        {journeyNodes.map((node, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div
              key={node.period + node.title}
              data-side={side}
              className={`journey-node ${side} absolute w-[calc(50%-2rem)] ${
                side === "left" ? "left-0 text-right pr-2" : "right-0 text-left pl-2"
              }`}
              style={{ top: i * NODE_HEIGHT + NODE_HEIGHT / 2 - 30 }}
            >
              <div className={`journey-entry ${i === journeyNodes.length - 1 ? "journey-entry-current" : ""}`}>
                <span className="journey-entry-index">0{i + 1}</span>
                <p className="journey-period" style={{ color: node.color }}>{node.period}</p>
                <p className="journey-title">{node.title}</p>
                {node.detail && <p className="journey-detail">{node.detail}</p>}
                <span className="journey-connector" style={{ backgroundColor: node.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}