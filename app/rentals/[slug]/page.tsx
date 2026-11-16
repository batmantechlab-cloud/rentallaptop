import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, locations, faqs as globalFaqs, site } from "@/lib/site";
import { pageMeta, breadcrumbLd, productLd, faqLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Magnetic from "@/components/Magnetic";
import Icon from "@/components/Icon";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({
    title: p.hourly ? `${p.keyword} in Chennai from ₹${p.hourly}/hour` : `${p.keyword} in Chennai from ₹${p.daily}/day`,
    description: `${p.keyword} for businesses, events and individuals. ${p.brands.slice(0, 3).join(", ")} and more from ₹${p.from.toLocaleString("en-IN")}/month. Hourly plans, 4-hour delivery in Chennai, free setup & support.`,
    path: `/rentals/${p.slug}`,
    keywords: [p.keyword, `${p.keyword} Chennai`, `${p.name} rental`, ...p.brands.map((b) => `${b} on rent`)],
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Rentals", path: "/rentals" },
    { name: p.keyword, path: `/rentals/${p.slug}` },
  ];
  const faqItems = [...p.faqs, ...globalFaqs.slice(0, 4)];
  const others = products.filter((x) => x.slug !== p.slug).slice(0, 4);
  const msg = encodeURIComponent(`Hi ${site.name}, I'm interested in ${p.keyword}.`);

  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs), productLd(p), faqLd(faqItems)]} />
      <PageHero
        eyebrow={`${p.name} rental`}
        title={<>{p.keyword}, <em>delivered today.</em></>}
        lead={p.intro}
        crumbs={crumbs}
      >
        <div className="hero-actions">
          <Magnetic href={`https://wa.me/${site.whatsapp}?text=${msg}`} external>Get a quote</Magnetic>
          <Magnetic href="/#calculator" variant="ghost">Estimate price</Magnetic>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="cfg-title">
        <div className="container">
          <p className="eyebrow">Configurations & pricing</p>
          <h2 id="cfg-title" className="h2">Pick your <em>power level.</em></h2>
          <div className="plan-grid">
            {p.configs.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08} className={`plan ${i === 1 ? "featured" : ""}`}>
                {i === 1 && <span className="badge">Most rented</span>}
                <h3>{c.name}</h3>
                <p className="plan-spec">{c.spec}</p>
                <p className="plan-price">
                  ₹{c.month.toLocaleString("en-IN")}
                  <small>/month</small>
                </p>
                <p className="plan-day">
                  {c.hourly
                    ? `or ₹${c.hourly}/hour · max ₹${c.dailyMax}/day`
                    : `or ₹${Math.round(c.month * 0.25).toLocaleString("en-IN")}/day`}
                </p>
                <ul>
                  <li>Free delivery & setup</li>
                  <li>4-hour replacement</li>
                  <li>Licensed OS + antivirus</li>
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="fine">Prices exclude GST. Minimum 3 billable hours per day. Refundable security deposit of at least one month&apos;s rent.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="brand-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Models in stock</p>
            <h2 id="brand-title" className="h2">Brands you <em>trust.</em></h2>
            <ul className="tag-list">
              {p.brands.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Ideal for</p>
            <ul className="check-list">
              {p.idealFor.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="where-title">
        <div className="container">
          <h2 id="where-title" className="h3">{p.keyword} near you</h2>
          <ul className="tag-list">
            {locations.map((l) => (
              <li key={l.slug}><Link href={`/locations/${l.slug}`}>{p.keyword} in {l.city}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={faqItems} title={`${p.name} rental FAQ`} />

      <section className="section" aria-labelledby="also-title">
        <div className="container">
          <h2 id="also-title" className="h3">You may also need</h2>
          <div className="cat-grid small">
            {others.map((o) => (
              <Link key={o.slug} href={`/rentals/${o.slug}`} className="cat-card" style={{ "--h": o.hue } as React.CSSProperties}>
                <span className="rail-icon"><Icon name={o.slug} size={30} /></span>
                <h3>{o.keyword}</h3>
                <span className="cat-price">from ₹{o.from.toLocaleString("en-IN")}/mo</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
