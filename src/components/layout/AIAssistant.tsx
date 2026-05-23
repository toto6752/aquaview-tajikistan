import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperPlaneTilt, Sparkle, Robot, User, Lightning } from "@phosphor-icons/react";
import { aiKnowledge, defaultAIResponse } from "@/lib/mock-data";

interface Msg { id: string; role: "user" | "ai"; text: string; }

const suggested = [
  "Why are Tajikistan's glaciers retreating?",
  "Explain the Nurek and Rogun dams",
  "What's causing water scarcity in GBAO?",
  "What are the main flood risks in Khatlon?",
  "How does glacier melt affect downstream countries?",
];

function answerFor(q: string): string {
  for (const k of aiKnowledge) if (k.match.test(q)) return k.answer;
  return defaultAIResponse;
}

function renderMarkdown(text: string) {
  // tiny bold parser
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export function AIAssistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "intro",
      role: "ai",
      text:
        "Hi! I'm **AquaAI** — your environmental intelligence assistant for Tajikistan. Ask me about glaciers, hydropower, or regional water risks.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function ask(q: string) {
    if (!q.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: q };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { id: crypto.randomUUID(), role: "ai", text: answerFor(q) }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  }

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
          <div className="font-semibold text-[14px] text-foreground">AquaAI Assistant</div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Lightning size={10} weight="fill" className="text-warning" />
            Powered by Lovable AI
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-3.5 py-3 space-y-3">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
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
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-secondary text-foreground rounded-tl-sm"
                }`}
              >
                {renderMarkdown(m.text)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
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

        {msgs.length <= 1 && (
          <div className="pt-1">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 px-1">
              Suggested
            </div>
            <div className="space-y-1.5">
              {suggested.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="w-full text-left text-[12.5px] px-3 py-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary-soft/40 transition text-foreground"
                >
                  {s}
                </button>
              ))}
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
          placeholder="Ask about water, glaciers, climate…"
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-border bg-background text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-xl grad-blue text-white flex items-center justify-center shadow-sm hover:opacity-95 transition disabled:opacity-50"
          disabled={!input.trim()}
        >
          <PaperPlaneTilt size={16} weight="fill" />
        </button>
      </form>
    </aside>
  );
}