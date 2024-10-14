'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import ProfileUpdateForm from '../../components/ProfileUpdateForm'

interface ProtectedData {
  message: string
  data: {
    name: string
    email: string
    iat: number
    exp: number
  }
}

const ProtectedPage: React.FC = () => {
  const [data, setData] = useState<ProtectedData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = Cookies.get('token')
      if (!token) {
        router.push('/login')
        return
      }
      try {
        const res = await axios.get<ProtectedData>(`${process.env.NEXT_PUBLIC_API_URL}/users/user`, {
          headers: { Authorization: token },
        })
        setData(res.data)
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    }

    fetchProtectedData()
  }, [router])

  if (!data) return <p className="text-center">ロード中...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileUpdateForm />
    </div>
  )
}

export default ProtectedPage