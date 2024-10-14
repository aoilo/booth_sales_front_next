export interface User {
  id: string;
  name: string;
  iat: number;
  exp: number;
  createdAt: string;
}

export interface TagOrderCount {
  tagId: number
  tagName: string
  orderCount: number
}

export interface PeriodOrderCount {
  period: string
  orderCount: number
}

export interface SalesData {
  orderCount: number
  totalUnitPrice: number
  boost: number
  tagOrderCounts: TagOrderCount[]
  periodOrderCounts: PeriodOrderCount[]
}