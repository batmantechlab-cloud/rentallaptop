import Link from "next/link";
import { locations } from "@/lib/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Laptop Rental Locations: Chennai, Bangalore, Hyderabad & More",
  description: "We deliver rental laptops, MacBooks, desktops and servers across Chennai, Bangalore, Hyderabad, Coimbatore, Pune and Mumbai. Same-day delivery in metro cities.",
  path: "/locations",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Locations", path: "/locations" },
];

export default function Locations() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        eyebrow="Service areas"
        title={<>Wherever work happens, <em>we deliver.</em></>}
        lead="Warehouses in Chennai, Bangalore and Hyderabad, with next-day delivery to Coimbatore, Pune and Mumbai."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container loc-grid big">
          {locations.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.05}>
              <Link href={`/locations/${l.slug}`} className="loc-card">
                <span className="loc-city">{l.city}</span>
                <span className="loc-meta">{l.delivery} delivery · {l.state}</span>
                <span className="loc-areas">{l.areas.join(" · ")}</span>
                <span className="arrow" aria-hidden>↗</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
