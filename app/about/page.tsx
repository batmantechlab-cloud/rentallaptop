import { site } from "@/lib/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Counters from "@/components/home/Counters";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: `About ${site.name}: IT Rentals Since ${site.founded}`,
  description: `${site.name} has rented laptops, desktops and servers to 2,400+ businesses since ${site.founded}. Learn about our fleet, process and the team behind it.`,
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const values = [
  { t: "Every device, tested twice", d: "A 42-point hardware check before dispatch and again after return. Batteries below 85% health are retired." },
  { t: "Data wiped, certified", d: "NIST 800-88 data sanitisation on every return, with a certificate on request." },
  { t: "Humans on WhatsApp", d: "No ticket queues. A named account manager and engineers who reply in minutes." },
  { t: "Refurbish, then recycle", d: "Devices live 2–3 rental lives, then go to certified e-waste recyclers. Nothing goes to landfill." },
];

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        eyebrow={`Since ${site.founded}`}
        title={<>We make hardware <em>feel like software.</em></>}
        lead={`${site.name} started in a 400 sq. ft. room in Chennai with 30 laptops and one van. Today we run an 18,000-device fleet across six cities, with one promise: the right machine, on your desk, the same day.`}
        crumbs={crumbs}
      />
      <Counters />
      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <p className="eyebrow">How we work</p>
          <h2 id="values-title" className="h2">Small details, <em>obsessively.</em></h2>
          <div className="plan-grid">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07} className="plan">
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
