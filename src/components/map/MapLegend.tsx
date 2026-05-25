import { Snowflake, Lightning, Waves, Drop } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export function MapLegend() {
  const { t } = useI18n();
  const items = [
    { color: "#54b97a", label: t("legend.high") },
    { color: "#f3a847", label: t("legend.mod") },
    { color: "#e85d5d", label: t("legend.low") },
  ];
  return (
    <div className="panel p-3.5 w-[230px] backdrop-blur-md bg-card/95">
      <div className="text-[10px] font-bold tracking-wider text-muted-foreground mb-2.5">
        {t("legend.title")}
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
          <Waves size={14} weight="bold" className="text-river" /> {t("legend.rivers")}
        </div>
        <div className="flex items-center gap-2 text-[12px] text-foreground">
          <Snowflake size={14} weight="bold" className="text-glacier" /> {t("legend.glaciers")}
        </div>
        <div className="flex items-center gap-2 text-[12px] text-foreground">
          <Lightning size={14} weight="fill" className="text-hydro" /> {t("legend.hydro")}
        </div>
        <div className="flex items-center gap-2 text-[12px] text-foreground">
          <Drop size={14} weight="fill" className="text-primary" /> {t("legend.reservoirs")}
        </div>
      </div>
    </div>
  );
}