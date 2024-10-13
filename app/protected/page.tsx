'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hook/useAuth'
import Profile from '../../components/Profile'

interface ProtectedData {
  message: string
  user: {
    name: string
    iat: number
    exp: number
    createdAt: string
  }
}

const ProtectedPage: React.FC = () => {
  useAuth()
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
          headers: { Authorization: token }, // Bearerトークンとして送信
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

  console.log(data)
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">プロフィール</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{data.message}</p>
      <Profile name={data.user.name} iat={data.user.iat} exp={data.user.exp} createdAt={data.user.createdAt}/>
    </div>
  )
}

export default ProtectedPage