"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const GOLD = "#D4A24C";
const GOLD2 = "#E8B85B";
const GRID = "#26262A";
const TEXT = "#9A9A9F";

const chartTooltip = {
  contentStyle: {
    background: "#141416",
    border: "1px solid #26262A",
    borderRadius: 6,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "#F5F1E8",
  },
  cursor: { fill: "rgba(212,162,76,0.06)" },
};

export function RevenueLine({ data }: { data: { day: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity={0.4} />
            <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke={GRID} vertical={false} />
        <XAxis
          dataKey="day"
          stroke={TEXT}
          fontSize={10}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis stroke={TEXT} fontSize={10} axisLine={false} tickLine={false} width={40} />
        <Tooltip {...chartTooltip} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={GOLD}
          strokeWidth={2}
          fill="url(#revFill)"
          isAnimationActive
          animationDuration={800}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({ data, color = GOLD }: { data: number[]; color?: string }) {
  const d = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={d}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function Donut({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={55}
          outerRadius={88}
          paddingAngle={2}
          stroke="#0A0A0B"
          strokeWidth={2}
          isAnimationActive
          animationDuration={800}
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        <Tooltip {...chartTooltip} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function HoursBars({ data }: { data: { name: string; hours: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 4" stroke={GRID} vertical={false} />
        <XAxis
          dataKey="name"
          stroke={TEXT}
          fontSize={10}
          axisLine={false}
          tickLine={false}
        />
        <YAxis stroke={TEXT} fontSize={10} axisLine={false} tickLine={false} width={28} />
        <Tooltip {...chartTooltip} />
        <Bar dataKey="hours" fill={GOLD} radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? GOLD : GOLD2} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
