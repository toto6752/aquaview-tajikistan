import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drop, Snowflake, Lightning, CloudRain, Globe, Flask,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — AquaMap TJ" },
      { name: "description", content: "Comprehensive knowledge hub on Tajikistan's water, glaciers, hydropower, climate, and regional impact." },
    ],
  }),
  component: LearnPage,
});

type TabKey = "water" | "glaciers" | "hydro" | "climate" | "regional" | "research";

interface Stat { v: string; l: string; }
interface Section { h: string; body: string; }
interface TabContent {
  key: TabKey;
  emoji: string;
  tKey: string;
  Icon: typeof Drop;
  color: string;
  bg: string;
  title: string;
  intro: string;
  highlights: Stat[];
  sections: Section[];
  links?: { label: string; href: string }[];
}

const tabs: TabContent[] = [
  {
    key: "water", emoji: "💧", tKey: "learn.tab.water", Icon: Drop, color: "text-info", bg: "bg-info/10",
    title: "Tajikistan's Water Wealth",
    intro: "Tajikistan is the source of Central Asia's largest river systems — holding 55.4% of total Aral Sea basin drainage and feeding tens of millions of people downstream.",
    highlights: [
      { v: "947+", l: "rivers" },
      { v: "28,500 km", l: "total river length" },
      { v: "64 km³", l: "annual runoff" },
      { v: "55.4%", l: "of Aral Sea basin flow" },
    ],
    sections: [
      { h: "Overview", body: "Tajikistan's high-altitude geography concentrates an enormous freshwater inventory. Snow- and glacier-fed rivers generate 64 km³ of annual runoff, a baseline volume that supports irrigation, energy, and drinking water across five downstream countries." },
      { h: "Key Rivers", body: "Amu Darya (formed by Panj + Vakhsh) is the dominant transboundary system. Syr Darya contributes ~1% from Tajik territory. Zerafshan flows west into Uzbekistan; Kofarnihon drains the south. Smaller tributaries feed irrigation networks across Sughd and Khatlon." },
      { h: "Lakes", body: "Karakul (3,914 m — one of the world's highest lakes), Sarez (landslide-dammed, 17 km³, potential GLOF risk), Iskanderkul (alpine glacial lake in the Fann Mountains) are the most significant." },
      { h: "Water Allocation", body: "Under the ICWC framework, Tajikistan receives only 15–18% of the allocable Amu Darya flow despite generating ~55% of total basin water — a recurring source of regional tension." },
      { h: "Transboundary Issues", body: "Tajikistan supplies water to Uzbekistan, Kazakhstan, Afghanistan, Turkmenistan, and Kyrgyzstan. Summer/winter trade-offs between irrigation (downstream) and energy (upstream) drive policy negotiation." },
    ],
  },
  {
    key: "glaciers", emoji: "🏔️", tKey: "learn.tab.glaciers", Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15",
    title: "The Frozen Water Towers",
    intro: "Tajikistan's 14,000+ glaciers are the largest ice reservoir in arid Central Asia — and they are retreating faster than the global average.",
    highlights: [
      { v: "14,000+", l: "glaciers" },
      { v: "8,476 km²", l: "current area" },
      { v: "845 km³", l: "ice volume (13× annual runoff)" },
      { v: "-30%", l: "area loss in 50–60 years" },
    ],
    sections: [
      { h: "Facts", body: "Total area ~8,476–11,146 km² depending on inventory (TajNCID vs RGI 7.0). Ice volume estimated at ~845 km³ — about 13× total annual river runoff." },
      { h: "Notable Glaciers", body: "Vanjyakh (Fedchenko) is the world's 10th largest glacier — 77 km long, melting up to 16 m/year. Grumm-Grzhimaylo, Garmo, Bivachny, and Medvezhiy are also major Pamir glaciers." },
      { h: "Retreat Data", body: "Roughly 20% volume loss and 30% area loss over the past 50–60 years. Over 1,000 small glaciers have completely disappeared since the 1930s." },
      { h: "Why It Matters", body: "Glaciers contribute up to 25% of summer runoff for the Amu Darya basin, serving 70M+ people downstream across Central Asia and northern Afghanistan." },
      { h: "Future Projections", body: "Pyanj basin: -75.5% glacier volume by 2050. Vakhsh basin: -53%. Amu Darya total runoff projected to fall 30% by mid-century after a temporary 'peak water' window." },
    ],
  },
  {
    key: "hydro", emoji: "⚡", tKey: "learn.tab.hydro", Icon: Lightning, color: "text-hydro", bg: "bg-hydro/10",
    title: "Central Asia's Energy Tower",
    intro: "Tajikistan ranks #1 globally in hydropower potential per km² and #2 per capita — but uses only ~3% of its estimated potential.",
    highlights: [
      { v: "527 TWh/yr", l: "estimated potential" },
      { v: "~18 TWh/yr", l: "current production" },
      { v: "95%+", l: "of electricity from hydro" },
      { v: "335 m", l: "Rogun dam height (world's tallest)" },
    ],
    sections: [
      { h: "Nurek HPP", body: "3,400 MW after rehabilitation. 300 m dam on the Vakhsh River. Operational since 1972. Covers 70%+ of national demand and irrigates ~700 km² of farmland." },
      { h: "Rogun HPP", body: "Under construction on the Vakhsh, upstream of Nurek. 335 m — will be the world's tallest dam. 3,780 MW planned. World Bank approved a $350M grant in December 2024. Full completion targeted ~2033." },
      { h: "Other Plants", body: "Sangtuda-1 (670 MW), Sangtuda-2 (220 MW), Baipaza (600 MW), Qairokkum (126 MW) round out the operational fleet, alongside many small hydro stations in GBAO and Sughd." },
      { h: "Grid & Export", body: "95%+ of electricity comes from hydropower. Tajikistan exports surplus summer generation to Uzbekistan, Afghanistan, and Pakistan via CASA-1000 (Central Asia–South Asia transmission)." },
    ],
  },
  {
    key: "climate", emoji: "🌡️", tKey: "learn.tab.climate", Icon: CloudRain, color: "text-destructive", bg: "bg-destructive/10",
    title: "Climate Crisis in the Mountains",
    intro: "Tajikistan is warming at twice the global average. Floods, mudslides, and droughts cause 500–600 emergencies every year.",
    highlights: [
      { v: "+1.2°C", l: "since baseline (2× global avg)" },
      { v: "1,826", l: "disasters in 2020–2023" },
      { v: "$30M+", l: "annual economic losses" },
      { v: "17 km³", l: "Sarez Lake — GLOF risk" },
    ],
    sections: [
      { h: "Temperature", body: "+1.2°C rise since baseline — roughly double the global average of 0.6°C. Pamir region projected to warm +2.0°C by 2050." },
      { h: "Disasters", body: "500–600 emergency events recorded annually. 1,826 natural disasters between 2020 and 2023 alone, with 100+ deaths and $30M+ in damages." },
      { h: "Disaster Types", body: "Floods are the primary hazard, followed by mudslides, avalanches, and droughts. Glacial lake outburst floods (GLOFs) are an emerging high-impact risk." },
      { h: "High-Risk Regions", body: "GBAO (Pamir slopes), Khatlon (lowland flooding), Rasht Valley, and the Zerafshan corridor face the highest combined exposure." },
      { h: "Sarez Lake Risk", body: "Formed by the 1911 Usoi landslide. Holds 17 km³ of water. A breach could cascade through the Bartang–Panj–Amu Darya system, threatening millions downstream." },
      { h: "2025 Milestones", body: "The UN General Assembly declared 2025 the International Year of Glaciers' Preservation at Tajikistan's urging. The Dushanbe Glaciers Declaration was signed the same year." },
    ],
  },
  {
    key: "regional", emoji: "🌍", tKey: "learn.tab.regional", Icon: Globe, color: "text-success", bg: "bg-success/10",
    title: "Beyond Tajikistan's Borders",
    intro: "As Central Asia's 'water tower', Tajikistan supplies more than 60% of the region's freshwater. Decisions made here ripple across five countries.",
    highlights: [
      { v: "60%+", l: "of Central Asia's freshwater" },
      { v: "5", l: "downstream countries served" },
      { v: "55.4%", l: "of Aral Sea basin flow" },
      { v: "2025", l: "UN Int. Year of Glaciers" },
    ],
    sections: [
      { h: "Water Tower Role", body: "Glacier melt and snowpack in the Pamir and Alay ranges feed the Amu Darya and tributaries, providing the dominant freshwater input to lower-elevation neighbours." },
      { h: "Downstream Countries", body: "Uzbekistan, Kazakhstan, Turkmenistan, and Afghanistan rely on Tajik-origin runoff for irrigation, drinking water, and ecosystems — including the recovering Aral Sea basin." },
      { h: "Aral Sea", body: "Tajikistan contributes 55.4% of total Aral Sea basin flow. Reductions in Amu Darya volume directly impede ongoing restoration efforts in the Northern Aral." },
      { h: "Transboundary Tensions", body: "Tajikistan needs winter energy storage (turbines run when reservoirs are full). Downstream Uzbekistan needs summer irrigation releases. These goals are seasonally opposite." },
      { h: "ICWC Framework", body: "The Interstate Commission for Water Coordination of Central Asia handles annual allocations between the five basin states. Talks are typically tense and politically charged." },
      { h: "International Year 2025", body: "On Tajikistan's initiative, the UN declared 2025 the International Year of Glaciers' Preservation — a global awareness campaign anchored by the Dushanbe Water Process." },
    ],
  },
  {
    key: "research", emoji: "🔬", tKey: "learn.tab.research", Icon: Flask, color: "text-primary", bg: "bg-primary-soft",
    title: "Data Sources & Science",
    intro: "Every figure on AquaMap TJ is anchored in peer-reviewed inventories, international assessments, and government statistics.",
    highlights: [
      { v: "UNEP 2025", l: "Atlas of Environmental Change" },
      { v: "RGI 7.0", l: "13,542 glaciers documented" },
      { v: "WB 2024", l: "Water Security Assessment" },
      { v: "2026", l: "ScienceDirect glacier review" },
    ],
    sections: [
      { h: "UNEP Atlas of Environmental Change for Tajikistan (Sept 2025)", body: "Satellite-based assessment of glacier retreat, land-cover change, and water security across the country. Primary source for headline statistics." },
      { h: "RGI 7.0 — Randolph Glacier Inventory", body: "Global standardized inventory listing 13,542 glaciers in Tajikistan around the year 2000, with current updates feeding climate models." },
      { h: "World Bank Tajikistan Water Security Assessment (2024)", body: "Sector-wide review of clean water access, irrigation efficiency, hydropower investment, and climate adaptation needs." },
      { h: "ScienceDirect — Current status and recent changes of glaciers in Tajikistan (January 2026)", body: "Peer-reviewed synthesis quantifying volume and area change across major Pamir glaciers, including Vanjyakh/Fedchenko retreat rates." },
      { h: "Dushanbe Water Process", body: "Official UN-recognized statistics from Tajikistan's flagship water diplomacy initiative, hosted by the government and supported by UN-Water." },
      { h: "TajNCID", body: "Tajikistan National Center for Innovative Development of Science and Technology — domestic glacier and hydrology data infrastructure." },
    ],
    links: [
      { label: "UNEP Atlas of Tajikistan", href: "https://www.unep.org/" },
      { label: "Randolph Glacier Inventory", href: "https://www.glims.org/rgi_user_guide/welcome.html" },
      { label: "World Bank — Tajikistan", href: "https://www.worldbank.org/en/country/tajikistan" },
      { label: "Dushanbe Water Process", href: "https://dushanbewaterprocess.org/" },
    ],
  },
];

