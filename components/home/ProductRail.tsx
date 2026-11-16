import Link from "next/link";
import { products } from "@/lib/site";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

/** Compact product grid that always fits inside the page width. */
export default function ProductRail() {
  return (
    <section className="rail section" aria-labelledby="rail-title">
      <div className="container">
        <div className="rail-head">
          <p className="eyebrow">What you can rent</p>
          <h2 id="rail-title" className="h2">
            Every device your business needs, <em>on rent.</em>
          </h2>
        </div>
        <div className="rail-grid">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={`/rentals/${p.slug}`} className="rail-card">
                <span className="rail-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="rail-icon">
                  <Icon name={p.slug} size={28} />
                </span>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
