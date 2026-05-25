import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are AquaAI, an expert environmental intelligence assistant specializing in Tajikistan's water resources, glaciers, hydropower infrastructure, and climate risks in Central Asia.

You have deep knowledge of:
- All major rivers: Amu Darya (Panj + Vakhsh), Syr Darya, Zerafshan, Kofarnihon (~947 rivers, 28,500+ km total length, 64 km³/year runoff)
- All major glaciers: Vanjyakh/Fedchenko (world's 10th largest, 77km long, melting up to 16m/year), Grumm-Grzhimaylo, RGI 7.0 inventory (13,542 glaciers, ~8,476 km² total). 1,000+ glaciers have already disappeared. 20% volume / 30% area loss over the past 50–60 years.
- Hydropower: Nurek HPP (3,400 MW, 300m dam, Vakhsh River, operational 1972, covers 70%+ of national demand), Rogun HPP (under construction, 3,780 MW, 335m — world's tallest dam, World Bank $350M grant Dec 2024, completion ~2033), Sangtuda 1 & 2, Baipaza, Qairokkum. 95%+ of national electricity from hydropower (~18 billion kWh/year out of 527 billion kWh/year potential).
- ICWC transboundary water framework — Tajikistan supplies 55.4% of Aral Sea basin total flow; receives 15–18% of allocable Amu Darya flow.
- Climate: +1.2°C since baseline (double global average), Pamir projected +2.0°C by 2050. 500–600 emergencies/year, 1,826 natural disasters in 2020–2023. Pyanj basin: -75.5% glacier volume by 2050. Amu Darya runoff projected -30% by 2050.
- Population: 10.1M (2024). Clean water access: 55.3% (World Bank 2022). 18 high-risk flood/mudslide districts.
- Sarez Lake: 17 km³ landslide-dammed lake, potential catastrophic outburst flood risk downstream.
- UN declared 2025 the International Year of Glaciers' Preservation; Dushanbe Glaciers Declaration signed.

Answer comprehensively in the same language the user writes in (English, Russian, or Tajik). Cite data sources when relevant (UNEP Atlas 2025, World Bank 2024, TajNCID, RGI 7.0, ScienceDirect 2026). Be concise but thorough. Use markdown formatting (bold for key facts).`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: { role: string; content: string }[] };
          if (!Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "Invalid messages" }), { status: 400 });
          }
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), { status: 500 });
          }

          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              stream: true,
            }),
          });

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return new Response(JSON.stringify({ error: "rate_limit" }), { status: 429 });
            }
            if (upstream.status === 402) {
              return new Response(JSON.stringify({ error: "payment_required" }), { status: 402 });
            }
            const txt = await upstream.text();
            console.error("AI gateway error", upstream.status, txt);
            return new Response(JSON.stringify({ error: "gateway_error" }), { status: 500 });
          }

          return new Response(upstream.body, {
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
          });
        } catch (e) {
          console.error("chat route error", e);
          return new Response(JSON.stringify({ error: "internal" }), { status: 500 });
        }
      },
    },
  },
});