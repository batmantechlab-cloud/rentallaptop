import { brands, faqs, site } from "@/lib/site";
import { faqLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HeroLaptop from "@/components/home/HeroLaptop";
import Marquee from "@/components/home/Marquee";
import ProductRail from "@/components/home/ProductRail";
import Steps from "@/components/home/Steps";
import Bento from "@/components/home/Bento";
import Calculator from "@/components/home/Calculator";
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

      <ProductRail />
      <Calculator />

      <Marquee items={brands} label="Brands we rent" />
      <Steps />
      <Bento />

      <Faq items={faqs} />
      <Guarantees />

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
                <li><span>Upfront cost</span><strong>Refundable deposit only*</strong></li>
                <li><span>Ready to use</span><strong>In 4 hours</strong></li>
                <li><span>Repairs & spares</span><strong>4-hr swap, free</strong></li>
                <li><span>Pay for</span><strong>Only the hours you use</strong></li>
              </ul>
            </Reveal>
          </div>
          <p className="fine">*Security deposit of at least one month&apos;s rent, refunded on return. Comparison based on Core i5, 16 GB business laptops.</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
