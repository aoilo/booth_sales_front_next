// app/sales/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import SalesChart from '../../components/ui/SalsesChart'

interface SalesData {
  orderCount: number
  totalUnitPrice: number
  boost: number
  tagOrderCounts: {
    tagId: number
    tagName: string
    orderCount: number
  }[]
  periodOrderCounts: {
    period: string
    orderCount: number
  }[]
}

const SalesPage: React.FC = () => {
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
    <div className="max-w-4xl mx-auto p-6">
      <SalesChart periodOrderCounts={data.periodOrderCounts} />
    </div>
  )
}

export default SalesPage
