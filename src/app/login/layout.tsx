import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LoginProvider } from '@/context/LoginContext'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginProvider>
          <Navbar text="Pedidos Crombie - Bienvenido de vuelta!" />
          {children}
        </LoginProvider>
      </body>
    </html>
  )
}