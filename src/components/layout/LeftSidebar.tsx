import {
  Drop, Snowflake, DropSimple, Warning, Lightning,
  Waves, UsersThree, Plant, Tree, ArrowsClockwise, StackSimple,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useLayers, LayerKey } from "./LayerContext";
import { Switch } from "@/components/ui/switch";

const items: { key: LayerKey; label: string; Icon: typeof Drop; color: string }[] = [
  { key: "rivers", label: "Rivers & Streams", Icon: Waves, color: "text-river" },
  { key: "glaciers", label: "Glaciers", Icon: Snowflake, color: "text-glacier" },
  { key: "water", label: "Clean Water Access", Icon: DropSimple, color: "text-info" },
  { key: "risk", label: "Climate Risk Zones", Icon: Warning, color: "text-destructive" },
  { key: "hydro", label: "Hydropower", Icon: Lightning, color: "text-hydro" },
  { key: "reservoirs", label: "Reservoirs", Icon: Drop, color: "text-primary" },
  { key: "population", label: "Population Density", Icon: UsersThree, color: "text-warning" },
  { key: "agriculture", label: "Agricultural Zones", Icon: Plant, color: "text-success" },
  { key: "protected", label: "Protected Areas", Icon: Tree, color: "text-success" },
];

export function LeftSidebar() {
  const { layers, toggle } = useLayers();
  const active = items.filter((i) => layers[i.key]).length;

  return (
    <aside className="panel flex flex-col w-full h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <StackSimple size={17} weight="duotone" className="text-primary" />
          <h2 className="font-semibold text-[14px] text-foreground">Map Layers</h2>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-soft text-primary">
          {active}/{items.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2">
        {items.map((it, i) => {
          const on = layers[it.key];
          return (
            <motion.label
              key={it.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                on ? "bg-primary-soft/60" : "hover:bg-secondary"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-card border border-border ${it.color}`}>
                <it.Icon size={16} weight="duotone" />
              </div>
              <span className="flex-1 text-[13px] font-medium text-foreground">{it.label}</span>
              <Switch checked={on} onCheckedChange={() => toggle(it.key)} />
            </motion.label>
          );
        })}
      </div>

      <div className="m-3 mt-2 p-3 rounded-xl border border-success/20 bg-success/5">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
            <ArrowsClockwise size={15} weight="bold" className="text-success" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-foreground">Data Update</div>
            <div className="text-[11px] text-muted-foreground leading-snug">
              All environmental data updated 2 hours ago
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}