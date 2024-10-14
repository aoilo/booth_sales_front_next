'use client'

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardDescription,
} from "./CustomCard"
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "./CustomTable"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart" // shadcn/uiのコンポーネント
import { cn } from '@/lib/utils'

interface PeriodOrderCount {
  period: string
  orderCount: number
}

interface SalesChartProps {
  periodOrderCounts: PeriodOrderCount[]
}

const chartConfig: ChartConfig = {
  orderCount: {
    label: "注文数",
    color: "hsl(var(--chart-1))", // CSS変数を正しく参照
  },
} satisfies ChartConfig

const SalesChart: React.FC<SalesChartProps> = ({ periodOrderCounts }) => {
  return (
    <CustomCard>
      <CustomCardHeader className={cn("flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row")}>
        <div className={cn("flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6")}>
          <CustomCardTitle>日別注文数</CustomCardTitle>
          <CustomCardDescription>
            期間: 2024年1月1日～2024年1月31日
          </CustomCardDescription>
        </div>
      </CustomCardHeader>
      <CustomCardContent className={cn("px-2 sm:p-6")}>
        <ChartContainer
          config={chartConfig}
          className={cn("aspect-auto h-[300px] w-full transition-colors duration-300")}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={periodOrderCounts}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke={`hsl(var(--border))`} strokeDasharray="3 3" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 12, fill: `hsl(var(--foreground))` }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
                stroke={`hsl(var(--border))`}
              />
              <YAxis
                tick={{ fontSize: 12, fill: `hsl(var(--foreground))` }}
                stroke={`hsl(var(--border))`}
              />
              <Tooltip
                content={
                  <ChartTooltipContent
                    className={cn("w-[150px]")}
                    nameKey="注文数"
                    labelFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  />
                }
              />
              <Bar dataKey="orderCount" fill={`hsl(var(--chart-1))`} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CustomCardContent>
    </CustomCard>
  )
}

export default SalesChart