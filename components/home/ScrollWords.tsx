"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/** Apple-style paragraph: each word lights up as you scroll through it. */
export default function ScrollWords({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="scroll-words">
      {words.map((w, i) => (
        <Word
          key={i}
          p={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={highlight.includes(w.replace(/[.,]/g, ""))}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, p, range, accent }: { children: string; p: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(p, range, [0.12, 1]);
  const y = useTransform(p, range, [8, 0]);
  return (
    <motion.span className={accent ? "w accent" : "w"} style={{ opacity, y }}>
      {children}{" "}
    </motion.span>
  );
}
