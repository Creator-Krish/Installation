import type { GenerationResponse, ProjectRecord } from "./types";

export const demoProjects: ProjectRecord[] = [
  {
    id: "proj_restaurant_001",
    name: "Golden Spoon",
    prompt: "Create a restaurant booking website with table reservations, menu pages, and map integration.",
    target: "website",
    stack: "Next.js",
    audience: "Urban diners looking for a premium but fast booking experience",
    status: "ready",
    updatedAt: "2026-05-26T08:30:00.000Z",
  },
  {
    id: "proj_fitness_002",
    name: "PulseTrack",
    prompt: "Build a mobile fitness app with workout logging, progress charts, and social challenges.",
    target: "mobile-app",
    stack: "React Native",
    audience: "Busy professionals tracking progress between gym sessions",
    status: "generating",
    updatedAt: "2026-05-26T09:10:00.000Z",
  },
];

export const demoGeneration: GenerationResponse = {
  projectId: "proj_restaurant_001",
  status: "ready",
  variations: [
    {
      id: "variation-editorial",
      name: "Editorial Luxe",
      description: "High-end dining presentation with warm neutrals and oversized imagery.",
      styleKeywords: ["editorial", "premium", "immersive"],
      primaryColor: "#311E15",
      accentColor: "#C87A4A",
    },
    {
      id: "variation-modern",
      name: "Modern Booking Flow",
      description: "Conversion-first layout focused on reservations and menu discovery.",
      styleKeywords: ["modern", "conversion", "responsive"],
      primaryColor: "#172A3A",
      accentColor: "#0EA5A0",
    },
    {
      id: "variation-playful",
      name: "Local Favorite",
      description: "Community-driven visual direction with vibrant highlights and social proof.",
      styleKeywords: ["playful", "community", "bright"],
      primaryColor: "#7C2D12",
      accentColor: "#F59E0B",
    },
  ],
  blueprint: {
    summary: "A restaurant experience platform with booking, menu storytelling, and neighborhood trust signals.",
    pages: ["Home", "Reservations", "Menu", "Events", "Contact"],
    databaseTables: ["users", "reservations", "menu_items", "events", "reviews"],
    designTokens: {
      colors: ["#311E15", "#C87A4A", "#F6EFE7", "#FFFDFC"],
      fonts: ["Inter", "Merriweather"],
      spacingScale: ["4", "8", "12", "16", "24", "40", "64"],
    },
    components: [
      {
        id: "hero-1",
        type: "Hero",
        label: "Booking Hero",
        props: { title: "Reserve your next dinner", cta: "Book a table" },
        children: [],
      },
      {
        id: "menu-1",
        type: "FeatureGrid",
        label: "Chef Specials",
        props: { columns: 3 },
        children: [],
      },
    ],
  },
  starterFiles: [
    {
      path: "app/page.tsx",
      language: "tsx",
      summary: "Homepage with reservation hero and seasonal menu highlights.",
    },
    {
      path: "components/reservation-form.tsx",
      language: "tsx",
      summary: "Booking form component with date, time, and guest validation.",
    },
    {
      path: "prisma/schema.prisma",
      language: "prisma",
      summary: "Reservation and menu tables for the generated project data model.",
    },
  ],
};
