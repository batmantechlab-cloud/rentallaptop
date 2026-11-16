// Central site configuration. Change brand, contact details and content here.

export const site = {
  name: "Rentalloop",
  legalName: "Rentalloop.",
  tagline: "Laptops on rent. By the hour, day, week or month.",
  description:
    "Rent laptops, MacBooks, gaming laptops, desktops and workstations in Chennai. Hourly, daily, weekly and monthly plans, 4-hour delivery, free on-site support and GST billing.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rentalloop.in",
  phone: "+91 75500 94955",
  phoneHref: "tel:+917550094955",
  whatsapp: "917550094955",
  email: "rentalloop26@gmail.com",
  address: {
    street: "",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "",
    country: "IN",
  },
  geo: { lat: 13.0827, lng: 80.2707 },
  hours: "Mo-Sa 09:00-20:00",
  founded: "2026",
  social: {
    linkedin: "https://www.linkedin.com/company/rentalloop",
    instagram: "https://www.instagram.com/rentalloop",
    facebook: "https://www.facebook.com/rentalloop",
    youtube: "https://www.youtube.com/@rentalloop",
  },
};

/**
 * Hourly pricing, taken from Laptop_Rental_Pricing_Calculator.xlsx.
 * Daily charge = MIN(hours × hourly rate, daily maximum).
 * Weekly price = monthly × 7 / 30.
 */
export type Tariff = { id: string; name: string; spec: string; hourly: number; dailyMax: number; monthly: number };

export const tariffs: Tariff[] = [
  { id: "i5", name: "Core i5", spec: "i5 · 16 GB RAM · 512 GB SSD", hourly: 69, dailyMax: 299, monthly: 2999 },
  { id: "i7", name: "Core i7", spec: "i7 · 16 GB RAM · 512 GB SSD", hourly: 99, dailyMax: 499, monthly: 4499 },
  { id: "rtx", name: "Core i7 + RTX", spec: "i7 · RTX GPU · 16 GB RAM", hourly: 129, dailyMax: 649, monthly: 5499 },
];

export const weeklyPrice = (t: Tariff) => (t.monthly * 7) / 30;

export const billingRules = [
  "Minimum booking: 3 billable hours per day.",
  "Sleep and powered-off time are not billed. Rendering time is billable.",
  "You pay for reserved powered-on session time, not keyboard or mouse activity.",
  "Weekly and monthly packages are available. Weekly price is 7/30 of the monthly price.",
  "Security deposit (at least one month's rent) is separate from the rental total.",
];

