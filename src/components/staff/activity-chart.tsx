
'use client';

import { TrendingUp } from 'lucide-react';
import { Donut, DonutChart, Legend } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  visitors: {
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
  data: { name: string; value: number; fill: string }[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const totalVisitors = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <DonutChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Donut
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
        </Donut>
        <Legend
          content={({ payload }) => {
            return (
              <ul className="flex flex-col gap-2">
                {payload?.map((item, index) => {
                  const { name, value, color } = item.payload;
                  const percentage = totalVisitors > 0 ? (value / totalVisitors * 100).toFixed(1) : 0;
                  return (
                    <li key={item.value} className="flex items-center gap-2 text-sm">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-muted-foreground">{name}</span>
                      <span className="font-bold">{value}</span>
                      <span className="text-muted-foreground/70">({percentage}%)</span>
                    </li>
                  )
                })}
              </ul>
            )
          }}
          verticalAlign="bottom"
          align="left"
          wrapperStyle={{ paddingLeft: '10px' }}
        />
      </DonutChart>
    </ChartContainer>
  );
}
