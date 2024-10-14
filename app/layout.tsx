import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/custom/Header' // カスタムHeaderをインポート

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className="dark"> {/* デフォルトをダークモードに設定 */}
      <body className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <Header /> {/* カスタムヘッダーをレイアウトに組み込む */}
        <main>{children}</main>
      </body>
    </html>
  )
}