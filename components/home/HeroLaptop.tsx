"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import Magnetic from "@/components/Magnetic";
import { site } from "@/lib/site";

const chips = [
  { label: "Core i9 · 32 GB", from: 0.18 },
  { label: "M3 Pro MacBooks", from: 0.22 },
  { label: "4-hour delivery", from: 0.26 },
  { label: "Zero deposit for GST clients", from: 0.3 },
  { label: "Free on-site support", from: 0.34 },
];

/**
 * Pinned scroll sequence:
 * 1. Headline over a closed laptop
 * 2. Lid opens in 3D, spec chips float in
 * 3. Screen boots into a live order tracker
 * 4. Camera dives into the screen until it fills the viewport
 */
export default function HeroLaptop() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [zoomTo, setZoomTo] = useState(3);

  useEffect(() => {
    const calc = () => {
      const lid = document.querySelector<HTMLElement>(".lid");
      if (!lid) return;
      const w = lid.offsetWidth;
      const h = lid.offsetHeight;
      setZoomTo(Math.max(innerWidth / w, innerHeight / h) * 1.12);
    };
    calc();
    addEventListener("resize", calc);
    return () => removeEventListener("resize", calc);
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Headline
  const titleOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const titleY = useTransform(p, [0, 0.14], [0, -120]);
  const titleBlur = useTransform(p, [0, 0.14], ["blur(0px)", "blur(12px)"]);
  const titleScale = useTransform(p, [0, 0.14], [1, 0.92]);

  // Laptop
  const lid = useTransform(p, [0.04, 0.38, 0.6, 0.78], [-101, 8, 8, 0]);
  const scale = useTransform(p, [0, 0.38, 0.6, 0.9], [0.62, 0.8, 0.8, zoomTo]);
  const y = useTransform(p, [0, 0.38, 0.6, 0.86], ["28vh", "-2vh", "-2vh", "0vh"]);
  const tilt = useTransform(p, [0, 0.38, 0.6, 0.86], [10, 0, 0, 0]);
  const baseOpacity = useTransform(p, [0.7, 0.84], [1, 0]);
  const screenOn = useTransform(p, [0.34, 0.46], [0, 1]);
  const glow = useTransform(p, [0.3, 0.5, 0.8], [0, 1, 0]);

  // Final message inside the screen
  const finalOpacity = useTransform(p, [0.86, 0.95], [0, 1]);
  const uiOpacity = useTransform(p, [0.8, 0.88], [1, 0]);
  const finalY = useTransform(p, [0.86, 0.97], [40, 0]);
  const hint = useTransform(p, [0, 0.05], [1, 0]);
  const copyEvents = useTransform(p, (v) => (v > 0.08 ? "none" : "auto"));

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStage(v < 0.46 ? 0 : v < 0.6 ? 1 : 2));

  if (reduce) {
    return (
      <section className="hero hero-static" aria-labelledby="hero-title">
        <HeroCopy />
      </section>
    );
  }

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="hero-bg" aria-hidden>
          <motion.div className="hero-glow" style={{ opacity: glow }} />
          <div className="hero-grid" />
        </div>

        <motion.div
          className="hero-copy"
          style={{ opacity: titleOpacity, y: titleY, filter: titleBlur, scale: titleScale, pointerEvents: copyEvents }}
        >
          <HeroCopy />
        </motion.div>

        {chips.map((c, i) => (
          <Chip key={i} i={i} p={p} {...c} />
        ))}

        <div className="stage" aria-hidden>
          <motion.div className="laptop" style={{ scale, y, rotateX: tilt }}>
            <motion.div className="lid" style={{ rotateX: lid }}>
              <div className="lid-front">
                <div className="screen">
                  <motion.div className="screen-ui" style={{ opacity: screenOn }}>
                    <motion.div style={{ opacity: uiOpacity }} className="screen-ui-inner">
                      <ScreenUI stage={stage} />
                    </motion.div>
                  </motion.div>
                  <motion.div className="screen-fill" style={{ opacity: finalOpacity }} />
                </div>
                <span className="camera" />
              </div>
              <div className="lid-back">
                <span className="logo-mark big">
                  <i />
                </span>
              </div>
            </motion.div>
            <motion.div className="base" style={{ opacity: baseOpacity }}>
              <div className="deck">
                <div className="keys">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
                <div className="trackpad" />
              </div>
              <div className="base-front" />
            </motion.div>
            <motion.div className="shadow" style={{ opacity: baseOpacity }} />
          </motion.div>
        </div>

        {/* Rendered outside the scaled laptop so the text stays crisp */}
        <motion.div className="hero-final" style={{ opacity: finalOpacity, y: finalY }} aria-hidden>
          <p className="eyebrow">Order to desk</p>
          <p className="hero-final-title">
            In <em>4 hours.</em>
          </p>
          <p className="hero-sub">Imaged, tested and set up at every desk, anywhere in Chennai.</p>
        </motion.div>

        <motion.div className="scroll-hint" style={{ opacity: hint }} aria-hidden>
          <span />
          Scroll to power on
        </motion.div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <>
      <p className="eyebrow">
        <span className="pulse" /> Trusted by 2,400+ businesses since 2014
      </p>
      <h1 id="hero-title" className="hero-title">
        Laptop rental for business.
        <br />
        <em>Delivered in 4 hours.</em>
      </h1>
      <p className="hero-sub">
        Business laptops, MacBooks, desktops, workstations and servers on rent, with free setup, on-site support and GST invoicing. Plans from ₹299/day.
      </p>
      <div className="hero-actions">
        <Magnetic href="/contact">Get a free quote</Magnetic>
        <Magnetic href="/#calculator" variant="ghost">
          Estimate pricing
        </Magnetic>
      </div>
    </>
  );
}

