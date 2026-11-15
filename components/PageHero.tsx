import Link from "next/link";

type Crumb = { name: string; path: string };

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg" aria-hidden>
        <span /><span /><span />
      </div>
      <div className="container">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.path}>
                {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow anim-in" style={{ animationDelay: ".05s" }}>{eyebrow}</p>
        <h1 className="page-title anim-in" style={{ animationDelay: ".12s" }}>{title}</h1>
        <p className="lead anim-in" style={{ animationDelay: ".2s" }}>{lead}</p>
        {children && <div className="anim-in" style={{ animationDelay: ".28s" }}>{children}</div>}
      </div>
    </section>
  );
}
