"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { products, site } from "@/lib/site";

const tenures = [
  // months = billable months (with tenure discount), span = calendar months
  { id: "1d", label: "1 day", months: 0.25, span: 0 },
  { id: "1w", label: "1 week", months: 0.6, span: 0 },
  { id: "1m", label: "1 month", months: 1, span: 1 },
  { id: "3m", label: "3 months", months: 3 * 0.95, span: 3 },
  { id: "6m", label: "6 months", months: 6 * 0.9, span: 6 },
  { id: "12m", label: "12 months", months: 12 * 0.85, span: 12 },
];

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export default function Calculator() {
  const [slug, setSlug] = useState(products[0].slug);
  const product = products.find((p) => p.slug === slug)!;
  const [cfg, setCfg] = useState(1);
  const [qty, setQty] = useState(10);
  const [tenure, setTenure] = useState("3m");

  const config = product.configs[Math.min(cfg, product.configs.length - 1)];
  const t = tenures.find((x) => x.id === tenure)!;

  const { total, discount, perUnit } = useMemo(() => {
    const vol = qty >= 50 ? 0.1 : qty >= 10 ? 0.05 : 0;
    const total = config.month * t.months * qty * (1 - vol);
    return { total, discount: vol, perUnit: total / qty / (t.span || 1) };
  }, [config, t, qty]);

  const msg = encodeURIComponent(
    `Hi ${site.name}, please share a quote:\n• ${qty} × ${product.name} (${config.name}: ${config.spec})\n• Duration: ${t.label}\n• Estimate shown: ${inr(total)} + GST`
  );

  return (
    <section id="calculator" className="section calc" aria-labelledby="calc-title">
      <div className="container calc-grid">
        <div>
          <p className="eyebrow">Instant estimate</p>
          <h2 id="calc-title" className="h2">
            Know your rent <em>before</em> you call.
          </h2>
          <p className="lead">
            Transparent pricing. Longer plans and bigger orders get cheaper automatically: up to 15% off for annual plans and 10% off on 50+ units.
          </p>

          <div className="calc-form">
            <fieldset>
              <legend>Device</legend>
              <div className="pills">
                {products.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    className={`pill ${p.slug === slug ? "on" : ""}`}
                    aria-pressed={p.slug === slug}
                    onClick={() => {
                      setSlug(p.slug);
                      setCfg(Math.min(1, p.configs.length - 1));
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Configuration</legend>
              <div className="cfg-list">
                {product.configs.map((c, i) => (
                  <label key={c.name} className={`cfg ${i === cfg ? "on" : ""}`}>
                    <input type="radio" name="cfg" checked={i === cfg} onChange={() => setCfg(i)} />
                    <strong>{c.name}</strong>
                    <span>{c.spec}</span>
                    <em>{inr(c.month)}/mo</em>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>
                Quantity <output>{qty}</output>
              </legend>
              <input
                type="range"
                min={1}
                max={200}
                value={qty}
                onChange={(e) => setQty(+e.target.value)}
                aria-label="Quantity"
                style={{ "--fill": `${(qty / 200) * 100}%` } as React.CSSProperties}
              />
            </fieldset>

            <fieldset>
              <legend>Duration</legend>
              <div className="pills">
                {tenures.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    className={`pill ${x.id === tenure ? "on" : ""}`}
                    aria-pressed={x.id === tenure}
                    onClick={() => setTenure(x.id)}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <aside className="quote" aria-live="polite">
          <div className="quote-inner">
            <p className="quote-label">Estimated total for {t.label}</p>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={Math.round(total)}
                className="quote-total"
                initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {inr(total)}
              </motion.p>
            </AnimatePresence>
            <p className="quote-gst">+ 18% GST · delivery & setup included</p>
            <dl>
              <div>
                <dt>Device</dt>
                <dd>
                  {qty} × {product.name} {config.name}
                </dd>
              </div>
              <div>
                <dt>Per device / {t.span ? "month" : t.label}</dt>
                <dd>{inr(perUnit)}</dd>
              </div>
              <div>
                <dt>Volume discount</dt>
                <dd>{discount ? `${discount * 100}% off` : "Add 10+ units"}</dd>
              </div>
              <div>
                <dt>Security deposit</dt>
                <dd>₹0 for GST businesses</dd>
              </div>
            </dl>
            <a
              className="btn btn-primary btn-block"
              href={`https://wa.me/${site.whatsapp}?text=${msg}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Lock this quote on WhatsApp</span>
            </a>
            <a className="btn btn-ghost btn-block" href={`mailto:${site.email}?subject=Rental quote&body=${msg}`}>
              <span>Email me the quote</span>
            </a>
            <small>Indicative pricing. Final quote depends on availability and customisation.</small>
          </div>
        </aside>
      </div>
    </section>
  );
}
