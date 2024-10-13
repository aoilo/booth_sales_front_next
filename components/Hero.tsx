'use client'

import React from 'react'
import Button from './ui/Button'
import Link from 'next/link'

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gray-50 dark:bg-gray-800">
      <h1 className="text-4xl font-bold mb-4">ようこそ、Booth-Salesへ</h1>
      <p className="text-lg mb-8">
        Boothの売り上げ管理を快適に。。。
      </p>
      <Link href="/login">
        <Button>ログイン</Button>
      </Link>
    </section>
  )
}

export default Hero