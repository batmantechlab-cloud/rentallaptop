// Central site configuration. Change brand, contact details and content here.

export const site = {
  name: "Rentiva",
  legalName: "Rentiva IT Rentals Pvt. Ltd.",
  tagline: "Laptops on rent. Delivered in hours.",
  description:
    "Rent laptops, MacBooks, desktops, workstations and servers in Chennai, Bangalore and Hyderabad. Same-day delivery, flexible daily, weekly and monthly plans, free on-site support and GST billing for businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rentiva.in",
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  whatsapp: "919000000000",
  email: "hello@rentiva.in",
  address: {
    street: "No. 00, Sample Street, Demo Nagar",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600000",
    country: "IN",
  },
  geo: { lat: 13.0827, lng: 80.2707 },
  hours: "Mo-Sa 09:00-20:00",
  founded: "2014",
  social: {
    linkedin: "https://www.linkedin.com/company/rentiva",
    instagram: "https://www.instagram.com/rentiva",
    facebook: "https://www.facebook.com/rentiva",
    youtube: "https://www.youtube.com/@rentiva",
  },
  rating: { value: 4.9, count: 1287 },
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  keyword: string;
  from: number; // INR per month, starting
  daily: number; // INR per day, starting
  emoji: string;
  hue: number;
  intro: string;
  brands: string[];
  configs: { name: string; spec: string; month: number }[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
};

export const products: Product[] = [
  {
    slug: "laptop-rental",
    name: "Laptops",
    short: "Business laptops, i3 to i9",
    keyword: "Laptop on rent",
    from: 1199,
    daily: 299,
    emoji: "💻",
    hue: 22,
    intro:
      "Business-grade Dell, HP and Lenovo laptops with Intel Core i3 to i9 and AMD Ryzen processors. Pre-installed with licensed Windows, MS Office on request, antivirus and your company VPN, delivered and set up at your desk.",
    brands: ["Dell Latitude", "HP EliteBook", "Lenovo ThinkPad", "Asus ExpertBook", "Acer TravelMate"],
    configs: [
      { name: "Essential", spec: "Core i3 · 8 GB RAM · 256 GB SSD · 14\"", month: 1199 },
      { name: "Professional", spec: "Core i5 · 16 GB RAM · 512 GB SSD · 14\"", month: 1799 },
      { name: "Performance", spec: "Core i7 · 16 GB RAM · 512 GB SSD · 15.6\"", month: 2499 },
      { name: "Ultra", spec: "Core i9 / Ryzen 9 · 32 GB RAM · 1 TB SSD", month: 3999 },
    ],
    idealFor: ["New joiners & onboarding", "Project-based teams", "Training batches", "Work from home"],
    faqs: [
      { q: "What is the minimum rental period for a laptop?", a: "You can rent a laptop for as little as one day. Weekly, monthly and long-term (6–36 months) plans get progressively lower rates." },
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
    from: 3999,
    daily: 899,
    emoji: "🎮",
    hue: 140,
    intro:
      "RTX-powered gaming laptops for esports tournaments, LAN events, game development and 3D rendering. 144 Hz to 240 Hz displays, tuned and stress-tested before every dispatch.",
    brands: ["Asus ROG", "Lenovo Legion", "MSI Katana", "HP Omen", "Acer Predator"],
    configs: [
      { name: "Play", spec: "Core i5 · RTX 3050 · 16 GB · 144 Hz", month: 3999 },
      { name: "Pro", spec: "Core i7 · RTX 4060 · 16 GB · 165 Hz", month: 5999 },
      { name: "Elite", spec: "Core i9 · RTX 4080 · 32 GB · 240 Hz", month: 9999 },
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
  {
    slug: "server-rental",
    name: "Servers",
    short: "Rack & tower servers",
    keyword: "Server on rent",
    from: 7999,
    daily: 1999,
    emoji: "🗄️",
    hue: 0,
    intro:
      "Rack and tower servers, NAS and networking gear for proof-of-concepts, DR sites, migrations and temporary capacity, with configuration help from certified engineers.",
    brands: ["Dell PowerEdge", "HPE ProLiant", "Lenovo ThinkSystem", "Synology NAS"],
    configs: [
      { name: "Tower", spec: "Xeon E · 32 GB ECC · 2×2 TB", month: 7999 },
      { name: "1U Rack", spec: "Xeon Silver · 64 GB ECC · 4×1.2 TB SAS", month: 12999 },
      { name: "2U Rack", spec: "2× Xeon Gold · 256 GB ECC · 8×1.9 TB SSD", month: 29999 },
    ],
    idealFor: ["POC & testing", "Data migration", "Disaster recovery", "Temporary capacity"],
    faqs: [
      { q: "Do you help with server setup?", a: "Yes. Rack mounting, RAID configuration, OS and hypervisor installation are included with every server rental." },
    ],
  },
  {
    slug: "tablet-rental",
    name: "iPads & Tablets",
    short: "iPad, Galaxy Tab, kiosks",
    keyword: "iPad on rent",
    from: 999,
    daily: 349,
    emoji: "📱",
    hue: 330,
    intro:
      "iPads and Android tablets for event registration, surveys, retail demos, digital menus and field sales, with kiosk-mode setup and branded stands on request.",
    brands: ["iPad 10th Gen", "iPad Air", "iPad Pro", "Samsung Galaxy Tab"],
    configs: [
      { name: "Tab", spec: "Galaxy Tab A · 10.5\" · Wi-Fi", month: 999 },
      { name: "iPad", spec: "iPad 10th Gen · 10.9\" · Wi-Fi", month: 1799 },
      { name: "iPad Pro", spec: "iPad Pro M4 · 11\" · Pencil", month: 3999 },
    ],
    idealFor: ["Event registration", "Field surveys", "Retail demos", "Digital menus"],
    faqs: [
      { q: "Can tablets be locked to a single app?", a: "Yes. We configure single-app kiosk mode with your survey or registration app before delivery." },
    ],
  },
  {
    slug: "projector-rental",
    name: "Projectors & Displays",
    short: "Projectors, LED TVs, panels",
    keyword: "Projector on rent",
    from: 1499,
    daily: 499,
    emoji: "📽️",
    hue: 48,
    intro:
      "Projectors, screens, LED TVs and interactive panels for conferences, AGMs, product launches and classrooms, with on-site setup and an AV technician on request.",
    brands: ["Epson", "BenQ", "Sony", "Samsung", "LG"],
    configs: [
      { name: "Meeting", spec: "3,500 lumens · XGA · 6 ft screen", month: 1499 },
      { name: "Hall", spec: "6,000 lumens · Full HD · 10 ft screen", month: 3999 },
      { name: "LED TV", spec: "55\"–86\" 4K with floor stand", month: 2999 },
    ],
    idealFor: ["Conferences & AGMs", "Product launches", "Classrooms", "Exhibitions"],
    faqs: [
      { q: "Do you provide a technician for events?", a: "Yes. An AV technician can stay on-site for the full event at a nominal per-day charge." },
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
  {
    slug: "bangalore",
    city: "Bangalore",
    state: "Karnataka",
    delivery: "Same day",
    areas: ["Whitefield", "Electronic City", "Koramangala", "HSR Layout", "Indiranagar", "Marathahalli", "Bellandur", "Hebbal", "Manyata Tech Park", "JP Nagar"],
    blurb:
      "Startups and GCCs across Whitefield, Electronic City and Outer Ring Road rent from our Bangalore hub for onboarding spikes, hackathons and project teams.",
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    delivery: "Same day",
    areas: ["HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Financial District", "Banjara Hills", "Begumpet", "Kukatpally"],
    blurb:
      "We serve HITEC City, Gachibowli and the Financial District with laptops, MacBooks and workstations, backed by a local service team.",
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    state: "Tamil Nadu",
    delivery: "Next day",
    areas: ["Peelamedu", "Saravanampatti", "Gandhipuram", "RS Puram", "Tidel Park", "Avinashi Road"],
    blurb:
      "Colleges, IT parks and manufacturers across Coimbatore rent laptops and desktops for training, exams and expansion.",
  },
  {
    slug: "pune",
    city: "Pune",
    state: "Maharashtra",
    delivery: "Next day",
    areas: ["Hinjewadi", "Kharadi", "Magarpatta", "Baner", "Viman Nagar", "Hadapsar"],
    blurb:
      "From Hinjewadi to Kharadi, we supply IT teams, training institutes and event companies across Pune.",
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    delivery: "Next day",
    areas: ["Andheri", "BKC", "Powai", "Lower Parel", "Navi Mumbai", "Thane", "Goregaon"],
    blurb:
      "Media houses, agencies and enterprises across Mumbai rent MacBooks, laptops and AV equipment from us for projects and events.",
  },
];

export const faqs = [
  { q: "How fast can you deliver a rental laptop?", a: "Within 4 hours inside Chennai city limits and the same day in Bangalore and Hyderabad for orders confirmed before 2 PM. Other cities get next-day delivery." },
  { q: "What documents do I need to rent a laptop?", a: "Businesses need a GST certificate, company PAN and a purchase order. Individuals need an Aadhaar or passport, a PAN card and a refundable security deposit." },
  { q: "Is there a security deposit?", a: "Corporate clients with a GST number usually rent with zero deposit. Individuals and students pay a refundable deposit, typically one month's rent, returned within 3 working days of return." },
  { q: "Can I extend or end my rental early?", a: "Yes. Extend anytime with a WhatsApp message. Monthly plans can be closed early with 7 days' notice, and you only pay for the period used." },
  { q: "What if the laptop gets damaged?", a: "Hardware faults and normal wear are on us. Accidental damage such as a cracked screen or liquid spill is charged at actual repair cost, or covered fully with our optional Rentiva Protect plan." },
  { q: "Do you offer rent-to-own?", a: "Yes. On 12-month-plus plans, up to 70% of the rent paid can be adjusted against purchasing the same device at the end of the term." },
  { q: "Will I get a GST invoice?", a: "Yes. Every rental comes with a GST-compliant tax invoice so businesses can claim input tax credit." },
  { q: "Do you rent laptops to students and freelancers?", a: "Absolutely. Students, freelancers and individuals can rent from one day onwards with simple KYC and a refundable deposit." },
];

export const testimonials = [
  { name: "Priya Raman", role: "HR Head, SaaS company, OMR", text: "We onboarded 120 engineers in one week. Every laptop arrived imaged with our VPN and ready to log in. Zero tickets on day one." },
  { name: "Karthik S.", role: "Founder, Event agency", text: "60 MacBooks for a 3-day hackathon, delivered at 7 AM, collected at midnight. Their on-site engineer was a lifesaver." },
  { name: "Ananya Iyer", role: "Training Manager, Bank", text: "We rent desktops for every exam cycle. Pricing is transparent and the setup crew is fast and professional." },
  { name: "Rahul Menon", role: "CTO, Fintech startup", text: "Renting saved us ₹38 lakh in capex in year one. Upgrades to newer models are just a WhatsApp message away." },
  { name: "Divya Prakash", role: "Video editor, Freelance", text: "Rented a MacBook Pro M3 Max for a month-long project. The machine was spotless and the battery was like new." },
  { name: "Arun Kumar", role: "Admin, Engineering college", text: "300 gaming laptops for our symposium esports arena. Not one failed during the 2-day event." },
];

export const brands = ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "MSI", "Samsung", "Microsoft Surface", "Epson", "BenQ", "HPE"];

export const industries = [
  { title: "IT & Startups", text: "Scale teams up or down without locking cash into hardware.", icon: "rocket" },
  { title: "Events & Hackathons", text: "Hundreds of identical machines, set up overnight.", icon: "mic" },
  { title: "Training & Exams", text: "Imaged labs for certification and online exams.", icon: "cap" },
  { title: "BPO & Call Centres", text: "Desktop seats with headsets, ready by Monday.", icon: "headset" },
  { title: "Media & Studios", text: "MacBook Pros and workstations for edit suites.", icon: "film" },
  { title: "Students & Freelancers", text: "Premium laptops from ₹299 a day.", icon: "user" },
];
