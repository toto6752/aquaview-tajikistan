export type RegionRisk = "high" | "moderate" | "low";

export interface Region {
  name: string;
  // rough simplified polygon [lat, lng]
  polygon: [number, number][];
  access: number; // %
  risk: RegionRisk;
  population: string;
  capital: string;
}

export const regions: Region[] = [
  {
    name: "Sughd",
    capital: "Khujand",
    access: 84,
    risk: "low",
    population: "2.7M",
    polygon: [
      [40.7, 68.4],[41.05, 69.6],[40.6, 70.9],[39.9, 70.8],[39.6, 69.5],[39.9, 68.5],[40.7, 68.4],
    ],
  },
  {
    name: "Districts of Republican Subordination",
    capital: "Dushanbe",
    access: 78,
    risk: "moderate",
    population: "2.3M",
    polygon: [
      [39.6, 69.5],[39.9, 70.8],[39.3, 71.5],[38.5, 71.4],[38.3, 70.3],[38.7, 69.4],[39.6, 69.5],
    ],
  },
  {
    name: "Khatlon",
    capital: "Bokhtar",
    access: 65,
    risk: "moderate",
    population: "3.4M",
    polygon: [
      [38.7, 69.4],[38.3, 70.3],[37.6, 70.5],[37.1, 69.8],[37.3, 68.4],[38.2, 68.3],[38.7, 69.4],
    ],
  },
  {
    name: "Gorno-Badakhshan (GBAO)",
    capital: "Khorog",
    access: 52,
    risk: "high",
    population: "0.23M",
    polygon: [
      [39.3, 71.5],[39.6, 73.8],[38.4, 74.9],[37.0, 74.8],[36.7, 72.5],[37.6, 70.5],[38.3, 70.3],[39.3, 71.5],
    ],
  },
];

export const rivers: { name: string; path: [number, number][] }[] = [
  {
    name: "Amu Darya (Panj)",
    path: [
      [37.1, 68.3],[37.2, 69.1],[37.3, 69.9],[37.45, 70.6],[37.6, 71.3],[37.4, 72.1],[37.0, 72.6],[36.9, 73.3],
    ],
  },
  {
    name: "Vakhsh",
    path: [[39.2, 70.8],[38.7, 70.0],[38.3, 69.8],[37.9, 69.0],[37.5, 68.5]],
  },
  {
    name: "Syr Darya",
    path: [[40.3, 69.6],[40.4, 69.0],[40.5, 68.5],[40.6, 68.0]],
  },
  {
    name: "Zarafshan",
    path: [[39.4, 70.6],[39.5, 69.8],[39.55, 69.0],[39.6, 68.2]],
  },
];

export const glaciers: { name: string; coords: [number, number]; areaKm2: number }[] = [
  { name: "Fedchenko Glacier", coords: [38.78, 72.25], areaKm2: 700 },
  { name: "Grumm-Grzhimaylo", coords: [38.55, 72.4], areaKm2: 142 },
  { name: "Garmo", coords: [38.95, 72.05], areaKm2: 114 },
  { name: "Bivachny", coords: [38.85, 72.1], areaKm2: 56 },
  { name: "Medvezhiy", coords: [38.65, 72.0], areaKm2: 24 },
];

export const hydropower: { name: string; coords: [number, number]; capacity: string }[] = [
  { name: "Nurek Dam", coords: [38.37, 69.34], capacity: "3,000 MW" },
  { name: "Rogun Dam", coords: [38.69, 69.78], capacity: "3,600 MW" },
  { name: "Sangtuda-1", coords: [38.15, 69.22], capacity: "670 MW" },
  { name: "Sangtuda-2", coords: [38.07, 69.20], capacity: "220 MW" },
  { name: "Qairokkum", coords: [40.27, 69.82], capacity: "126 MW" },
];

export const riskZones: { name: string; coords: [number, number]; type: string }[] = [
  { name: "Khatlon Flood Zone", coords: [37.6, 68.8], type: "Flood" },
  { name: "GBAO Drought", coords: [37.5, 73.5], type: "Drought" },
  { name: "Vakhsh Mudflow", coords: [38.4, 69.7], type: "Mudflow" },
];

export const reservoirs: { name: string; coords: [number, number] }[] = [
  { name: "Nurek Reservoir", coords: [38.50, 69.40] },
  { name: "Qairokkum Reservoir", coords: [40.28, 69.82] },
  { name: "Sarez Lake", coords: [38.20, 72.78] },
];

