'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.svg'
import ExternalLink from './ExternalLink';

export default function MainHeader() {
  return (

    // <header className='flex w-full items-center'>
      <header className="flex w-full items-center border-4 border-red-500">
      {/* Header Logo */}
      <Link href="/">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logo.src} alt="A plate with food" width={50} height={50} />
          <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>Next Level Food</span>
        </div>
      </Link>

      {/* Navigable Elements */}
      <nav className='flex gap-5'>
        <ExternalLink href='/blog'>Blog</ExternalLink>
      </nav>
      
    </header>
  );
}
