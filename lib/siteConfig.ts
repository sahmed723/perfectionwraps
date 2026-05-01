export const siteConfig = {
  brand: {
    name: "Perfection Wraps",
    legal: "Perfection Wraps LLC",
    tagline: "Where Vinyl Meets Obsession",
    foundedYear: 2018,
    phone: "678-384-2956",
    phoneTel: "+16783842956",
    sms: "678-384-2956",
    email: "info@perfectionwraps.com",
    domain: "perfectionwraps.com",
    address: {
      street: "503 Hickory Ridge Trail Ste 170",
      city: "Woodstock",
      state: "GA",
      zip: "30188",
      lat: 34.1015,
      lng: -84.5188,
      placeId: "",
    },
    hours: {
      mon: "09:00-18:00",
      tue: "09:00-18:00",
      wed: "09:00-18:00",
      thu: "09:00-18:00",
      fri: "09:00-18:00",
      sat: "10:00-16:00",
      sun: "closed",
    },
    colors: {
      ink: "#0a0a0a",
      bone: "#f5f4ef",
      accent: "#FFD700",
      accentDark: "#F2A900",
      cut: "#FF3D00",
    },
    social: {
      instagram: "https://instagram.com/perfectionwrapgraphics",
      facebook: "https://facebook.com/perfectionwrapgraphics",
    },
    googleReviewLink: "https://g.page/r/PERFECTION_WRAPS_PLACE_ID/review",
  },

  services: [
    {
      slug: "vinyl-wraps",
      name: "Vinyl Wraps",
      shortName: "Wraps",
      priceFrom: 2500,
      leadTimeDays: "2–5",
      hookLine:
        "Color-change, satin, gloss, matte, and chrome wraps installed in a controlled, dust-free shop.",
      bullets: [
        "3M, Avery Dennison, Inozetek certified",
        "5–7 year manufacturer warranty",
        "Hand-laid, heat-set, edge-sealed",
        "Single-piece panels where possible",
      ],
      brands: ["3M", "Avery Dennison", "Inozetek", "KPMF"],
      faq: [
        {
          q: "How long does a vinyl wrap last?",
          a: "Premium vinyl from 3M and Avery Dennison carries a 5–7 year manufacturer warranty. With a covered garage and basic maintenance, real-world life is 6–8 years.",
        },
        {
          q: "Will a wrap damage my paint?",
          a: "No — properly installed and removed by a certified shop, vinyl protects the original paint underneath. We only wrap factory paint in good condition.",
        },
        {
          q: "How long does the install take?",
          a: "Full color changes take 2–5 business days depending on coverage and prep. Partial wraps and accent pieces are typically same-day or next-day.",
        },
        {
          q: "Can I wash and wax my wrap?",
          a: "Yes. Hand wash with pH-neutral soap. Skip automated brush carwashes and never use polish or wax containing abrasives.",
        },
      ],
    },
    {
      slug: "ppf",
      name: "Paint Protection Film",
      shortName: "PPF",
      priceFrom: 1500,
      leadTimeDays: "1–3",
      hookLine:
        "Self-healing 8-mil urethane that stops rock chips, swirl marks, and road debris from ever touching the paint.",
      bullets: [
        "XPEL Ultimate Plus & SunTek Ultra",
        "Self-healing top coat",
        "10-year clarity warranty",
        "Hydrophobic, edge-sealed",
      ],
      brands: ["XPEL", "SunTek", "STEK", "LLumar"],
      faq: [
        {
          q: "What's the difference between PPF and ceramic coating?",
          a: "PPF is a physical 8-mil urethane film that absorbs rock chips. Ceramic is a chemical coating that adds hydrophobic gloss but offers no impact protection. They stack — PPF underneath, ceramic on top.",
        },
        {
          q: "How long does PPF last?",
          a: "Premium PPF carries a 10-year clarity warranty against yellowing, cracking, and peeling. Real-world life on garage-kept vehicles often exceeds 12 years.",
        },
        {
          q: "What coverage do most owners get?",
          a: "Front-end (bumper, hood, fenders, mirrors, headlights) is the most common. Track Pack adds rocker panels and A-pillars. Full-body wraps the entire painted surface.",
        },
        {
          q: "Will I see the edges?",
          a: "Cuts are computer-plotted from XPEL's pattern library and edge-tucked. From three feet you cannot see them.",
        },
      ],
    },
    {
      slug: "ceramic-coating",
      name: "Ceramic Coating",
      shortName: "Ceramic",
      priceFrom: 800,
      leadTimeDays: "1–2",
      hookLine:
        "9H hydrophobic protection with up to 9-year warranty options — gloss, depth, and easy maintenance.",
      bullets: [
        "9H surface hardness",
        "2–9 year warranty options",
        "Hydrophobic, anti-static",
        "Single-stage to multi-layer + graphene",
      ],
      brands: ["Gtechniq", "CQuartz", "IGL", "Modesta"],
      faq: [
        {
          q: "Does ceramic replace waxing?",
          a: "Yes. Once cured, ceramic forms a semi-permanent layer that lasts years and outperforms wax in gloss, hydrophobicity, and chemical resistance.",
        },
        {
          q: "Will ceramic stop scratches?",
          a: "It increases scratch resistance but does not stop rock chips. For impact protection, pair with PPF.",
        },
        {
          q: "How do I maintain a coated car?",
          a: "Hand wash every 2–3 weeks with pH-neutral soap. Annual decontamination wash and topper service keeps the coating performing through its full warranty period.",
        },
      ],
    },
    {
      slug: "window-tinting",
      name: "Window Tinting",
      shortName: "Tint",
      priceFrom: 250,
      leadTimeDays: "same-day",
      hookLine:
        "Llumar IRX ceramic tint — 96% IR rejection, 99% UV block, no signal interference, lifetime warranty.",
      bullets: [
        "Llumar IRX ceramic series",
        "96% IR / 99% UV rejection",
        "Lifetime manufacturer warranty",
        "Georgia-legal VLT levels",
      ],
      brands: ["LLumar", "3M Crystalline", "SunTek CIR", "Suntek Carbon"],
      faq: [
        {
          q: "What's the legal tint limit in Georgia?",
          a: "Front side windows must allow 32%+ light transmission. Rear side and back glass have no minimum on most vehicles. Medical exemptions available.",
        },
        {
          q: "Why ceramic tint over dyed?",
          a: "Ceramic blocks infrared heat without dyes that fade. The cabin stays measurably cooler and the film won't turn purple in 3 years.",
        },
        {
          q: "Does tint affect cellular and GPS signal?",
          a: "Quality ceramic tint contains no metallic particles. Llumar IRX has zero impact on RF transmission.",
        },
      ],
    },
    {
      slug: "fleet-graphics",
      name: "Fleet Graphics",
      shortName: "Fleet",
      priceFrom: 1200,
      leadTimeDays: "5–10",
      hookLine:
        "Print-and-cut decals, partial wraps, and full fleet brand rollouts — from one van to fifty.",
      bullets: [
        "Brand-color matched 3M IJ180Cv3",
        "Single van to 50+ unit deployments",
        "Reflective and perforated window options",
        "Volume pricing past 5 units",
      ],
      brands: ["3M IJ180Cv3", "Avery MPI 1105", "Oracal 3951RA"],
      faq: [
        {
          q: "Do you do single vans or just fleets?",
          a: "Both. We handle one-off owner-operators and 50-vehicle rollouts with the same install standards.",
        },
        {
          q: "Can we lease the design and amortize the cost?",
          a: "Yes. Contact us for fleet financing options on 5+ vehicle commitments.",
        },
        {
          q: "How are repairs handled if a panel is damaged?",
          a: "We keep your print files on cloud storage for 5 years. Single-panel repairs typically ship within 7 business days.",
        },
      ],
    },
    {
      slug: "architectural-graphics",
      name: "Architectural Graphics",
      shortName: "Architectural",
      priceFrom: 800,
      leadTimeDays: "varies",
      hookLine:
        "Wall wraps, storefront graphics, frosted privacy films, and large-format interior brand installs.",
      bullets: [
        "Wall murals and brand walls",
        "Storefront window graphics",
        "Frosted privacy film",
        "Removable / non-permanent options",
      ],
      brands: ["3M DI-NOC", "Avery MPI 1105", "Oracal 8510"],
      faq: [
        {
          q: "Can you install on textured walls?",
          a: "Yes — we use 3M IJ8624 wall film with a controlled-tack adhesive that conforms to brick, concrete, and lightly textured drywall.",
        },
        {
          q: "Are these permanent?",
          a: "Most wall vinyl removes cleanly within 5–7 years using heat. We can also spec removable-grade film for short-term campaigns.",
        },
      ],
    },
  ],

  cities: [
    { slug: "woodstock", name: "Woodstock", lat: 34.1015, lng: -84.5188, county: "Cherokee", pop: 35000, drivetimeMin: 0, hq: true },
    { slug: "atlanta", name: "Atlanta", lat: 33.7490, lng: -84.3880, county: "Fulton", pop: 499000, drivetimeMin: 45, hq: false },
    { slug: "alpharetta", name: "Alpharetta", lat: 34.0754, lng: -84.2941, county: "Fulton", pop: 65000, drivetimeMin: 25, hq: false },
    { slug: "canton", name: "Canton", lat: 34.2370, lng: -84.4910, county: "Cherokee", pop: 31000, drivetimeMin: 15, hq: false },
    { slug: "cumming", name: "Cumming", lat: 34.2073, lng: -84.1402, county: "Forsyth", pop: 7000, drivetimeMin: 30, hq: false },
    { slug: "marietta", name: "Marietta", lat: 33.9526, lng: -84.5499, county: "Cobb", pop: 60000, drivetimeMin: 25, hq: false },
    { slug: "roswell", name: "Roswell", lat: 34.0232, lng: -84.3616, county: "Fulton", pop: 95000, drivetimeMin: 30, hq: false },
    { slug: "sandy-springs", name: "Sandy Springs", lat: 33.9304, lng: -84.3733, county: "Fulton", pop: 109000, drivetimeMin: 35, hq: false },
  ],

  reviews: [
    {
      author: "Jennifer M.",
      rating: 5,
      service: "Detail + 6mo Protectant",
      body: "Had my Explorer detailed this week and it looks better than new. Shined beautifully and the team was thorough.",
    },
    {
      author: "Michelle M.",
      rating: 5,
      service: "Vinyl Wrap",
      body: "The rate at which they respond to messages is fantastic, and the quality of work matches the customer service.",
    },
    {
      author: "Tyler Q.",
      rating: 5,
      service: "PPF + Ceramic",
      body: "My car looks almost brand new. Owner was responsive and even fit me in after I had to move my appointment.",
    },
  ],
} as const;

export type SiteService = (typeof siteConfig.services)[number];
export type SiteCity = (typeof siteConfig.cities)[number];

export function getService(slug: string): SiteService | undefined {
  return siteConfig.services.find((s) => s.slug === slug);
}

export function getCity(slug: string): SiteCity | undefined {
  return siteConfig.cities.find((c) => c.slug === slug);
}

export function nearbyCities(slug: string, n = 3): SiteCity[] {
  const home = getCity(slug);
  if (!home) return [];
  const others = siteConfig.cities.filter((c) => c.slug !== slug);
  return others
    .map((c) => ({
      city: c,
      d: Math.hypot(c.lat - home.lat, c.lng - home.lng),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map((x) => x.city);
}

export function relatedServices(slug: string, n = 2): SiteService[] {
  return siteConfig.services.filter((s) => s.slug !== slug).slice(0, n);
}

export function fullAddress(): string {
  const a = siteConfig.brand.address;
  return `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
}

export function formatHours() {
  const h = siteConfig.brand.hours;
  return [
    { day: "MON–FRI", hours: h.mon === h.fri ? h.mon : `${h.mon} / ${h.fri}` },
    { day: "SAT", hours: h.sat },
    { day: "SUN", hours: h.sun },
  ];
}
