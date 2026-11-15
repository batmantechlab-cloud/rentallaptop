import type { Metadata } from "next";
import { site, type Product, type Location } from "./site";

export const abs = (path = "/") => new URL(path, site.url).toString();

export function pageMeta({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ComputerStore"],
  "@id": abs("/#business"),
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  logo: abs("/icon.svg"),
  image: abs("/opengraph-image"),
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹",
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "20:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  sameAs: Object.values(site.social),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": abs("/#website"),
  name: site.name,
  url: site.url,
  publisher: { "@id": abs("/#business") },
  inLanguage: "en-IN",
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${p.name} on Rent`,
  serviceType: p.keyword,
  description: p.intro,
  provider: { "@id": abs("/#business") },
  areaServed: ["Chennai", "Bangalore", "Hyderabad", "Coimbatore", "Pune", "Mumbai"],
  url: abs(`/rentals/${p.slug}`),
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: Math.min(...p.configs.map((c) => c.month)),
    highPrice: Math.max(...p.configs.map((c) => c.month)),
    offerCount: p.configs.length,
    availability: "https://schema.org/InStock",
  },
});

export const locationLd = (l: Location) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `Laptop Rental in ${l.city}`,
  serviceType: "Laptop rental",
  provider: { "@id": abs("/#business") },
  areaServed: { "@type": "City", name: l.city },
  url: abs(`/locations/${l.slug}`),
});
