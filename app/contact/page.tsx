import { site } from "@/lib/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = pageMeta({
  title: "Contact Us: Get a Laptop Rental Quote in 15 Minutes",
  description: `Call ${site.phone}, WhatsApp or email ${site.email} for laptop, MacBook and desktop rental quotes. Office in Chennai. Open Monday to Saturday, 9 AM to 8 PM.`,
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function Contact() {
  const mapQ = encodeURIComponent([site.address.street, site.address.city].filter(Boolean).join(", "));
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        eyebrow="Talk to us"
        title={<>A quote in <em>15 minutes.</em></>}
        lead="Tell us what you need. We reply with availability, pricing and a delivery slot."
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container contact-grid">
          <ContactForm />
          <aside className="contact-info">
            <div>
              <h2 className="h3">Call or WhatsApp</h2>
              <a href={site.phoneHref} className="big-link">{site.phone}</a>
            </div>
            <div>
              <h2 className="h3">Email</h2>
              <a href={`mailto:${site.email}`} className="big-link">{site.email}</a>
            </div>
            <div>
              <h2 className="h3">Visit</h2>
              <address>
                {site.address.street && (
                  <>
                    {site.address.street}
                    <br />
                  </>
                )}
                {[site.address.city, site.address.postalCode].filter(Boolean).join(" ")}, {site.address.region}
              </address>
              <p className="muted">Mon–Sat, 9 AM – 8 PM</p>
              <a className="link" href={`https://www.google.com/maps/search/?api=1&query=${mapQ}`} target="_blank" rel="noopener noreferrer">
                Open in Google Maps ↗
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
