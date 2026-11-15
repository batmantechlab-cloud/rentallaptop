"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const stats = [
  { value: 18000, suffix: "+", label: "Devices in our fleet" },
  { value: 2400, suffix: "+", label: "Businesses served" },
  { value: 4, suffix: " hr", label: "Delivery in Chennai" },
  { value: 99.8, suffix: "%", label: "Uptime across rentals", decimals: 1 },
];

function Count({ to, decimals = 0, suffix }: { to: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let id = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - k, 4);
      setV(to * e);
      if (k < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function Counters() {
  return (
    <section className="section counters" aria-label="Rentiva in numbers">
      <div className="container counters-grid">
        {stats.map((s) => (
          <div key={s.label} className="counter">
            <strong>
              <Count to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