function Chip({ p, label, from, i }: { p: MotionValue<number>; label: string; from: number; i: number }) {
  const opacity = useTransform(p, [from, from + 0.08, 0.56, 0.64], [0, 1, 1, 0]);
  const scale = useTransform(p, [from, from + 0.08, 0.56, 0.66], [0.6, 1, 1, 1.6]);
  const drift = useTransform(p, [from, 0.66], [40, -60]);
  return (
    <motion.div className={`chip-wrap c${i}`} style={{ opacity }} aria-hidden>
      <motion.span className="chip" style={{ scale, y: drift }}>
        <i /> {label}
      </motion.span>
    </motion.div>
  );
}

function ScreenUI({ stage }: { stage: number }) {
  const steps = ["Order confirmed", "Imaged & tested", "Out for delivery", "Set up at desk"];
  const active = stage === 0 ? 1 : stage === 1 ? 2 : 3;
  return (
    <div className="sui">
      <div className="sui-bar">
        <span /><span /><span />
        <b>{site.url.replace(/^https?:\/\/(www\.)?/, "")}/track</b>
      </div>
      <div className="sui-body">
        <div className="sui-card sui-main">
          <small>Order #RV-24817</small>
          <strong>25 × Dell Latitude 7440</strong>
          <div className="sui-steps">
            {steps.map((s, i) => (
              <div key={s} className={`sui-step ${i <= active ? "done" : ""}`}>
                <i />
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div className="sui-progress">
            <span style={{ width: `${(active + 1) * 25}%` }} />
          </div>
          <small className="sui-eta">ETA 2h 14m · Warehouse → Your office</small>
        </div>
        <div className="sui-card">
          <small>Monthly rent</small>
          <strong className="sui-big">₹44,975</strong>
          <small className="ok">Zero deposit · GST invoice</small>
        </div>
        <div className="sui-card">
          <small>Uptime</small>
          <strong className="sui-big">99.8%</strong>
          <div className="sui-spark">
            {[40, 55, 48, 70, 62, 80, 76, 92, 88, 96].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
