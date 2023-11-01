
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ProductsProvider } from '@/context/ProductContext'
import { LocalProfilesProvider } from '@/context/LocalProfileContext'
import { CartProvider } from '@/context/CartContext'
import { OrderProvider } from '@/context/OrderContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrderProvider>
        <CartProvider>
        <LocalProfilesProvider>
          <ProductsProvider>
          {children}
          </ProductsProvider>
        </LocalProfilesProvider>
        </CartProvider>
        </OrderProvider>
      </body>
    </html>
  )
}