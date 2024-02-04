import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ToastProvider from './Providers/ToastProvider';
import LoadingContext from "../contexts/LoadingContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eventy',
  description: 'Seu evento começa aqui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ToastProvider>
            <LoadingContext>
              {children}
            </LoadingContext>
          </ToastProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
