"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { CircleDollarSign } from "lucide-react";

const data = [
  {
    name: "Sun",
    sales: 430,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Mon",
    sales: 330,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Tus",
    sales: 365,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Wed",
    sales: 264,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Thurs",
    sales: 540,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Fri",
    sales: 400,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Sat",
    sales: 450,
    pv: 4300,
    amt: 2100,
  },
];

const chartConfig = {
  uv: {
    label: "Sales",
    color: "#dc2626",
    icon: CircleDollarSign,
  },
} satisfies ChartConfig;

export function WeeklyChart() {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart accessibilityLayer data={data} height={400}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <CartesianGrid
            vertical={false}
            stroke="#cccccc09"
            strokeLinecap="round"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#dc2626"
            fill="#2e2e2e"
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
