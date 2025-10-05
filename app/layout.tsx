import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Web3 News Hub - Web3・DeFiニュースまとめ',
  description: 'NFT、DeFi、DAO、メタバースなどWeb3・分散型技術の最新ニュースを毎日自動更新',
  keywords: ["Web3","DeFi","NFT","DAO","メタバース","分散型","ブロックチェーン"],
  openGraph: {
    title: 'Web3 News Hub - Web3・DeFiニュースまとめ',
    description: 'NFT、DeFi、DAO、メタバースなどWeb3・分散型技術の最新ニュースを毎日自動更新',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
