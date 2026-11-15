export default function Faq({ items, title = "Questions, answered." }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h2">{title}</h2>
        </div>
        <div className="faq">
          {items.map((f) => (
            <details key={f.q}>
              <summary>
                <h3>{f.q}</h3>
                <span className="plus" aria-hidden />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
