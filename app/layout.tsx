import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import CampaignModal from './components/modals/CampaignModal'
import PusherNotification from './components/PusherNotification'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RaiseUp',
  description: 'Transforming Ideas into Action, RaiseUp Your Vision',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <CampaignModal />
          <LoginModal />
          <RegisterModal />
          <PusherNotification currentUser = {currentUser}/>
          {/* <SearchModal /> */}
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
