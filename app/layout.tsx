'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import '../styles/globals.css'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <html lang="ja">
      <head>
        <title>Booth-Sales</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Header toggleTheme={toggleTheme} currentTheme={theme} />
        <main className="p-4">
          {children}
        </main>
        <footer className="p-4 bg-gray-100 dark:bg-gray-800 text-center">
          © 2024 Booth-Sales
        </footer>
      </body>
    </html>
  )
}
