import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DoBen',
  description: 'Realizando seus Sonhos !',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className='{inter.className}'>{children}</body>
    </html>
  )
}
