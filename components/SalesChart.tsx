// "use client"

// import * as React from "react"
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
// } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export const description = "An interactive area chart"

// // データ生成関数（例としてランダムデータを使用）
// const generateRandomData = (days: number) => {
//   const data = []
//   for (let i = 0; i < days; i++) {
//     const currentDate = new Date()
//     currentDate.setDate(currentDate.getDate() - i)
//     const formattedDate = currentDate.toISOString().split('T')[0]
//     const desktopValue = Math.floor(Math.random() * 400)
//     const mobileValue = Math.floor(Math.random() * 400)
//     data.push({
//       date: formattedDate,
//       desktop: desktopValue,
//       mobile: mobileValue
//     })
//   }
//   return data
// }

// const chartData = generateRandomData(90)

// // ChartConfig の設定
// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

// interface SalesChartProps {
//   periodOrderCounts: {
//     period: string
//     orderCount: number
//   }[]
// }

// export default function SalesChart({ periodOrderCounts }: SalesChartProps) {
//   const [timeRange, setTimeRange] = React.useState("90d")

//   // 最新日付を取得
//   const latestDate = React.useMemo(() => {
//     return periodOrderCounts.reduce((max, item) => {
//       const itemDate = new Date(item.period)
//       return itemDate > max ? itemDate : max
//     }, new Date(periodOrderCounts[0].period))
//   }, [periodOrderCounts])

//   // 時間範囲に基づいてデータをフィルタリング
//   const filteredData = React.useMemo(() => {
//     let daysToSubtract = 90
//     if (timeRange === "30d") {
//       daysToSubtract = 30
//     } else if (timeRange === "7d") {
//       daysToSubtract = 7
//     }
//     const thresholdDate = new Date(latestDate)
//     thresholdDate.setDate(thresholdDate.getDate() - daysToSubtract)
//     return periodOrderCounts
//       .filter(item => new Date(item.period) >= thresholdDate)
//       .sort((a, b) => new Date(a.period).getTime() - new Date(b.period).getTime())
//   }, [periodOrderCounts, timeRange, latestDate])

//   return (
//     <Card>
//       <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
//         <div className="grid flex-1 gap-1 text-center sm:text-left">
//           <CardTitle>Order Count - Interactive Chart</CardTitle>
//           <CardDescription>
//             Showing order counts over selected time range
//           </CardDescription>
//         </div>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger
//             className="w-[160px] rounded-lg sm:ml-auto"
//             aria-label="Select a value"
//           >
//             <SelectValue placeholder="Last 3 months" />
//           </SelectTrigger>
//           <SelectContent className="rounded-xl">
//             <SelectItem value="90d" className="rounded-lg">
//               Last 3 months
//             </SelectItem>
//             <SelectItem value="30d" className="rounded-lg">
//               Last 30 days
//             </SelectItem>
//             <SelectItem value="7d" className="rounded-lg">
//               Last 7 days
//             </SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
//         <ChartContainer
//           config={chartConfig}
//           className="aspect-auto h-[300px] w-full"
//         >
//           <AreaChart data={filteredData}>
//             <defs>
//               <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var()"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var()"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//               <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var()"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var()"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//             </defs>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="period"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               minTickGap={32}
//               tickFormatter={(value) => {
//                 const date = new Date(value)
//                 return date.toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })
//               }}
//             />
//             <YAxis />
//             <ChartTooltip
//               cursor={false}
//               content={
//                 <ChartTooltipContent
//                   labelFormatter={(value) => {
//                     return new Date(value).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     })
//                   }}
//                   indicator="dot"
//                 />
//               }
//             />
//             <Area
//               dataKey="orderCount"
//               type="monotone"
//               fill="url(#fillDesktop)"
//               stroke="var(--color-desktop)"
//             />
//             <ChartLegend content={<ChartLegendContent />} />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
