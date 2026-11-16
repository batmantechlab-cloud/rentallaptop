import { industries } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

/** Who rents from us, as a simple point-wise list. */
export default function Bento() {
  return (
    <section className="section" aria-labelledby="who-title">
      <div className="container">
        <p className="eyebrow">Who rents from us</p>
        <h2 id="who-title" className="h2">
          Built for <em>every kind of team.</em>
        </h2>
        <ul className="who-list">
          {industries.map((it, i) => (
            <Reveal key={it.title} as="li" delay={i * 0.05}>
              <span className="who-icon" aria-hidden><Icon name={it.icon} size={20} /></span>
              <div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
