"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { products } from "@/lib/site";
import Icon from "@/components/Icon";

/** Vertical scroll drives a horizontal, pinned product rail. */
export default function ProductRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const calc = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - innerWidth));
    };
    calc();
    addEventListener("resize", calc);
    return () => removeEventListener("resize", calc);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={section}
      className="rail"
      style={{ height: reduce ? "auto" : `calc(100vh + ${dist}px)` }}
      aria-labelledby="rail-title"
    >
      <div className={reduce ? "" : "rail-sticky"}>
        <div className="container rail-head">
          <p className="eyebrow">What you can rent</p>
          <h2 id="rail-title" className="h2">
            Every device your business needs, <em>on rent.</em>
          </h2>
        </div>
        <motion.div ref={track} className="rail-track" style={reduce ? undefined : { x }}>
          {products.map((p, i) => (
            <Link
              key={p.slug}
              href={`/rentals/${p.slug}`}
              className="rail-card"
              style={{ "--h": p.hue } as React.CSSProperties}
            >
              <span className="rail-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="rail-icon">
                <Icon name={p.slug} size={44} />
              </span>
              <span className="rail-orb" aria-hidden />
              <h3>{p.name}</h3>
              <p>{p.short}</p>
              <div className="rail-foot">
                <span>
                  {p.hourly ? (
                    <>from <strong>₹{p.hourly}</strong>/hr</>
                  ) : (
                    <>from <strong>₹{p.from.toLocaleString("en-IN")}</strong>/mo</>
                  )}
                </span>
                <span className="arrow" aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </motion.div>
        {!reduce && (
          <div className="container">
            <div className="rail-bar">
              <motion.span style={{ scaleX: bar }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
