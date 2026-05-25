import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Drop, Snowflake, Warning, Lightning, UsersThree, ArrowUp, ArrowDown, Minus, Info } from "@phosphor-icons/react";
import { stats } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";

const icons = {
  water: { Icon: Drop, color: "text-info", bg: "bg-info/10" },
  glacier: { Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15" },
  risk: { Icon: Warning, color: "text-destructive", bg: "bg-destructive/10" },
  hydro: { Icon: Lightning, color: "text-hydro", bg: "bg-hydro/10" },
  pop: { Icon: UsersThree, color: "text-warning", bg: "bg-warning/10" },
} as const;

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (l) =>
    l.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
  );
  useEffect(() => {
    const ctl = animate(mv, value, { duration: 1.4, ease: "easeOut" });
    return () => ctl.stop();
  }, [value, mv]);
  return <motion.span>{rounded}</motion.span>;
}

export function StatsCards() {
  const { t } = useI18n();
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((s, i) => {
        const meta = icons[s.id as keyof typeof icons];
        const TrendIcon = s.trend === "up" ? ArrowUp : s.trend === "down" ? ArrowDown : Minus;
        const trendColor =
          s.trend === "up" ? "text-success" : s.trend === "down" ? "text-destructive" : "text-muted-foreground";
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="panel p-3.5 group cursor-default relative"
            title={`${s.source ?? ""}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${meta.bg} ${meta.color}`}>
                <meta.Icon size={17} weight="duotone" />
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${trendColor}`}>
                <TrendIcon size={11} weight="bold" />
                {s.delta}
              </div>
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">{t((s as { labelKey: string }).labelKey)}</div>
            <div className="text-[22px] font-bold text-foreground tracking-tight leading-tight mt-0.5">
              <Counter value={s.value} decimals={(s as { decimals?: number }).decimals ?? 0} />
              <span className="text-[14px] font-semibold text-muted-foreground">{s.suffix}</span>
            </div>
            {s.source && (
              <div className="text-[10px] text-muted-foreground/80 mt-1 truncate">{s.source}</div>
            )}
          </motion.div>
        );
      })}
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground px-1">
        <Info size={11} weight="duotone" />
        <span className="font-semibold">{t("stats.sources")}:</span>
        <span>{t("stats.sourcesNote")}</span>
      </div>
    </div>
  );
}