function LearnPage() {
  const { t } = useI18n();
  const [active, setActive] = useState<TabKey>("water");
  const current = tabs.find((tb) => tb.key === active)!;

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        {/* Hero */}
        <div className="panel p-6 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 grad-blue opacity-95" />
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative text-white max-w-2xl">
            <div className="text-[11px] uppercase tracking-widest font-semibold opacity-80">{t("nav.learn")}</div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{t("learn.title")}</h1>
            <p className="text-sm opacity-90 mt-2">{t("learn.subtitle")}</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="panel p-1.5 mb-4 flex flex-wrap gap-1 overflow-x-auto">
          {tabs.map((tb) => {
            const on = tb.key === active;
            return (
              <button
                key={tb.key}
                onClick={() => setActive(tb.key)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] font-semibold transition whitespace-nowrap ${
                  on ? "grad-blue text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span>{tb.emoji}</span>
                <span>{t(tb.tKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Active tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="panel p-5">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${current.bg} ${current.color}`}>
                  <current.Icon size={22} weight="duotone" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">{current.title}</h2>
                  <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{current.intro}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5">
                {current.highlights.map((s) => (
                  <div key={s.l} className={`rounded-xl p-3 ${current.bg} border border-border/40`}>
                    <div className={`text-lg font-bold tracking-tight ${current.color}`}>{s.v}</div>
                    <div className="text-[10.5px] text-muted-foreground leading-snug mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {current.sections.map((sec, i) => (
                <motion.article
                  key={sec.h}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="panel p-4"
                >
                  <h3 className="font-semibold text-[14px] text-foreground">{sec.h}</h3>
                  <p className="text-[12.5px] text-muted-foreground mt-1.5 leading-relaxed">{sec.body}</p>
                </motion.article>
              ))}
            </div>

            {current.links && current.links.length > 0 && (
              <div className="panel p-4">
                <h3 className="font-semibold text-[13px] text-foreground mb-2">External resources</h3>
                <div className="flex flex-wrap gap-2">
                  {current.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-[12px] font-medium text-foreground hover:bg-secondary transition"
                    >
                      {l.label}
                      <ArrowSquareOut size={12} weight="bold" className="text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}