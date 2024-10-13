'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const Header: React.FC = () => {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <header style={{ padding: '10px', background: '#f0f0f0' }}>
      <nav>
        <Link href="/">ホーム</Link> | <Link href="/login">ログイン</Link> | <Link href="/protected">保護されたページ</Link> | <button onClick={handleLogout}>ログアウト</button>
      </nav>
    </header>
  )
}

export default Header
