import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

const strip = [
  { icon: "award", t: "ISO 9001:2015", d: "Certified processes" },
  { icon: "star", t: `${site.rating.value}/5 rating`, d: `${site.rating.count.toLocaleString("en-IN")}+ reviews` },
  { icon: "receipt", t: "GST invoices", d: "Claim full input credit" },
  { icon: "shield", t: "Insured devices", d: "Covered in transit & use" },
  { icon: "clock", t: "Since 2014", d: "2,400+ business clients" },
];

const guarantees = [
  { icon: "truck", t: "4-hour delivery SLA", d: "Same-day delivery within Chennai, backed by a written service-level agreement." },
  { icon: "wrench", t: "Free replacement", d: "Faulty device? We swap it at your desk within 4 hours at no extra cost." },
  { icon: "lock", t: "Certified data wipe", d: "NIST 800-88 data sanitisation on every return, with a certificate on request." },
  { icon: "headset", t: "Dedicated support", d: "A named account manager and on-site engineers, Monday to Saturday." },
];

export function TrustStrip() {
  return (
    <section className="trust" aria-label="Why customers trust us">
      <div className="container trust-grid">
        {strip.map((s) => (
          <div key={s.t} className="trust-item">
            <Icon name={s.icon} size={26} />
            <div>
              <strong>{s.t}</strong>
              <span>{s.d}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Guarantees() {
  return (
    <section className="section" aria-labelledby="g-title">
      <div className="container">
        <p className="eyebrow">Our guarantees</p>
        <h2 id="g-title" className="h2">
          Service you can <em>put in writing.</em>
        </h2>
        <div className="assure">
          {guarantees.map((g, i) => (
            <Reveal key={g.t} delay={i * 0.06} className="assure-card">
              <span className="ic" aria-hidden><Icon name={g.icon} size={24} /></span>
              <h3>{g.t}</h3>
              <p>{g.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
