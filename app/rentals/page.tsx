import Link from "next/link";
import { products } from "@/lib/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Rent Laptops, MacBooks, Desktops & Workstations",
  description:
    "Browse every device we rent: business laptops, MacBooks, gaming laptops, workstations and desktops. Hourly, daily, weekly and monthly plans with free delivery.",
  path: "/rentals",
  keywords: ["IT equipment rental", "computer rental", "laptop rental plans"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Rentals", path: "/rentals" },
];

export default function Rentals() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        eyebrow="All rentals"
        title={<>Every machine your team needs, <em>on rent.</em></>}
        lead="Laptops, MacBooks, gaming laptops, workstations and desktops, all tested, imaged and delivered with free setup. Pick a category to see configurations and prices."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container cat-grid">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.06}>
              <Link href={`/rentals/${p.slug}`} className="cat-card" style={{ "--h": p.hue } as React.CSSProperties}>
                <span className="rail-icon"><Icon name={p.slug} size={36} /></span>
                <h2>{p.keyword}</h2>
                <p>{p.short}</p>
                <span className="cat-price">
                  from {p.hourly ? <><strong>₹{p.hourly}</strong>/hr</> : <><strong>₹{p.daily}</strong>/day</>} · <strong>₹{p.from.toLocaleString("en-IN")}</strong>/mo
                </span>
                <span className="arrow" aria-hidden>→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
