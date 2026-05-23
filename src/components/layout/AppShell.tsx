import { ReactNode, useState } from "react";
import { TopNav } from "./TopNav";
import { LeftSidebar } from "./LeftSidebar";
import { AIAssistant } from "./AIAssistant";
import { LayerProvider } from "./LayerContext";
import { List, X, Sparkle } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

export function AppShell({ children, showSidebars = true }: { children: ReactNode; showSidebars?: boolean }) {
  const [sideOpen, setSideOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <LayerProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <TopNav />
        <div className="flex-1 flex gap-3 p-3 min-h-0 overflow-hidden">
          {showSidebars && (
            <div className="hidden lg:block w-[260px] shrink-0">
              <LeftSidebar />
            </div>
          )}

          <main className="flex-1 min-w-0 flex flex-col">{children}</main>

          {showSidebars && (
            <div className="hidden xl:block w-[340px] shrink-0">
              <AIAssistant />
            </div>
          )}
        </div>

        {showSidebars && (
          <>
            <button
              onClick={() => setSideOpen(true)}
              className="lg:hidden fixed bottom-4 left-4 z-40 w-12 h-12 rounded-full panel bg-card flex items-center justify-center"
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setAiOpen(true)}
              className="xl:hidden fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full grad-blue text-white flex items-center justify-center shadow-lg"
            >
              <Sparkle size={18} weight="fill" />
            </button>

            <AnimatePresence>
              {sideOpen && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                  onClick={() => setSideOpen(false)}
                >
                  <motion.div
                    initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute left-0 top-0 bottom-0 w-[280px] p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LeftSidebar />
                  </motion.div>
                </motion.div>
              )}
              {aiOpen && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="xl:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                  onClick={() => setAiOpen(false)}
                >
                  <motion.div
                    initial={{ x: 360 }} animate={{ x: 0 }} exit={{ x: 360 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute right-0 top-0 bottom-0 w-[340px] max-w-[92vw] p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative h-full">
                      <button onClick={() => setAiOpen(false)} className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                        <X size={14} />
                      </button>
                      <AIAssistant />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </LayerProvider>
  );
}