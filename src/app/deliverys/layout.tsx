
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DeliverysProvider } from '@/context/DeliveryContext'
import { VehiclesProvider } from '@/context/VehicleContext'
import { OrderProvider } from '@/context/OrderContext'
import { LocalProfilesProvider } from '@/context/LocalProfileContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrderProvider>
        <DeliverysProvider>
          <VehiclesProvider>
            <LocalProfilesProvider>
            {children}
            </LocalProfilesProvider>
          </VehiclesProvider>
        </DeliverysProvider>
        </OrderProvider>
      </body>
    </html>
  )
}