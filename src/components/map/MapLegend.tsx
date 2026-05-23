import { Snowflake, Lightning, Waves, Drop } from "@phosphor-icons/react";

const items = [
  { color: "#54b97a", label: "High Access (>80%)" },
  { color: "#f3a847", label: "Moderate Access (60–80%)" },
  { color: "#e85d5d", label: "Low Access / Risk (<60%)" },
];

export function MapLegend() {
  return (
    <div className="panel p-3.5 w-[230px] backdrop-blur-md bg-card/95">
      <div className="text-[10px] font-bold tracking-wider text-muted-foreground mb-2.5">
        ACCESS & RISK LEVEL
      </div>
      <div className="space-y-1.5">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ background: it.color, opacity: 0.6 }} />
            <span className="text-[12px] text-foreground">{it.label}</span>
          </div>
        ))}
      </div>
      <div className="h-px bg-border my-2.5" />
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[12px] text-foreground">
          <Waves size={14} weight="bold" className="text-river" /> Rivers
        </div>
        <div className="flex items-center gap-2 text-[12px] text-foreground">
          <Snowflake size={14} weight="bold" className="text-glacier" /> Glaciers
        </div>
        <div className="flex items-center gap-2 text-[12px] text-foreground">
          <Lightning size={14} weight="fill" className="text-hydro" /> Hydropower Plants
        </div>
        <div className="flex items-center gap-2 text-[12px] text-foreground">
          <Drop size={14} weight="fill" className="text-primary" /> Reservoirs
        </div>
      </div>
    </div>
  );
}