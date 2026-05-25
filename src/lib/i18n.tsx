import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Lang = "en" | "ru" | "tj";

export const LANGS: { code: Lang; label: string; flag: string; abbr: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧", abbr: "EN" },
  { code: "ru", label: "Русский", flag: "🇷🇺", abbr: "RU" },
  { code: "tj", label: "Тоҷикӣ", flag: "🇹🇯", abbr: "TJ" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.map": "Map",
  "nav.analytics": "Analytics",
  "nav.reports": "Reports",
  "nav.learn": "Learn",
  "nav.share": "Share",
  "nav.upgrade": "Upgrade",
  "nav.publish": "Publish",
  "brand.tagline": "Water Intelligence · Tajikistan",

  "layers.title": "Map Layers",
  "layers.rivers": "Rivers & Streams",
  "layers.glaciers": "Glaciers",
  "layers.water": "Clean Water Access",
  "layers.risk": "Climate Risk Zones",
  "layers.hydro": "Hydropower",
  "layers.reservoirs": "Reservoirs",
  "layers.population": "Population Density",
  "layers.agriculture": "Agricultural Zones",
  "layers.protected": "Protected Areas",
  "layers.update": "Data Update",
  "layers.updateNote": "All environmental data updated 2 hours ago",

  "legend.title": "ACCESS & RISK LEVEL",
  "legend.high": "High Access (>80%)",
  "legend.mod": "Moderate Access (60–80%)",
  "legend.low": "Low Access / Risk (<60%)",
  "legend.rivers": "Rivers",
  "legend.glaciers": "Glaciers",
  "legend.hydro": "Hydropower Plants",
  "legend.reservoirs": "Reservoirs",

  "stats.water": "Clean Water Access",
  "stats.glacier": "Glacier Area",
  "stats.risk": "Risk Districts",
  "stats.hydro": "Hydro Capacity",
  "stats.pop": "Population",
  "stats.sources": "Sources",
  "stats.sourcesNote": "UNEP Atlas 2025 · World Bank · TajNCID · ScienceDirect 2026",

  "ai.title": "AquaAI Assistant",
  "ai.subtitle": "Powered by Lovable AI",
  "ai.welcome": "Hi! I'm **AquaAI** — your environmental intelligence assistant for Tajikistan. Ask me about glaciers, hydropower, climate, or regional water risks.",
  "ai.placeholder": "Ask about water, glaciers, climate…",
  "ai.suggested": "Suggested",
  "ai.showMore": "Show more",
  "ai.showLess": "Show less",
  "ai.copy": "Copy",
  "ai.copied": "Copied",
  "ai.error": "Sorry, something went wrong. Please try again.",
  "ai.rateLimit": "Rate limit reached. Please wait a moment and try again.",
  "ai.payment": "AI credits exhausted. Please add credits in workspace settings.",

  "ai.q1": "Why are Tajikistan's glaciers retreating?",
  "ai.q2": "How big is the Vanjyakh (Fedchenko) Glacier?",
  "ai.q3": "What are the specs of Rogun Dam?",
  "ai.q4": "What's causing water scarcity in GBAO?",
  "ai.q5": "How does glacier melt affect downstream countries?",
  "ai.q6": "What is the ICWC water allocation framework?",
  "ai.q7": "What are the main flood risks in Khatlon?",
  "ai.q8": "What is Sarez Lake and why is it dangerous?",

  "learn.title": "Knowledge Hub",
  "learn.subtitle": "Everything about Tajikistan's water, glaciers, energy and climate.",
  "learn.tab.water": "Water Resources",
  "learn.tab.glaciers": "Glaciers",
  "learn.tab.hydro": "Hydropower",
  "learn.tab.climate": "Climate & Risk",
  "learn.tab.regional": "Regional Impact",
  "learn.tab.research": "Research & Data",
};

const ru: Dict = {
  "nav.map": "Карта",
  "nav.analytics": "Аналитика",
  "nav.reports": "Отчёты",
  "nav.learn": "Обучение",
  "nav.share": "Поделиться",
  "nav.upgrade": "Улучшить",
  "nav.publish": "Опубликовать",
  "brand.tagline": "Водный интеллект · Таджикистан",

  "layers.title": "Слои карты",
  "layers.rivers": "Реки и ручьи",
  "layers.glaciers": "Ледники",
  "layers.water": "Доступ к чистой воде",
  "layers.risk": "Зоны климатического риска",
  "layers.hydro": "Гидроэнергетика",
  "layers.reservoirs": "Водохранилища",
  "layers.population": "Плотность населения",
  "layers.agriculture": "Сельхоз. зоны",
  "layers.protected": "Охраняемые территории",
  "layers.update": "Обновление данных",
  "layers.updateNote": "Все экологические данные обновлены 2 часа назад",

  "legend.title": "УРОВЕНЬ ДОСТУПА И РИСКА",
  "legend.high": "Высокий доступ (>80%)",
  "legend.mod": "Умеренный доступ (60–80%)",
  "legend.low": "Низкий доступ / риск (<60%)",
  "legend.rivers": "Реки",
  "legend.glaciers": "Ледники",
  "legend.hydro": "ГЭС",
  "legend.reservoirs": "Водохранилища",

  "stats.water": "Доступ к чистой воде",
  "stats.glacier": "Площадь ледников",
  "stats.risk": "Районы риска",
  "stats.hydro": "Гидроэнергия",
  "stats.pop": "Население",
  "stats.sources": "Источники",
  "stats.sourcesNote": "UNEP Atlas 2025 · World Bank · TajNCID · ScienceDirect 2026",

  "ai.title": "AquaAI Ассистент",
  "ai.subtitle": "На основе Lovable AI",
  "ai.welcome": "Привет! Я — **AquaAI**, ваш ассистент по водным ресурсам Таджикистана. Спросите о ледниках, гидроэнергетике, климате или региональных рисках.",
  "ai.placeholder": "Спросите о воде, ледниках, климате…",
  "ai.suggested": "Предложения",
  "ai.showMore": "Показать ещё",
  "ai.showLess": "Скрыть",
  "ai.copy": "Копировать",
  "ai.copied": "Скопировано",
  "ai.error": "Извините, произошла ошибка. Попробуйте снова.",
  "ai.rateLimit": "Превышен лимит запросов. Подождите немного.",
  "ai.payment": "Кредиты AI исчерпаны. Пополните баланс в настройках.",

  "ai.q1": "Почему ледники Таджикистана тают?",
  "ai.q2": "Каков размер ледника Ванҷях (Федченко)?",
  "ai.q3": "Каковы характеристики Рогунской ГЭС?",
  "ai.q4": "Что вызывает нехватку воды в ГБАО?",
  "ai.q5": "Как таяние ледников влияет на соседние страны?",
  "ai.q6": "Что такое механизм распределения воды МКВК?",
  "ai.q7": "Основные риски наводнений в Хатлоне?",
  "ai.q8": "Что такое Сарезское озеро и чем оно опасно?",

  "learn.title": "База знаний",
  "learn.subtitle": "Всё о воде, ледниках, энергетике и климате Таджикистана.",
  "learn.tab.water": "Водные ресурсы",
  "learn.tab.glaciers": "Ледники",
  "learn.tab.hydro": "Гидроэнергетика",
  "learn.tab.climate": "Климат и риски",
  "learn.tab.regional": "Региональное влияние",
  "learn.tab.research": "Данные и наука",
};

const tj: Dict = {
  "nav.map": "Харита",
  "nav.analytics": "Таҳлил",
  "nav.reports": "Ҳисоботҳо",
  "nav.learn": "Омӯзиш",
  "nav.share": "Мубодила",
  "nav.upgrade": "Такмил",
  "nav.publish": "Нашр",
  "brand.tagline": "Иктишофи об · Тоҷикистон",

  "layers.title": "Қабатҳои харита",
  "layers.rivers": "Дарёҳо ва Ҷӯйборҳо",
  "layers.glaciers": "Пиряхҳо",
  "layers.water": "Дастрасӣ ба Оби Тоза",
  "layers.risk": "Минтақаҳои Хатари Иқлимӣ",
  "layers.hydro": "Нерӯи Барқобӣ",
  "layers.reservoirs": "Обанборҳо",
  "layers.population": "Зичии Аҳолӣ",
  "layers.agriculture": "Минтақаҳои Кишоварзӣ",
  "layers.protected": "Минтақаҳои Ҳимояшаванда",
  "layers.update": "Навсозии маълумот",
  "layers.updateNote": "Маълумоти экологӣ 2 соат пеш нав шудааст",

  "legend.title": "САТҲИ ДАСТРАСӢ ВА ХАТАР",
  "legend.high": "Дастрасии баланд (>80%)",
  "legend.mod": "Дастрасии миёна (60–80%)",
  "legend.low": "Дастрасии паст / хатар (<60%)",
  "legend.rivers": "Дарёҳо",
  "legend.glaciers": "Пиряхҳо",
  "legend.hydro": "Нерӯгоҳҳои барқи обӣ",
  "legend.reservoirs": "Обанборҳо",

  "stats.water": "Дастрасӣ ба Оби Тоза",
  "stats.glacier": "Майдони Пиряхҳо",
  "stats.risk": "Ноҳияҳои Хатар",
  "stats.hydro": "Нерӯи Барқобӣ",
  "stats.pop": "Аҳолӣ",
  "stats.sources": "Манбаъҳо",
  "stats.sourcesNote": "UNEP Atlas 2025 · World Bank · TajNCID · ScienceDirect 2026",

  "ai.title": "Ёрдамчии AquaAI",
  "ai.subtitle": "Дар асоси Lovable AI",
  "ai.welcome": "Салом! Ман **AquaAI** ҳастам — ёрдамчии иктишофи муҳити зисти Тоҷикистон. Дар бораи пиряхҳо, нерӯи барқобӣ ё хатарҳои обӣ пурсед.",
  "ai.placeholder": "Дар бораи об, пиряхҳо, иқлим бипурсед…",
  "ai.suggested": "Пешниҳодҳо",
  "ai.showMore": "Бештар",
  "ai.showLess": "Камтар",
  "ai.copy": "Нусха",
  "ai.copied": "Нусхабардорӣ шуд",
  "ai.error": "Хатогӣ рух дод. Бори дигар кӯшиш кунед.",
  "ai.rateLimit": "Маҳдудияти дархост. Лутфан каме интизор шавед.",
  "ai.payment": "Кредитҳои AI тамом шуданд. Дар танзимот пур кунед.",

  "ai.q1": "Чаро пиряхҳои Тоҷикистон об мешаванд?",
  "ai.q2": "Пиряхи Ванҷях (Федченко) чӣ қадар калон аст?",
  "ai.q3": "Хусусиятҳои сарбанди Роғун чӣ гунаанд?",
  "ai.q4": "Сабаби камобии ГБАО чист?",
  "ai.q5": "Обшавии пиряхҳо ба кишварҳои поёноб чӣ таъсир мерасонад?",
  "ai.q6": "Чаҳорчӯбаи тақсими оби ICWC чист?",
  "ai.q7": "Хатарҳои асосии обхезӣ дар Хатлон кадомҳоянд?",
  "ai.q8": "Кӯли Сарез чист ва чаро хатарнок аст?",

  "learn.title": "Маркази дониш",
  "learn.subtitle": "Ҳама чиз дар бораи об, пиряхҳо, нерӯ ва иқлими Тоҷикистон.",
  "learn.tab.water": "Захираҳои об",
  "learn.tab.glaciers": "Пиряхҳо",
  "learn.tab.hydro": "Нерӯи барқобӣ",
  "learn.tab.climate": "Иқлим ва хатар",
  "learn.tab.regional": "Таъсири минтақавӣ",
  "learn.tab.research": "Тадқиқот ва маълумот",
};

const dicts: Record<Lang, Dict> = { en, ru, tj };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aquamap.lang") as Lang | null;
      if (saved && dicts[saved]) setLangState(saved);
    } catch { /* ignore */ }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("aquamap.lang", l); } catch { /* ignore */ }
  }, []);

  const t = useCallback((key: string) => dicts[lang][key] ?? dicts.en[key] ?? key, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}