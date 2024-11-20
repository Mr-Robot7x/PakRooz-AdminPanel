"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { CircleDollarSign, ShoppingCart } from "lucide-react";

const chartData = [
  { month: "January", Sales: 186, orders: 80 },
  { month: "February", Sales: 305, orders: 200 },
  { month: "March", Sales: 237, orders: 120 },
  { month: "April", Sales: 73, orders: 190 },
  { month: "May", Sales: 209, orders: 130 },
  { month: "June", Sales: 214, orders: 140 },
];

const chartConfig = {
  Sales: {
    label: "Sales",
    color: "#dc2626",
    icon: CircleDollarSign,
  },
  orders: {
    label: "orders",
    color: "#2e2e2e",
    icon: ShoppingCart,
  },
} satisfies ChartConfig;

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <CartesianGrid
          vertical={false}
          stroke="#cccccc09"
          strokeLinecap="round"
        />
        <Bar dataKey="Sales" fill="var(--color-Sales)" radius={4} />
        <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />

        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
      </BarChart>
    </ChartContainer>
  );
}
