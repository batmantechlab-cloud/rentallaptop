"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const steps = [
  { t: "Tell us what you need", d: "Call, WhatsApp or use the estimator. Get a written quote in 15 minutes." },
  { t: "We image & test", d: "Your OS, apps, VPN and asset tags are loaded. Every unit passes a 42-point check." },
  { t: "Delivered & set up", d: "Our engineers deliver, unbox and set up at each desk, in 4 hours in Chennai." },
  { t: "Upgrade, extend, return", d: "Swap models, add units or end the plan with one message. We pick up and wipe data." },
];

export default function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="section steps" aria-labelledby="steps-title">
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 id="steps-title" className="h2">
          A simple, <em>four-step process.</em>
        </h2>
        <div ref={ref} className="steps-wrap">
          <svg className="steps-line" viewBox="0 0 10 400" preserveAspectRatio="none" aria-hidden>
            <path d="M5 0 V400" className="track" />
            <motion.path d="M5 0 V400" className="fill" style={{ pathLength: draw }} />
          </svg>
          <ol>
            {steps.map((s, i) => (
              <Step key={s.t} i={i} total={steps.length} p={scrollYProgress} {...s} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ t, d, i, total, p }: { t: string; d: string; i: number; total: number; p: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const at = i / total;
  const opacity = useTransform(p, [at - 0.1, at + 0.1], [0.25, 1]);
  const x = useTransform(p, [at - 0.1, at + 0.1], [30, 0]);
  const dot = useTransform(p, [at - 0.02, at + 0.05], [0, 1]);
  return (
    <motion.li style={{ opacity, x }}>
      <motion.span className="step-dot" style={{ scale: dot }} aria-hidden />
      <span className="step-n">0{i + 1}</span>
      <h3>{t}</h3>
      <p>{d}</p>
    </motion.li>
  );
}
