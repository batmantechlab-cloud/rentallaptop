"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { billingRules, site, tariffs, weeklyPrice } from "@/lib/site";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.round(n) || lo));

/**
 * Same maths as Laptop_Rental_Pricing_Calculator.xlsx:
 * - Hourly / daily cap: MIN(hours × hourly rate, daily max) × days
 * - Weekly package: full weeks × weekly price + leftover days at the daily cap
 * - Monthly package: full 30-day months × monthly price + leftover days at the daily cap
 * The cheapest option is recommended.
 */
export default function Calculator() {
  const [id, setId] = useState(tariffs[0].id);
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(10);
  const [qty, setQty] = useState(1);
  const tariff = tariffs.find((t) => t.id === id)!;

  const { daily, options, best } = useMemo(() => {
    const daily = Math.min(hours * tariff.hourly, tariff.dailyMax);
    const weekly = weeklyPrice(tariff);
    const options = [
      { id: "hourly", label: "Hourly / daily cap", how: `${inr(daily)} a day × ${days} day${days > 1 ? "s" : ""}`, total: daily * days },
      {
        id: "weekly",
        label: "Weekly package",
        how: `${Math.floor(days / 7)} wk × ${inr(weekly)} + ${days % 7} day × ${inr(daily)}`,
        total: Math.floor(days / 7) * weekly + (days % 7) * daily,
      },
      {
        id: "monthly",
        label: "Monthly package",
        how: `${Math.floor(days / 30)} mo × ${inr(tariff.monthly)} + ${days % 30} day × ${inr(daily)}`,
        total: Math.floor(days / 30) * tariff.monthly + (days % 30) * daily,
      },
    ].map((o) => ({ ...o, total: o.total * qty }));
    const best = options.reduce((a, b) => (b.total < a.total ? b : a));
    return { daily, options, best };
  }, [tariff, hours, days, qty]);

  const msg = encodeURIComponent(
    `Hi ${site.name}, please share a quote:\n• ${qty} × ${tariff.name} (${tariff.spec})\n• ${hours} hours/day for ${days} day(s)\n• Best option shown: ${best.label}, ${inr(best.total)} + GST`
  );

  return (
    <section id="calculator" className="section calc" aria-labelledby="calc-title">
      <div className="container calc-grid">
        <div>
          <p className="eyebrow">Hourly pricing</p>
          <h2 id="calc-title" className="h2">
            Pay only for the <em>hours you use.</em>
          </h2>
          <p className="lead">
            Pick a laptop, enter hours per day and number of days. We compare hourly, weekly and monthly billing and show you the cheapest.
          </p>

          <div className="calc-form">
            <fieldset>
              <legend>Device / configuration</legend>
              <div className="cfg-list">
                {tariffs.map((t) => (
                  <label key={t.id} className={`cfg ${t.id === id ? "on" : ""}`}>
                    <input type="radio" name="tariff" checked={t.id === id} onChange={() => setId(t.id)} />
                    <strong>{t.name}</strong>
                    <span>{t.spec}</span>
                    <em>
                      {inr(t.hourly)}/hr · max {inr(t.dailyMax)}/day
                    </em>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>
                Billable hours per day <output>{hours}</output>
              </legend>
              <input
                type="range"
                min={3}
                max={24}
                value={hours}
                onChange={(e) => setHours(+e.target.value)}
                aria-label="Billable hours per day"
                style={{ "--fill": `${((hours - 3) / 21) * 100}%` } as React.CSSProperties}
              />
            </fieldset>

            <fieldset>
              <legend>
                Rental duration (days)
                <input
                  className="num-input"
                  type="number"
                  min={1}
                  max={365}
                  value={days}
                  onChange={(e) => setDays(clamp(+e.target.value, 1, 365))}
                  aria-label="Rental duration in days"
                />
              </legend>
              <input
                type="range"
                min={1}
                max={90}
                value={Math.min(days, 90)}
                onChange={(e) => setDays(+e.target.value)}
                aria-label="Rental duration in days"
                style={{ "--fill": `${((Math.min(days, 90) - 1) / 89) * 100}%` } as React.CSSProperties}
              />
            </fieldset>

            <fieldset>
              <legend>
                Quantity <output>{qty}</output>
              </legend>
              <input
                type="range"
                min={1}
                max={100}
                value={qty}
                onChange={(e) => setQty(+e.target.value)}
                aria-label="Quantity"
                style={{ "--fill": `${((qty - 1) / 99) * 100}%` } as React.CSSProperties}
              />
            </fieldset>
          </div>

          <div className="tariff-table-wrap">
            <table className="tariff-table">
              <caption>Our tariffs</caption>
              <thead>
                <tr>
                  <th scope="col">Configuration</th>
                  <th scope="col">Hourly</th>
                  <th scope="col">Daily max</th>
                  <th scope="col">Weekly</th>
                  <th scope="col">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {tariffs.map((t) => (
                  <tr key={t.id}>
                    <th scope="row">{t.spec.split(" · ").slice(0, 2).join(" · ")}</th>
                    <td>{inr(t.hourly)}</td>
                    <td>{inr(t.dailyMax)}</td>
                    <td>{inr(weeklyPrice(t))}</td>
                    <td>{inr(t.monthly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="rules">
            {billingRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <aside className="quote" aria-live="polite">
          <div className="quote-inner">
            <p className="quote-label">Lowest total: {best.label}</p>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={Math.round(best.total)}
                className="quote-total"
                initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {inr(best.total)}
              </motion.p>
            </AnimatePresence>
            <p className="quote-gst">+ 18% GST · delivery & setup included</p>
            <dl>
              <div>
                <dt>Daily charge per device</dt>
                <dd>
                  {inr(daily)} {daily === tariff.dailyMax ? "(daily max)" : `(${hours} h × ${inr(tariff.hourly)})`}
                </dd>
              </div>
              {options.map((o) => (
                <div key={o.id} className={o.id === best.id ? "best" : undefined}>
                  <dt>
                    {o.label}
                    <small>{o.how}{qty > 1 ? ` × ${qty}` : ""}</small>
                  </dt>
                  <dd>{inr(o.total)}</dd>
                </div>
              ))}
              <div>
                <dt>Security deposit (refundable)</dt>
                <dd>{inr(tariff.monthly * qty)}</dd>
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
            <small>Indicative pricing. Security deposit is not included in the rental total.</small>
          </div>
        </aside>
      </div>
    </section>
  );
}
