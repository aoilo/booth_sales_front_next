'use client'

import React from 'react'

interface ProfileProps {
  name: string
  iat: number
  exp: number
  createdAt: string
}

const Profile: React.FC<ProfileProps> = ({ name, iat, exp, createdAt }) => {

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-700 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">プロフィール</h2>
      <p><strong>メールアドレス:</strong> {name}</p>
      <p><strong>登録日:</strong> {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default Profile