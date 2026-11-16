import { faqs, products } from "@/lib/site";
import { pageMeta, breadcrumbLd, faqLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Laptop Rental FAQ: Deposit, Delivery, Damage & Documents",
  description: "Answers to common questions about renting laptops: documents, security deposit, delivery time, damage, GST invoices, hourly billing and extensions.",
  path: "/faq",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  const all = [...faqs, ...products.flatMap((p) => p.faqs)];
  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs), faqLd(all)]} />
      <PageHero
        eyebrow="Help centre"
        title={<>Everything you wanted <em>to ask.</em></>}
        lead="Can't find your answer? WhatsApp us and a real person replies within minutes."
        crumbs={crumbs}
      />
      <Faq items={all} title="Renting, explained." />
      <CtaBand />
    </>
  );
}
