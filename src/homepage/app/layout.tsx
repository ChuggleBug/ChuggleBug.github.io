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

        <div className="sticky w-fit top-5 left-5 md:top-10 md:left-10 z-20">
          <AppNavigator
            open={navStore.open}
            onToggle={navStore.onToggle}
            onClose={navStore.onClose}
          />
        </div>
        {/* Blur Layer for the navigator */}
        <div className={`fixed inset-0 w-screen h-screen sidebar-blur ${navStore.open ? `sidebar-blur--show` : ``} `} onClick={() => navStore.onClose()}></div>

        <div id="root">{children}</div>

        <div className="fixed -z-10">
          <ParticlesBackground />
        </div>
      </body>
    </html>
  )
}