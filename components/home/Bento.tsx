"use client";
import { industries } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

/** Industry cards with a cursor-following spotlight border. */
export default function Bento() {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const grid = e.currentTarget;
    for (const card of Array.from(grid.children) as HTMLElement[]) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    }
  };
  return (
    <section className="section" aria-labelledby="who-title">
      <div className="container">
        <p className="eyebrow">Who rents from us</p>
        <h2 id="who-title" className="h2">
          Built for <em>every kind of team.</em>
        </h2>
        <div className="bento" onPointerMove={onMove}>
          {industries.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06} className={`bento-card b${i}`}>
              <span className="bento-icon" aria-hidden><Icon name={it.icon} size={24} /></span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
