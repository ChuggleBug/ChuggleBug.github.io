"use client";

import './globals.css'
import ParticlesBackground from './_components/ParticleBackground';
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
      <title>Jacob Gutierrez's Site</title>
      <meta name="description" content="Web site created with Next.js." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="apple-mobile-web-app-title" content="ChuggleBug" />
      <body suppressHydrationWarning>

        <div className="sticky w-fit top-5 md:top-10 left-5 md:left-10 mt-5 md:mt-10 z-20">
          <AppNavigator
            open={navStore.open}
            onToggle={navStore.onToggle}
            onClose={navStore.onClose}
          />
        </div>
        {/* Blur Layer for the navigator */}
        <div className={`fixed inset-0 z-10 w-screen h-screen sidebar-blur ${navStore.open ? `sidebar-blur--show` : ``} `} onClick={() => navStore.onClose()}></div>

        <div id="root">{children}</div>

        <div className="fixed -z-10">
          <ParticlesBackground />
        </div>
      </body>
    </html>
  )
}