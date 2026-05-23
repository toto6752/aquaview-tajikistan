import { lazy, Suspense, useEffect, useState } from "react";

const MapView = lazy(() => import("./MapView").then((m) => ({ default: m.MapView })));

export function MapClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#eaf2fb]">
        <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-[#eaf2fb]" />}>
      <MapView />
    </Suspense>
  );
}