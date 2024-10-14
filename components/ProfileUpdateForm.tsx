'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"

const ProfileUpdateForm: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token')
      if (!token) {
        router.push('/login')
        return
      }
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/user`, {
          headers: { Authorization: token },
        })
        // console.log(res.data.user.name)
        setName(res.data.user.name)
        setEmail(res.data.user.email)
      } catch (err: any) {
        console.error(err)
        router.push('/login')
      }
    }

    fetchProfile()
  }, [router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/user`,
        { name, email },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setSuccess('プロフィールが更新されました')
    } catch (err: any) {
      setError(err.response?.data?.message || '更新に失敗しました')
    }
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">プロフィール更新</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-200">
            名前
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="あなたの名前"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-200">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          更新
        </button>
      </form>
    </Card>
  )
}

export default ProfileUpdateForm