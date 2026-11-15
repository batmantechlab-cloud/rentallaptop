import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero nf">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="page-title">This page went <em>out for delivery.</em></h1>
        <p className="lead">It never came back. Let&apos;s get you somewhere useful.</p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary"><span>Go home</span></Link>
          <Link href="/rentals" className="btn btn-ghost"><span>Browse rentals</span></Link>
        </div>
      </div>
    </section>
  );
}
