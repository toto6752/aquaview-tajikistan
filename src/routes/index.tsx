import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MapClient } from "@/components/map/MapClient";
import { MapLegend } from "@/components/map/MapLegend";
import { BasemapSwitcher } from "@/components/map/BasemapSwitcher";
import { StatsCards } from "@/components/stats/StatsCards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AquaMap TJ — Water Intelligence · Tajikistan" },
      { name: "description", content: "Interactive environmental intelligence platform for water resources, glaciers, hydropower and climate risks in Tajikistan." },
      { property: "og:title", content: "AquaMap TJ — Water Intelligence · Tajikistan" },
      { property: "og:description", content: "Interactive environmental intelligence platform for Tajikistan." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="relative flex-1 min-h-[420px] rounded-2xl overflow-hidden panel">
          <MapClient />
          <div className="absolute top-3 left-3 z-[400]">
            <BasemapSwitcher />
          </div>
          <div className="absolute bottom-3 left-3 z-[400]">
            <MapLegend />
          </div>
        </div>
        <StatsCards />
      </div>
    </AppShell>
  );
}
