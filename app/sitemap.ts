import type { MetadataRoute } from "next";
import { products, locations } from "@/lib/site";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly") => ({
    url: abs(path),
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1),
    page("/rentals", 0.9),
    ...products.map((p) => page(`/rentals/${p.slug}`, 0.9)),
    page("/locations", 0.8),
    ...locations.map((l) => page(`/locations/${l.slug}`, 0.8)),
    page("/faq", 0.6, "monthly"),
    page("/about", 0.5, "monthly"),
    page("/contact", 0.7, "monthly"),
  ];
}
