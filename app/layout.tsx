import React, { ReactNode } from 'react'
import Header from '../components/Layout/Header'
import '../styles/globals.css'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <head>
        <title>My App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Header />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
        <footer style={{ padding: '10px', background: '#f0f0f0', textAlign: 'center' }}>
          © 2024 My App
        </footer>
      </body>
    </html>
  )
}
