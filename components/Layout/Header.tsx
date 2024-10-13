'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface HeaderProps {
  toggleTheme: () => void
  currentTheme: string
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get('token')
      if (token) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    checkLoginStatus()

    window.addEventListener('authChange', checkLoginStatus)

    return () => {
      window.removeEventListener('authChange', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    setIsLoggedIn(false)
    // カスタムイベントを発火
    const event = new Event('authChange')
    window.dispatchEvent(event)
    router.push('/login')
  }

  return (
    <header className="bg-gray-200 dark:bg-gray-800 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
            ホーム
          </Link>
          {!isLoggedIn && (
            <Link href="/login" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              ログイン
            </Link>
          )}
          <Link href="/protected" className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
            プロフィール
          </Link>
        </div>
        <div className="flex space-x-4">
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-gray-800 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              ログアウト
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {currentTheme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12.34h-1m15.36 5.66l-.707-.707M6.34 6.34l-.707-.707m12.02 12.02l-.707-.707M6.34 17.66l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header