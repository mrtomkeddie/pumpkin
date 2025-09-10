
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface BookingsChartProps {
  data: { date: string; visitors: number }[];
}

export function BookingsChart({ data }: BookingsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 6)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          allowDecimals={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
