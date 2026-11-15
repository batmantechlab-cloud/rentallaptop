import { testimonials, site } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  return (
    <section className="section" aria-labelledby="t-title">
      <div className="container">
        <p className="eyebrow">Customer reviews</p>
        <h2 id="t-title" className="h2">
          Trusted by <em>2,400+ businesses.</em>
        </h2>
        <div className="rating-head">
          <strong>{site.rating.value}</strong>
          <span className="stars" aria-hidden>★★★★★</span>
          <span>Average from {site.rating.count.toLocaleString("en-IN")} verified reviews</span>
        </div>
        <div className="t-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.06}>
              <figure className="t-card">
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{t.text}”</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
