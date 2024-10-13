import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import cookie from 'cookie'

export async function GET(request: NextRequest) {
  const cookies = request.headers.get('cookie')
  if (!cookies) {
    return NextResponse.json({ message: '認証トークンがありません' }, { status: 401 })
  }

  const parsedCookies = cookie.parse(cookies)
  const token = parsedCookies.token

  if (!token) {
    return NextResponse.json({ message: '認証トークンがありません' }, { status: 401 })
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/user`, {
      headers: {
        Authorization: token,
      },
    })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 })
  }
}