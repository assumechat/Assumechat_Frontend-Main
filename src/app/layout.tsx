import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '../Provider/providers'
import AppLayout from '../Provider/AppLayout'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AssumeChat ',
  description: 'Your Campus Just Got a Lot Bigger.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="shortcut icon" href="https://res.cloudinary.com/dipywb0lr/image/upload/v1749293538/GreenAndYellowVibrantBuy2Get1FreeInstagramPost-ezgif.com-gif-maker_cp370v.gif" type="image/x-icon" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <AppLayout>{children}</AppLayout>
        </ReduxProvider>
      </body>
    </html>
  )
}
