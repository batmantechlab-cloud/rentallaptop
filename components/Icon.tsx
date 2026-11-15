const paths: Record<string, string> = {
  "laptop-rental": "M4 5h16v10H4z M2 19h20 M9 17h6",
  "macbook-rental": "M5 5.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1V15H5z M2.5 18.5h19 M10.5 16.5h3",
  "gaming-laptop-rental": "M6 9h4 M8 7v4 M15 8h.01 M17 10h.01 M7 4h10a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5h-1l-2 3h-4l-2-3H7a5 5 0 0 1-5-5V9a5 5 0 0 1 5-5z",
  "workstation-rental": "M9 3v3 M15 3v3 M9 18v3 M15 18v3 M3 9h3 M3 15h3 M18 9h3 M18 15h3 M6 6h12v12H6z M10 10h4v4h-4z",
  "desktop-rental": "M3 4h18v12H3z M8 21h8 M12 16v5",
  "server-rental": "M4 3h16v6H4z M4 11h16v6H4z M8 6h.01 M8 14h.01 M12 21h0 M4 19h16",
  "tablet-rental": "M6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M11 18h2",
  "projector-rental": "M2 8h20v8H2z M16 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M5 11h5 M5 16v2 M19 16v2",
  rocket: "M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1 0-2.9a2.1 2.1 0 0 0-3 -.1z M12 15l-3-3a22 22 0 0 1 2-4A13 13 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z M9 12H4s.6-3 2-4c1.6-1 5 0 5 0 M12 15v5s3-.6 4-2c1-1.6 0-5 0-5",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
  cap: "M22 10 12 5 2 10l10 5 10-5z M6 12v5c3 2 9 2 12 0v-5",
  headset: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
  film: "M3 3h18v18H3z M7 3v18 M17 3v18 M3 8h4 M3 16h4 M17 8h4 M17 16h4 M3 12h18",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
  clock: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z M12 6v6l4 2",
  receipt: "M4 2v20l3-2 3 2 3-2 3 2 3-2 1 1V2l-1 1-3-2-3 2-3-2-3 2-3-2z M8 8h8 M8 12h8 M8 16h5",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  award: "M12 2a6 6 0 1 0 0 12a6 6 0 1 0 0-12z M8.2 13 7 22l5-3 5 3-1.2-9",
  truck: "M1 4h14v12H1z M15 8h4l3 4v4h-7z M5.5 18.5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M18.5 18.5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  wrench: "M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L2 10l8-8z",
};

export default function Icon({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[name] ?? paths["laptop-rental"]} />
    </svg>
  );
}
