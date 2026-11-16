"use client";
import { useRef, useState } from "react";
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
  { label: "Certified data wipe", from: 0.24 },
  { label: "Hourly rent", from: 0.28 },
  { label: "4-hour delivery", from: 0.32 },
  { label: "GST invoice for businesses", from: 0.36 },
  { label: "Free on-site support", from: 0.4 },
  { label: "Hybrid way of renting", from: 0.44 },
  { label: "1-day security deposit refund", from: 0.48 },
  { label: "24×7 support by a real person", from: 0.52 },
];

/**
 * Pinned scroll sequence:
 * 1. Headline over a closed laptop
 * 2. Lid opens in 3D, spec chips float in
 * 3. Screen boots into a live order tracker
 */
export default function HeroLaptop() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Headline
  const titleOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const titleY = useTransform(p, [0, 0.2], [0, -120]);
  const titleBlur = useTransform(p, [0, 0.2], ["blur(0px)", "blur(12px)"]);
  const titleScale = useTransform(p, [0, 0.2], [1, 0.92]);

  // Laptop
  const lid = useTransform(p, [0.06, 0.55], [-101, 8]);
  const scale = useTransform(p, [0, 0.55], [0.62, 0.8]);
  const y = useTransform(p, [0, 0.55], ["28vh", "-2vh"]);
  const tilt = useTransform(p, [0, 0.55], [10, 0]);
  const screenOn = useTransform(p, [0.5, 0.66], [0, 1]);
  const glow = useTransform(p, [0.45, 0.7, 1], [0, 1, 0.6]);
  const hint = useTransform(p, [0, 0.05], [1, 0]);
  const copyEvents = useTransform(p, (v) => (v > 0.08 ? "none" : "auto"));

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStage(v < 0.68 ? 0 : v < 0.84 ? 1 : 2));

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
                    <div className="screen-ui-inner">
                      <ScreenUI stage={stage} />
                    </div>
                  </motion.div>
                </div>
                <span className="camera" />
              </div>
              <div className="lid-back">
                <span className="logo-mark big">
                  <i />
                </span>
              </div>
            </motion.div>
            <div className="base">
              <div className="deck">
                <div className="keys">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
                <div className="trackpad" />
              </div>
              <div className="base-front" />
            </div>
            <div className="shadow" />
          </motion.div>
        </div>

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
        <span className="pulse" /> Hourly laptop rental in Chennai
      </p>
      <h1 id="hero-title" className="hero-title">
        Rentalloop.
        <br />
        <em>Delivered in 4 hours.</em>
      </h1>
      <p className="hero-sub">
        Business laptops, MacBooks, desktops, workstations, with free setup, on-site support and GST invoicing. Plans from ₹69/hour.
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
  const opacity = useTransform(p, [from, from + 0.08, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(p, [from, from + 0.08], [0.6, 1]);
  const drift = useTransform(p, [from, 1], [40, -60]);
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
          <small>Order #RL-24817</small>
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
          <small>Today&apos;s rent · 8 hrs</small>
          <strong className="sui-big">₹7,475</strong>
          <small className="ok">Billed by the hour · GST invoice</small>
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
