import Link from "next/link";
import { brands, faqs, locations, site } from "@/lib/site";
import { faqLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HeroLaptop from "@/components/home/HeroLaptop";
import ScrollWords from "@/components/home/ScrollWords";
import Marquee from "@/components/home/Marquee";
import ProductRail from "@/components/home/ProductRail";
import Counters from "@/components/home/Counters";
import Steps from "@/components/home/Steps";
import Bento from "@/components/home/Bento";
import Calculator from "@/components/home/Calculator";
import Testimonials from "@/components/home/Testimonials";
import { TrustStrip, Guarantees } from "@/components/home/Trust";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <HeroLaptop />
      <TrustStrip />

      <section className="section statement" aria-label="Why rent">
        <div className="container">
          <ScrollWords
            text="Buying laptops locks lakhs of rupees into hardware that ages every month. Renting gives your team the latest machines today, delivered, imaged and insured, while your cash keeps working for the business."
            highlight={["latest", "delivered", "imaged", "insured", "cash"]}
          />
        </div>
      </section>

      <Marquee items={brands} label="Brands we rent" />

      <ProductRail />
      <Counters />
      <Steps />
      <Bento />
      <Guarantees />
      <Calculator />

      <section className="section why" aria-labelledby="why-title">
        <div className="container">
          <p className="eyebrow">Rent vs. buy</p>
          <h2 id="why-title" className="h2">
            Renting <em>simply costs less.</em>
          </h2>
          <div className="compare">
            <Reveal className="compare-col buy">
              <h3>Buying 25 laptops</h3>
              <ul>
                <li><span>Upfront cost</span><strong>₹16,25,000</strong></li>
                <li><span>IT setup time</span><strong>2–3 weeks</strong></li>
                <li><span>Repairs & spares</span><strong>Your problem</strong></li>
                <li><span>Resale after 3 yrs</span><strong>~20% value</strong></li>
              </ul>
            </Reveal>
            <Reveal className="compare-col rent" delay={0.12}>
              <h3>Renting 25 laptops with {site.name}</h3>
              <ul>
                <li><span>Upfront cost</span><strong>₹0 deposit*</strong></li>
                <li><span>Ready to use</span><strong>Same day</strong></li>
                <li><span>Repairs & spares</span><strong>4-hr swap, free</strong></li>
                <li><span>Tax benefit</span><strong>100% opex + GST ITC</strong></li>
              </ul>
            </Reveal>
          </div>
          <p className="fine">*For GST-registered businesses. Comparison based on Core i5, 16 GB business laptops.</p>
        </div>
      </section>

      <Testimonials />

      <section className="section" aria-labelledby="loc-title">
        <div className="container">
          <p className="eyebrow">Where we deliver</p>
          <h2 id="loc-title" className="h2">
            Laptop rental <em>across India.</em>
          </h2>
          <div className="loc-grid">
            {locations.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.05}>
                <Link href={`/locations/${l.slug}`} className="loc-card">
                  <span className="loc-city">{l.city}</span>
                  <span className="loc-meta">{l.delivery} delivery · {l.areas.slice(0, 3).join(", ")}…</span>
                  <span className="arrow" aria-hidden>↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqs} />
      <CtaBand />
    </>
  );
}
