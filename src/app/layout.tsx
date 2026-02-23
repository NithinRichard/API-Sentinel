import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'API Sentinel — Real-Time API Monitoring',
  description:
    'Monitor your APIs in real time. Get instant alerts when Google Maps, Stripe, Razorpay, or any endpoint goes down.',
  metadataBase: new URL('https://apisentinel.dev'),
  openGraph: {
    title: 'API Sentinel — Real-Time API Monitoring',
    description: 'Monitor your APIs in real time. Get instant alerts before your users notice.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
