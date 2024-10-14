'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  CustomTable,
  CustomTableBody,
  CustomTableCell,
  CustomTableHead,
  CustomTableHeader,
  CustomTableRow,
} from "@/components/custom/CustomTable" // カスタムテーブルをインポート
import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardDescription,
} from "@/components/custom/CustomCard" // カスタムカードをインポート

import SalesChart from "@/components/custom/SalesChart" // カスタムSalesChartをインポート
import Header from "@/components/custom/Header" // ヘッダーコンポーネントはレイアウトに統合済み

import { SalesData } from "@/types" // 型定義のインポート

const Dashboard: React.FC = () => {
  const [data, setData] = useState<SalesData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchSalesData = async () => {
      const token = Cookies.get('token')
      if (!token) {
        router.push('/login')
        return
      }
      try {
        const res = await axios.get<SalesData>(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/userOrders`,
          {
            params: {
              startDate: '2024-01-01',
              productId: 5,
              groupBy: 'day',
            },
            headers: { Authorization: token }, // Bearerトークン形式に修正
          }
        )
        setData(res.data)
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    }

    fetchSalesData()
  }, [router])

  if (!data) return <p className="text-center">ロード中...</p>

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CustomCard>
            <CustomCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CustomCardTitle className="text-sm font-medium">
                Total Revenue
              </CustomCardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CustomCardHeader>
            <CustomCardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CustomCardContent>
          </CustomCard>
          <CustomCard>
            <CustomCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CustomCardTitle className="text-sm font-medium">
                Subscriptions
              </CustomCardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CustomCardHeader>
            <CustomCardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CustomCardContent>
          </CustomCard>
          <CustomCard>
            <CustomCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CustomCardTitle className="text-sm font-medium">Sales</CustomCardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CustomCardHeader>
            <CustomCardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CustomCardContent>
          </CustomCard>
          <CustomCard>
            <CustomCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CustomCardTitle className="text-sm font-medium">Active Now</CustomCardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CustomCardHeader>
            <CustomCardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CustomCardContent>
          </CustomCard>
        </div>
        <SalesChart periodOrderCounts={data.periodOrderCounts} />
        </main>
      </div>
    )
  }

export default Dashboard
