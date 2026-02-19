
import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ThesisLab',
  description: 'The Investment Constellation Engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-bg-void text-text-primary">
        {children}
      </body>
    </html>
  )
}

