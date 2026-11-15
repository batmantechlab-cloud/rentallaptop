export default function Marquee({ items, reverse = false, label }: { items: string[]; reverse?: boolean; label: string }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "reverse" : ""}`} aria-label={label} role="region">
      <ul className="marquee-track">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= items.length}>
            {t}
            <span className="star" aria-hidden>✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
