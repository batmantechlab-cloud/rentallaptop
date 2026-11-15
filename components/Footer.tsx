import Link from "next/link";
import { site, products, locations } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-mark" aria-hidden>
              <i />
            </span>
            {site.name}
          </Link>
          <p>{site.tagline} Laptops, MacBooks, desktops, workstations and servers on rent for businesses, events and individuals since {site.founded}.</p>
          <address>
            {site.address.street}, {site.address.city} {site.address.postalCode}, {site.address.region}
            <br />
            <a href={site.phoneHref}>{site.phone}</a> · <a href={`mailto:${site.email}`}>{site.email}</a>
          </address>
        </div>
        <nav aria-label="Rentals">
          <h2>Rentals</h2>
          <ul>
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/rentals/${p.slug}`}>{p.keyword}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Locations">
          <h2>Locations</h2>
          <ul>
            {locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`}>Laptop rental in {l.city}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <h2>Company</h2>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><a href={site.social.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
            <li><a href={site.social.instagram} rel="noopener noreferrer" target="_blank">Instagram</a></li>
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {year} {site.legalName} All rights reserved.</span>
        <span>GST-billed rentals · Chennai · Bangalore · Hyderabad</span>
      </div>
    </footer>
  );
}
