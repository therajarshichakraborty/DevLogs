import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'DevLog - Developer Notes',
    template: '%s | DevLog',
  },
  description: 'A minimal developer blog to write, publish, and share your notes and learnings.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-56px)]">{children}</main>
          <footer className="border-t border-border mt-16 py-8 text-center text-xs text-muted-foreground">
            DevLog · Built with Next.js 15, Prisma & PostgreSQL
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
