'use client'

import React, { useState, FormEvent } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { Card } from '@/components/ui/card'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, { email, password })
      const { token } = res.data
      Cookies.set('token', token, { expires: 1 })
      login() // カスタムイベントを発火
      setSuccess('ログインに成功しました')
      router.push('/protected')
    } catch (err: any) {
      setError(err.response?.data?.message || 'ログインに失敗しました')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">ログイン</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-200">
              ユーザー名
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              placeholder="あなたの名前"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-200">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ログイン
          </button>
        </form>
      </Card>
    </div>
  )
}

export default LoginForm