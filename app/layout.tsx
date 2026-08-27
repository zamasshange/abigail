import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Cinzel_Decorative, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const display = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-deco',
  weight: ['400', '700', '900'],
})

const garamond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'A raven for Ricky — from Drake',
  description:
    'A sealed scroll from Drake to Ricky. The hours we never hung up, the night we broke, the road back, and one oath left to keep: I need to see you.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1c120c',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${display.variable} ${garamond.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
