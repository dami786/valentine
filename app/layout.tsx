import type { Metadata } from 'next'
import { Dancing_Script, Playfair_Display } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Will You Be My Valentine? ❤️',
  description: 'A special Valentine\'s proposal for Savera',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${playfair.variable}`}>
      <body className="min-h-screen overflow-x-hidden font-display">
        {children}
      </body>
    </html>
  )
}
