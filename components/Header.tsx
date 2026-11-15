"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, products } from "@/lib/site";

const nav = [
  { href: "/rentals", label: "Rentals" },
  { href: "/locations", label: "Locations" },
  { href: "/#calculator", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      setScrolled(y > 20);
      setHidden(y > last && y > 400);
      last = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="logo" aria-label={`${site.name} home`}>
          <span className="logo-mark" aria-hidden>
            <i />
          </span>
          {site.name}
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {nav.map((n) => (
              <li key={n.href} className={n.href === "/rentals" ? "has-mega" : undefined}>
                <Link href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                  {n.label}
                </Link>
                {n.href === "/rentals" && (
                  <div className="mega">
                    {products.map((p) => (
                      <Link key={p.slug} href={`/rentals/${p.slug}`}>
                        <strong>{p.name}</strong>
                        <span>{p.short}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <a href={site.phoneHref} className="header-phone">
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary btn-sm">
            <span>Get a quote</span>
          </Link>
          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} hidden={!open}>
        <ul>
          {[...nav, { href: "/contact", label: "Contact" }].map((n, i) => (
            <li key={n.href} style={{ transitionDelay: `${0.05 * i + 0.1}s` }}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <a href={site.phoneHref} className="mobile-phone">
          Call {site.phone}
        </a>
      </div>
    </header>
  );
}
