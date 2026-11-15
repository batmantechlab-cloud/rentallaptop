import Magnetic from "./Magnetic";
import { site } from "@/lib/site";

export default function CtaBand({ title = "Need 1 laptop or 1,000?" }: { title?: string }) {
  const msg = encodeURIComponent(`Hi ${site.name}, I need laptops on rent.`);
  return (
    <section className="section cta-band" aria-label="Get a quote">
      <div className="container">
        <div className="cta-card">
          <div className="cta-orbs" aria-hidden>
            <span /><span />
          </div>
          <h2 className="h2">
            {title} <em>Talk to our rental team today.</em>
          </h2>
          <div className="hero-actions">
            <Magnetic href={`https://wa.me/${site.whatsapp}?text=${msg}`} external>
              WhatsApp us
            </Magnetic>
            <Magnetic href={site.phoneHref} variant="ghost">
              Call {site.phone}
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
