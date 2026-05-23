import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion } from "framer-motion";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — AquaMap TJ" },
      { name: "description", content: "Trends in water access, glacier decline, hydropower production and climate risk across Tajikistan." },
    ],
  }),
  component: AnalyticsPage,
});

const glacierData = [
  { year: "1990", area: 11800 },
  { year: "2000", area: 10650 },
  { year: "2005", area: 9900 },
  { year: "2010", area: 9320 },
  { year: "2015", area: 8780 },
  { year: "2020", area: 8320 },
  { year: "2024", area: 8030 },
];
const waterAccess = [
  { year: "2015", urban: 91, rural: 52 },
  { year: "2017", urban: 92, rural: 56 },
  { year: "2019", urban: 93, rural: 61 },
  { year: "2021", urban: 94, rural: 66 },
  { year: "2023", urban: 95, rural: 70 },
  { year: "2024", urban: 96, rural: 74 },
];
const hydroData = [
  { m: "Jan", gwh: 1400 }, { m: "Feb", gwh: 1280 }, { m: "Mar", gwh: 1380 },
  { m: "Apr", gwh: 1620 }, { m: "May", gwh: 1980 }, { m: "Jun", gwh: 2240 },
  { m: "Jul", gwh: 2380 }, { m: "Aug", gwh: 2310 }, { m: "Sep", gwh: 2020 },
  { m: "Oct", gwh: 1740 }, { m: "Nov", gwh: 1520 }, { m: "Dec", gwh: 1440 },
];
const riskBreakdown = [
  { name: "Flood", value: 38, color: "#4a8cd6" },
  { name: "Drought", value: 27, color: "#f3a847" },
  { name: "GLOF", value: 18, color: "#7c5cff" },
  { name: "Mudflow", value: 17, color: "#e85d5d" },
];

function Card({ title, subtitle, children, delay = 0 }: { title: string; subtitle?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="panel p-4"
    >
      <div className="mb-3">
        <div className="text-[13px] font-semibold text-foreground">{title}</div>
        {subtitle && <div className="text-[11px] text-muted-foreground">{subtitle}</div>}
      </div>
      <div className="h-[240px]">{children}</div>
    </motion.div>
  );
}

function AnalyticsPage() {
  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">Water, climate, and energy trends across Tajikistan.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card title="Glacier area decline" subtitle="Total glacier coverage (km²), 1990–2024" delay={0.05}>
            <ResponsiveContainer>
              <AreaChart data={glacierData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7fb8d8" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#7fb8d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="year" stroke="#8a99b3" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8a99b3" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ecf4", fontSize: 12 }} />
                <Area type="monotone" dataKey="area" stroke="#4a8cd6" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Clean water access" subtitle="Urban vs rural population (%)" delay={0.1}>
            <ResponsiveContainer>
              <LineChart data={waterAccess}>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="year" stroke="#8a99b3" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8a99b3" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ecf4", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="urban" stroke="#4a8cd6" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="rural" stroke="#f3a847" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Hydropower production" subtitle="Monthly generation (GWh)" delay={0.15}>
            <ResponsiveContainer>
              <BarChart data={hydroData}>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="m" stroke="#8a99b3" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8a99b3" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ecf4", fontSize: 12 }} />
                <Bar dataKey="gwh" fill="#7c5cff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Climate risk breakdown" subtitle="Share of risk districts by hazard type" delay={0.2}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={riskBreakdown} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {riskBreakdown.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ecf4", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}