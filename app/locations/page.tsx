import Link from "next/link";
import { locations } from "@/lib/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Laptop Rental in Chennai: Delivery Areas",
  description: "We deliver rental laptops, MacBooks and desktops across Chennai, with 4-hour delivery inside city limits.",
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
        lead="4-hour delivery anywhere inside Chennai city limits."
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
