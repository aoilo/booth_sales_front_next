'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  // ログイン時にカスタムイベントを発火させる関数
  const login = () => {
    const event = new Event('authChange')
    window.dispatchEvent(event)
  }

  // ログアウト時にカスタムイベントを発火させる関数
  const logout = () => {
    const event = new Event('authChange')
    window.dispatchEvent(event)
  }

  return { login, logout }
}