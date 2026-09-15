import { useInView } from "framer-motion";
import { useRef } from "react";

type Metric = { label: string; before: string; after: string };

export default function MetricShift({ metrics }: { metrics: Metric[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="mt-5 grid grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div key={m.label}>
          <p className="text-xs text-ink-muted">{m.label}</p>
          <p className="font-display text-lg">
            <span className={inView ? "opacity-30 line-through" : ""}>
              {m.before}
            </span>{" "}
            {inView && <span className="text-signal">{m.after}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}