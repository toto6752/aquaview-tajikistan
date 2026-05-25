import { Link, useRouterState } from "@tanstack/react-router";
import { Drop, ShareNetwork, Lightning, UploadSimple, Globe, CaretDown, Check } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n, LANGS, Lang } from "@/lib/i18n";

export function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { t, lang, setLang } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { to: "/", label: t("nav.map") },
    { to: "/analytics", label: t("nav.analytics") },
    { to: "/reports", label: t("nav.reports") },
    { to: "/learn", label: t("nav.learn") },
  ] as const;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const currentLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border z-30">
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center shadow-md">
          <Drop weight="fill" className="text-white" size={20} />
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-foreground text-[15px]">AquaMap TJ</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">{t("brand.tagline")}</div>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-1 panel px-1.5 py-1.5">
        {tabs.map((t) => {
          const active = path === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="navpill"
                  className="absolute inset-0 grad-blue rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative ${active ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <div ref={langRef} className="relative">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition"
            aria-label="Change language"
          >
            <Globe size={15} />
            <span className="font-semibold text-[12px]">{currentLang.abbr}</span>
            <CaretDown size={11} weight="bold" className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 mt-1.5 w-44 panel bg-card shadow-lg overflow-hidden z-50"
              >
                {LANGS.map((l) => {
                  const sel = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-secondary transition ${sel ? "bg-primary-soft/40" : ""}`}
                    >
                      <span className="text-base leading-none">{l.flag}</span>
                      <span className="flex-1 text-left text-foreground">{l.label}</span>
                      {sel && <Check size={13} weight="bold" className="text-primary" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition">
          <ShareNetwork size={15} /> {t("nav.share")}
        </button>
        <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition">
          <Lightning size={15} weight="fill" className="text-warning" /> {t("nav.upgrade")}
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg grad-blue text-white text-sm font-medium shadow-sm hover:opacity-95 transition">
          <UploadSimple size={15} weight="bold" /> {t("nav.publish")}
        </button>
      </div>
    </header>
  );
}