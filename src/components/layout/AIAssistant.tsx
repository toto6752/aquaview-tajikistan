import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperPlaneTilt, Sparkle, Robot, User, Lightning, Copy, Check } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

interface Msg { id: string; role: "user" | "assistant"; content: string; }

function renderMarkdown(text: string) {
  // Split by code fences first
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith("`") && p.endsWith("`")) {
      return <code key={i} className="px-1 py-0.5 rounded bg-secondary text-[12px] font-mono">{p.slice(1, -1)}</code>;
    }
    return <span key={i}>{p}</span>;
  });
}

function CopyButton({ text }: { text: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); }
        catch { /* ignore */ }
      }}
      className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground hover:text-foreground transition mt-1.5"
    >
      {copied ? <Check size={11} weight="bold" /> : <Copy size={11} weight="bold" />}
      {copied ? t("ai.copied") : t("ai.copy")}
    </button>
  );
}

export function AIAssistant() {
  const { t, lang } = useI18n();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const welcome: Msg = { id: "intro", role: "assistant", content: t("ai.welcome") };

  const allSuggestions = [
    t("ai.q1"), t("ai.q2"), t("ai.q3"), t("ai.q4"),
    t("ai.q5"), t("ai.q6"), t("ai.q7"), t("ai.q8"),
  ];
  const visibleSuggestions = showAllSuggestions ? allSuggestions : allSuggestions.slice(0, 4);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  async function ask(q: string) {
    if (!q.trim() || typing) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: q };
    const history = [...msgs, userMsg];
    setMsgs(history);
    setInput("");
    setTyping(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        let errMsg = t("ai.error");
        if (resp.status === 429) errMsg = t("ai.rateLimit");
        else if (resp.status === 402) errMsg = t("ai.payment");
        setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: errMsg }]);
        setTyping(false);
        return;
      }

      if (!resp.body) {
        setTyping(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      const aiId = crypto.randomUUID();
      setMsgs((m) => [...m, { id: aiId, role: "assistant", content: "" }]);
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              acc += delta;
              setMsgs((m) => m.map((x) => (x.id === aiId ? { ...x, content: acc } : x)));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        console.error(e);
        setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: t("ai.error") }]);
      }
    } finally {
      setTyping(false);
    }
  }

  const displayMsgs = msgs.length === 0 ? [welcome] : msgs;

  return (
    <aside className="panel flex flex-col w-full h-full overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center shadow-sm">
            <Sparkle size={16} weight="fill" className="text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-card" />
        </div>
        <div className="leading-tight flex-1 min-w-0">
          <div className="font-semibold text-[14px] text-foreground">{t("ai.title")}</div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Lightning size={10} weight="fill" className="text-warning" />
            {t("ai.subtitle")}
          </div>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground uppercase">
          {lang}
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-3.5 py-3 space-y-3">
        <AnimatePresence initial={false}>
          {displayMsgs.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                  m.role === "user" ? "bg-primary-soft text-primary" : "grad-blue text-white"
                }`}
              >
                {m.role === "user" ? <User size={13} weight="bold" /> : <Robot size={13} weight="fill" />}
              </div>
              <div className={`max-w-[85%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary text-foreground rounded-tl-sm"
                  }`}
                >
                  {renderMarkdown(m.content || "…")}
                </div>
                {m.role === "assistant" && m.content && m.id !== "intro" && (
                  <CopyButton text={m.content} />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && msgs[msgs.length - 1]?.role === "user" && (
          <div className="flex gap-2">
            <div className="shrink-0 w-7 h-7 rounded-lg grad-blue text-white flex items-center justify-center">
              <Robot size={13} weight="fill" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}

        {msgs.length === 0 && (
          <div className="pt-1">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 px-1">
              {t("ai.suggested")}
            </div>
            <div className="space-y-1.5">
              {visibleSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="w-full text-left text-[12.5px] px-3 py-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary-soft/40 transition text-foreground"
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => setShowAllSuggestions((v) => !v)}
                className="w-full text-center text-[11px] font-semibold text-primary hover:underline py-1"
              >
                {showAllSuggestions ? t("ai.showLess") : t("ai.showMore")}
              </button>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); ask(input); }}
        className="p-3 border-t border-border flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("ai.placeholder")}
          disabled={typing}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-border bg-background text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition disabled:opacity-60"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-xl grad-blue text-white flex items-center justify-center shadow-sm hover:opacity-95 transition disabled:opacity-50"
          disabled={!input.trim() || typing}
        >
          <PaperPlaneTilt size={16} weight="fill" />
        </button>
      </form>
    </aside>
  );
}