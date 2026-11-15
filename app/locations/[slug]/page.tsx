import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locations, products, faqs, site } from "@/lib/site";
import { pageMeta, breadcrumbLd, locationLd, faqLd } from "@/lib/seo";
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
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) return {};
  return pageMeta({
    title: `Laptop on Rent in ${l.city} | ${l.delivery} Delivery`,
    description: `Rent laptops, MacBooks, desktops and servers in ${l.city}. ${l.delivery} delivery to ${l.areas.slice(0, 4).join(", ")} and more. Daily, weekly & monthly plans with free setup.`,
    path: `/locations/${l.slug}`,
    keywords: [`laptop on rent in ${l.city}`, `laptop rental ${l.city}`, `MacBook rental ${l.city}`, ...l.areas.map((a) => `laptop rental ${a}`)],
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: l.city, path: `/locations/${l.slug}` },
  ];
  const localFaqs = [
    { q: `How fast is laptop delivery in ${l.city}?`, a: `${l.delivery} delivery across ${l.city}, including ${l.areas.slice(0, 5).join(", ")}, for orders confirmed before 2 PM.` },
    { q: `Do you provide on-site support in ${l.city}?`, a: `Yes. Our ${l.city} engineers handle setup, troubleshooting and replacements at your location.` },
    ...faqs.slice(1, 5),
  ];
  const msg = encodeURIComponent(`Hi ${site.name}, I need laptops on rent in ${l.city}.`);

  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs), locationLd(l), faqLd(localFaqs)]} />
      <PageHero
        eyebrow={`${l.city}, ${l.state}`}
        title={<>Laptop on rent in <em>{l.city}.</em></>}
        lead={l.blurb}
        crumbs={crumbs}
      >
        <div className="hero-actions">
          <Magnetic href={`https://wa.me/${site.whatsapp}?text=${msg}`} external>Get {l.city} pricing</Magnetic>
          <Magnetic href="/#calculator" variant="ghost">Estimate price</Magnetic>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="areas-title">
        <div className="container">
          <p className="eyebrow">{l.delivery} delivery</p>
          <h2 id="areas-title" className="h2">Areas we cover in <em>{l.city}.</em></h2>
          <ul className="tag-list big">
            {l.areas.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="what-title">
        <div className="container">
          <h2 id="what-title" className="h2">Rent in {l.city}</h2>
          <div className="cat-grid">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.05}>
                <Link href={`/rentals/${p.slug}`} className="cat-card" style={{ "--h": p.hue } as React.CSSProperties}>
                  <span className="rail-icon"><Icon name={p.slug} size={30} /></span>
                  <h3>{p.keyword} in {l.city}</h3>
                  <span className="cat-price">from ₹{p.from.toLocaleString("en-IN")}/mo</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={localFaqs} title={`Renting in ${l.city}`} />
      <CtaBand title={`Need laptops in ${l.city}?`} />
    </>
  );
}
