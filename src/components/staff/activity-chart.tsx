
'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'Visitors',
  },
  'Pumpkin Picking': {
    label: 'Pumpkin Picking',
    color: 'hsl(var(--chart-1))',
  },
  'Alpaca Walks': {
    label: 'Alpaca Walks',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface ActivityChartProps {
  data: { name: string; value: number }[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const totalVisitors = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        />
         <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