export type Product = {
  slug: string;
  name: string;
  short: string;
  keyword: string;
  from: number; // INR per month, starting
  daily: number; // INR per day, starting
  hourly?: number; // INR per hour, starting
  emoji: string;
  hue: number;
  intro: string;
  brands: string[];
  configs: { name: string; spec: string; month: number; hourly?: number; dailyMax?: number }[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
};

export const products: Product[] = [
  {
    slug: "laptop-rental",
    name: "Laptops",
    short: "Business laptops, Core i5 & i7",
    keyword: "Laptop on rent",
    from: 2999,
    daily: 299,
    hourly: 69,
    emoji: "💻",
    hue: 22,
    intro:
      "Business-grade Dell, HP and Lenovo laptops with Intel Core i5 and i7 processors. Pre-installed with licensed Windows, MS Office on request, antivirus and your company VPN, delivered and set up at your desk.",
    brands: ["Dell Latitude", "HP EliteBook", "Lenovo ThinkPad", "Asus ExpertBook", "Acer TravelMate"],
    configs: [
      { name: "Core i5", spec: "i5 · 16 GB RAM · 512 GB SSD", month: 2999, hourly: 69, dailyMax: 299 },
      { name: "Core i7", spec: "i7 · 16 GB RAM · 512 GB SSD", month: 4499, hourly: 99, dailyMax: 499 },
    ],
    idealFor: ["New joiners & onboarding", "Project-based teams", "Training batches", "Work from home"],
    faqs: [
      { q: "What is the minimum rental period for a laptop?", a: "You can rent by the hour, with a minimum of 3 billable hours per day. Daily charges are capped, and weekly and monthly packages cost less." },
      { q: "Do rented laptops come with software?", a: "Yes. Every laptop ships with a genuine Windows licence, antivirus and drivers. MS Office, Adobe, development tools and your company image can be pre-loaded at no extra setup charge." },
      { q: "What happens if the laptop breaks down?", a: "We replace it within 4 hours in Chennai city limits and within 24 hours elsewhere. Normal wear and hardware faults are covered at no cost." },
    ],
  },
  {
    slug: "macbook-rental",
    name: "MacBooks",
    short: "Apple M-series Air & Pro",
    keyword: "MacBook on rent",
    from: 3499,
    daily: 699,
    emoji: "🍎",
    hue: 210,
    intro:
      "Apple MacBook Air and MacBook Pro with M-series chips for designers, developers, video editors and founders who want Apple performance without a ₹1.5 lakh upfront cost.",
    brands: ["MacBook Air M2", "MacBook Air M3", "MacBook Pro M3 Pro", "MacBook Pro M4 Max"],
    configs: [
      { name: "Air", spec: "M2 · 8 GB · 256 GB · 13.6\"", month: 3499 },
      { name: "Air Plus", spec: "M3 · 16 GB · 512 GB · 15\"", month: 4999 },
      { name: "Pro", spec: "M3 Pro · 18 GB · 512 GB · 14\"", month: 6999 },
      { name: "Pro Max", spec: "M4 Max · 36 GB · 1 TB · 16\"", month: 11999 },
    ],
    idealFor: ["iOS & Mac developers", "Video & photo editing", "Design studios", "Startup teams"],
    faqs: [
      { q: "Can I rent a MacBook for a short project?", a: "Yes. MacBooks are available from 1 day for events and shoots, and monthly for projects." },
      { q: "Is my data wiped after return?", a: "Every returned device goes through a certified NIST 800-88 data wipe, and we can share a wipe certificate for compliance." },
    ],
  },
  {
    slug: "gaming-laptop-rental",
    name: "Gaming Laptops",
    short: "RTX graphics, high refresh",
    keyword: "Gaming laptop on rent",
    from: 5499,
    daily: 649,
    hourly: 129,
    emoji: "🎮",
    hue: 140,
    intro:
      "RTX-powered gaming laptops for esports tournaments, LAN events, game development and 3D rendering. 144 Hz to 240 Hz displays, tuned and stress-tested before every dispatch.",
    brands: ["Asus ROG", "Lenovo Legion", "MSI Katana", "HP Omen", "Acer Predator"],
    configs: [
      { name: "Core i7 + RTX", spec: "i7 · RTX GPU · 16 GB RAM", month: 5499, hourly: 129, dailyMax: 649 },
    ],
    idealFor: ["Esports tournaments", "Game development", "3D & Unreal projects", "LAN events"],
    faqs: [
      { q: "Can I rent 50+ gaming laptops for a tournament?", a: "Yes. We regularly supply 50–300 identical gaming rigs for college fests and esports events, with on-site engineers throughout." },
    ],
  },
  {
    slug: "workstation-rental",
    name: "Workstations",
    short: "Xeon & Threadripper power",
    keyword: "Workstation on rent",
    from: 5999,
    daily: 1199,
    emoji: "🧠",
    hue: 280,
    intro:
      "Mobile and tower workstations with Intel Xeon, AMD Threadripper and NVIDIA RTX professional GPUs for CAD, BIM, simulation, AI/ML and VFX workloads.",
    brands: ["Dell Precision", "HP Z Series", "Lenovo ThinkStation"],
    configs: [
      { name: "Mobile", spec: "Core i7 · RTX A2000 · 32 GB · 1 TB", month: 5999 },
      { name: "Tower", spec: "Xeon W · RTX A4000 · 64 GB · 2 TB", month: 9999 },
      { name: "AI Rig", spec: "Threadripper · RTX 6000 Ada · 128 GB", month: 24999 },
    ],
    idealFor: ["AutoCAD, Revit, SolidWorks", "AI / ML training", "VFX & rendering", "Simulation"],
    faqs: [
      { q: "Are your workstations ISV certified?", a: "Yes. Our Precision, Z and ThinkStation units are ISV certified for Autodesk, Dassault and Siemens applications." },
    ],
  },
  {
    slug: "desktop-rental",
    name: "Desktops",
    short: "Towers & all-in-ones",
    keyword: "Desktop on rent",
    from: 899,
    daily: 249,
    emoji: "🖥️",
    hue: 190,
    intro:
      "Complete desktop sets: tower or all-in-one with monitor, keyboard and mouse. The most economical way to equip call centres, exam halls, back offices and training rooms.",
    brands: ["Dell OptiPlex", "HP ProDesk", "Lenovo ThinkCentre", "iMac"],
    configs: [
      { name: "Basic", spec: "Core i3 · 8 GB · 256 GB · 19\" monitor", month: 899 },
      { name: "Standard", spec: "Core i5 · 16 GB · 512 GB · 22\" monitor", month: 1399 },
      { name: "All-in-One", spec: "Core i5 · 16 GB · 512 GB · 24\" AIO", month: 1999 },
    ],
    idealFor: ["Call centres & BPO", "Online exam centres", "Back-office teams", "Training rooms"],
    faqs: [
      { q: "Do desktop rentals include the monitor?", a: "Yes. Every desktop set includes monitor, keyboard, mouse and power cables. Dual-monitor setups are available." },
    ],
  },
];

export type Location = {
  slug: string;
  city: string;
  state: string;
  areas: string[];
  delivery: string;
  blurb: string;
};

export const locations: Location[] = [
  {
    slug: "chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    delivery: "4 hours",
    areas: ["OMR", "Guindy", "T. Nagar", "Velachery", "Anna Nagar", "Porur", "Sholinganallur", "Perungudi", "Tambaram", "Ambattur", "Nungambakkam", "Adyar", "Siruseri", "Egmore"],
    blurb:
      "Our headquarters and largest warehouse are in Chennai, so most Chennai orders reach you the same day. From IT parks in Sholinganallur and Siruseri to offices in Guindy and T. Nagar, we deliver, set up and support.",
  },
];

export const faqs = [
  { q: "How fast can you deliver a rental laptop?", a: "Within 4 hours inside Chennai city limits." },
  { q: "What documents do I need to rent a laptop?", a: "Businesses need a GST certificate, company PAN and a purchase order. Individuals need an Aadhaar or passport, a PAN card and a refundable security deposit." },
  { q: "Is there a security deposit?", a: "Yes. Every customer pays a refundable security deposit of at least one month's rent. It is returned within 1 working day of the device coming back." },
  { q: "Can I extend or end my rental early?", a: "Yes. Rentals are billed by the hour, so you can extend anytime with a WhatsApp message or return the device early and pay only for the hours used (minimum 3 hours per day). Weekly and monthly packages can also be extended." },
  { q: "What if the laptop gets damaged?", a: "Hardware faults and normal wear are on us. Accidental damage such as a cracked screen or liquid spill is charged at actual repair cost, or covered fully with our optional Rentalloop Protect plan." },
  { q: "Will I get a GST invoice?", a: "Yes. Every rental comes with a GST-compliant tax invoice so businesses can claim input tax credit." },
  { q: "Do you rent laptops to students and freelancers?", a: "Absolutely. Students, freelancers and individuals can rent by the hour with simple KYC and a refundable deposit." },
];

export const brands = ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "MSI"];

export const industries = [
  { title: "IT & Startups", text: "Scale teams up or down without locking cash into hardware.", icon: "rocket" },
  { title: "Events & Hackathons", text: "Hundreds of identical machines, set up overnight.", icon: "mic" },
  { title: "Training & Exams", text: "Imaged labs for certification and online exams.", icon: "cap" },
  { title: "BPO & Call Centres", text: "Desktop seats with headsets, ready by Monday.", icon: "headset" },
  { title: "Media & Studios", text: "MacBook Pros and workstations for edit suites.", icon: "film" },
  { title: "Students & Freelancers", text: "Premium laptops from ₹69 an hour.", icon: "user" },
];
