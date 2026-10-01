"use client";

import './globals.css'
import ParticlesBackground from './_components/ParticleBackground';
import App from 'next/app';
import AppNavigator from './_components/AppNavigator';
import { useNavStore } from './_lib/useNavStore';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navStore = useNavStore();

  return (
    <html lang="en" suppressHydrationWarning>
      <title>React App</title>
      <meta name="description" content="Web site created with Next.js." />
      <body>

        <div className="fixed right-0">{navStore.open ? 'Open' : 'Closed'}</div>
        <AppNavigator 
          open={navStore.open} 
          onToggle={navStore.onToggle} 
          onClose={navStore.onClose} 
        />
        {/* Blur Layer for the navigator */}
        <div className={`fixed z-10 inset-0 w-screen h-screen sidebar-blur ${navStore.open ? `show` : ``} `} onClick={() => navStore.onClose()}></div>

        <ParticlesBackground/>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}