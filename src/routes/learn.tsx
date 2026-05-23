import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Snowflake, Waves, CloudRain, Lightning, Drop, Mountains } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — AquaMap TJ" },
      { name: "description", content: "Learn about glaciers, rivers, climate, hydropower, and water management in Tajikistan." },
    ],
  }),
  component: LearnPage,
});

const topics = [
  { icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15", title: "Glaciers of the Pamirs", body: "Tajikistan hosts ~14,000 glaciers covering 8,030 km². Fedchenko (700 km²) is the largest outside the polar regions." },
  { icon: Waves, color: "text-river", bg: "bg-info/10", title: "Rivers & Basins", body: "Two major basins drain the country: the Syr Darya in the north and the Amu Darya (Panj + Vakhsh) in the south." },
  { icon: CloudRain, color: "text-info", bg: "bg-primary-soft", title: "Climate Patterns", body: "Continental highland climate with cold winters and dry summers. Snowpack feeds 80%+ of annual river runoff." },
  { icon: Lightning, color: "text-hydro", bg: "bg-hydro/10", title: "Hydropower System", body: "98% of domestic electricity comes from hydropower, with Nurek and the in-progress Rogun dam as cornerstones." },
  { icon: Drop, color: "text-primary", bg: "bg-primary-soft", title: "Water Management", body: "ALRI and basin councils coordinate allocations across irrigation, drinking water, and energy generation." },
  { icon: Mountains, color: "text-success", bg: "bg-success/10", title: "Mountain Ecology", body: "93% of Tajikistan is mountainous. Tajik National Park covers 2.6M hectares — a UNESCO World Heritage site." },
];

const facts = [
  { v: "60%", l: "of Central Asia's freshwater originates in Tajikistan" },
  { v: "14k+", l: "glaciers feeding regional river systems" },
  { v: "9.1 GW", l: "installed hydropower capacity" },
  { v: "335 m", l: "Rogun dam height — world's tallest" },
];

function LearnPage() {
  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        <div className="panel p-6 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 grad-blue opacity-95" />
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative text-white max-w-2xl">
            <div className="text-[11px] uppercase tracking-widest font-semibold opacity-80">Learn</div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">The water tower of Central Asia</h1>
            <p className="text-sm opacity-90 mt-2">A primer on Tajikistan's glaciers, rivers, climate dynamics, hydropower, and water management — the systems that supply tens of millions of people downstream.</p>
          </div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {facts.map((f) => (
              <div key={f.l} className="rounded-xl bg-white/15 backdrop-blur p-3 border border-white/20">
                <div className="text-white text-xl font-bold tracking-tight">{f.v}</div>
                <div className="text-white/85 text-[11px] leading-snug mt-0.5">{f.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {topics.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="panel p-4"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.bg} ${t.color}`}>
                <t.icon size={20} weight="duotone" />
              </div>
              <h3 className="font-semibold text-[14px] text-foreground mt-3">{t.title}</h3>
              <p className="text-[12.5px] text-muted-foreground mt-1 leading-relaxed">{t.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}