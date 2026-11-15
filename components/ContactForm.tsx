"use client";
import { useState } from "react";
import { products, site } from "@/lib/site";

/** Static-site form: validates in the browser, then hands off to WhatsApp or email. */
export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = Object.fromEntries(f.entries()) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!v.name?.trim()) err.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test((v.phone || "").replace(/\D/g, "").slice(-10))) err.phone = "Enter a valid 10-digit mobile number";
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) err.email = "Enter a valid email";
    setErrors(err);
    if (Object.keys(err).length) return;
    const text = `New rental enquiry\nName: ${v.name}\nCompany: ${v.company || "-"}\nPhone: ${v.phone}\nEmail: ${v.email || "-"}\nDevice: ${v.device}\nQuantity: ${v.qty}\nDuration: ${v.duration}\nNotes: ${v.notes || "-"}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-card sent" role="status">
        <h2 className="h3">Thanks! WhatsApp is open with your details.</h2>
        <p>Hit send and we&apos;ll reply within 15 minutes during business hours.</p>
        <button className="btn btn-ghost" onClick={() => setSent(false)}><span>Send another enquiry</span></button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="field-row">
        <Field name="name" label="Your name" error={errors.name} autoComplete="name" required />
        <Field name="company" label="Company (optional)" autoComplete="organization" />
      </div>
      <div className="field-row">
        <Field name="phone" label="Mobile number" type="tel" error={errors.phone} autoComplete="tel" required />
        <Field name="email" label="Email (optional)" type="email" error={errors.email} autoComplete="email" />
      </div>
      <div className="field-row">
        <label className="field">
          <span>Device</span>
          <select name="device" defaultValue={products[0].name}>
            {products.map((p) => <option key={p.slug}>{p.name}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Quantity</span>
          <input name="qty" type="number" min={1} defaultValue={1} />
        </label>
        <label className="field">
          <span>Duration</span>
          <select name="duration" defaultValue="1 month">
            {["1 day", "1 week", "1 month", "3 months", "6 months", "12+ months"].map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
      </div>
      <label className="field">
        <span>Anything else? (software, specs, delivery date)</span>
        <textarea name="notes" rows={4} />
      </label>
      <button type="submit" className="btn btn-primary btn-block"><span>Send enquiry via WhatsApp</span></button>
    </form>
  );
}

function Field({ name, label, error, type = "text", ...rest }: { name: string; label: string; error?: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`field ${error ? "has-error" : ""}`}>
      <span>{label}</span>
      <input name={name} type={type} aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined} {...rest} />
      {error && <small id={`${name}-err`}>{error}</small>}
    </label>
  );
}
