// src/app/layout.tsx
import { Inter, Raleway } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ReactNode } from 'react'
import { LoadingProvider } from '@/components/contexts/LoadingContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })

export const metadata = {
  title: 'CAJCODE LLC - Premium iOS & Web Development',
  description: 'Professional iOS app development and web solutions by CAJCODE LLC',
  keywords: 'iOS development, web development, mobile apps, CAJCODE',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body className="min-h-screen flex flex-col bg-dark text-light">
      <LoadingProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  )
}