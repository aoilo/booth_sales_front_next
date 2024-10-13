'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hook/useAuth'

interface ProtectedData {
  message: string
  data: {
    username: string
    iat: number
    exp: number
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
        const res = await axios.get<ProtectedData>('http://localhost:8010/users/user', {
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

  if (!data) return <p>ロード中...</p>

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>保護されたページ</h1>
      <p>{data.message}</p>
      <pre>{JSON.stringify(data.data, null, 2)}</pre>
    </div>
  )
}

export default ProtectedPage