export const populationCenters: { name: string; coords: [number, number]; pop: string }[] = [
  { name: "Dushanbe", coords: [38.56, 68.79], pop: "863k" },
  { name: "Khujand", coords: [40.28, 69.62], pop: "183k" },
  { name: "Bokhtar", coords: [37.84, 68.78], pop: "111k" },
  { name: "Kulob", coords: [37.91, 69.78], pop: "106k" },
  { name: "Khorog", coords: [37.49, 71.55], pop: "30k" },
];

export const agriculturalZones: [number, number][][] = [
  [[40.4, 69.0],[40.5, 70.0],[40.1, 70.2],[40.0, 69.1],[40.4, 69.0]],
  [[37.9, 68.5],[38.1, 69.4],[37.6, 69.6],[37.4, 68.6],[37.9, 68.5]],
];

export const protectedAreas: [number, number][][] = [
  [[38.6, 72.0],[39.1, 73.0],[38.6, 73.8],[38.0, 73.5],[38.0, 72.4],[38.6, 72.0]],
];

export const stats = [
  { id: "water", labelKey: "stats.water", value: 55.3, suffix: "%", delta: "+0.03%/yr", trend: "up" as const, decimals: 1, source: "World Bank 2022" },
  { id: "glacier", labelKey: "stats.glacier", value: 8476, suffix: " km²", delta: "-1.1%/yr", trend: "down" as const, source: "TajNCID / RGI 7.0" },
  { id: "risk", labelKey: "stats.risk", value: 18, suffix: "", delta: "500–600/yr", trend: "flat" as const, source: "UNEP 2025" },
  { id: "hydro", labelKey: "stats.hydro", value: 5.9, suffix: " GW", delta: "+Rogun", trend: "up" as const, decimals: 1, source: "MEWR Tajikistan" },
  { id: "pop", labelKey: "stats.pop", value: 10.1, suffix: "M", delta: "+1.2%", trend: "up" as const, decimals: 1, source: "World Bank 2024" },
];

export const aiKnowledge: { match: RegExp; answer: string }[] = [
  {
    match: /glacier|retreat|melt/i,
    answer:
      "Tajikistan's glaciers — including the massive Fedchenko Glacier — have lost roughly **30% of their area** since the 1930s. Rising regional temperatures (+1.0–1.2°C since 1940), reduced winter snowfall, and dust deposition are the main drivers. Continued retreat threatens long-term flows in the Amu Darya basin, which supplies water to ~60M people downstream.",
  },
  {
    match: /nurek|rogun|dam|hydropower/i,
    answer:
      "**Nurek Dam** (3,000 MW) on the Vakhsh River has been Tajikistan's energy backbone since 1972. **Rogun Dam**, under construction upstream, will reach **3,600 MW** and 335 m height — the tallest dam in the world. Together they will provide ~75% of national electricity and significant winter export capacity, but raise concerns from downstream Uzbekistan over Amu Darya flows.",
  },
  {
    match: /gbao|badakhshan|scarcity/i,
    answer:
      "Water scarcity in **GBAO** is driven by extreme altitude (avg. 3,500 m), low precipitation outside glacier-fed valleys, sparse infrastructure, and increasing drought frequency. Only ~52% of the population has reliable clean water access. Investment focus areas: gravity-fed spring systems, micro-hydro, and rehabilitating Soviet-era networks.",
  },
  {
    match: /flood|khatlon/i,
    answer:
      "**Khatlon** faces three flood risk types: (1) spring snowmelt surges on the Vakhsh and Panj, (2) glacial lake outburst floods (GLOFs) from upstream GBAO, and (3) summer convective storms causing mudflows. The 2021 floods displaced 4,200 people. Early warning systems and reservoir reoperation at Nurek are the main mitigations.",
  },
  {
    match: /downstream|uzbekistan|aral|transboundary/i,
    answer:
      "Tajikistan supplies **~55% of Central Asia's surface water**. Glacier melt currently *increases* downstream flows, but this is a temporary buffer — peak water is expected ~2040, after which Amu Darya flows may decline 10–25%, severely impacting Uzbek and Turkmen agriculture and the Aral Sea basin recovery.",
  },
];

export const defaultAIResponse =
  "I'm AquaAI — I can answer questions about Tajikistan's water resources, glaciers, hydropower, and climate risks. Try one of the suggested prompts, or ask about a specific region.";