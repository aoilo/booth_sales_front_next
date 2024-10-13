'use client'

import React, { useState, FormEvent } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hook/useAuth'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, { email, password })
      const { token } = res.data
      Cookies.set('token', token, { expires: 1 })
      login() // カスタムイベントを発火
      router.push('/protected')
    } catch (error: any) {
      setError('ログインに失敗しました。メールアドレスまたはパスワードが間違っています。')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">ログイン</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
            メールアドレス
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="メールアドレス"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="********"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm