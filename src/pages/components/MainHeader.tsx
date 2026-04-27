'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.svg'
import ExternalLink from './ExternalLink';

import '@/app/globals.css'

type HeaderButtonProps = {
  text: string;
};

export function HeaderButton({ text }: HeaderButtonProps) {
  return (
    <button className="hover:bg-app-purple-dark rounded px-7 py-1 transition-colors font-black text-light">
      {text}
    </button>
  );
}

export default function MainHeader() {
  return (
    <header className="flex w-full items-center bg-app-purple p-10 gap-10">

      {/* Header Logo */}
      <Link href="/">
        <div className='flex items-center'>
          <Image src={logo.src} alt="A plate with food" width={50} height={50} />
          <span className=''></span>
        </div>
      </Link>

      {/* Navigable Elements */}
      <nav className='flex gap-2'>
        <ExternalLink href='/blog'>
          <HeaderButton text='Blog' />
        </ExternalLink>
        {/* <Link href='/toys'>
          <HeaderButton text='Toys' />
        </Link> */}
      </nav>

    </header>
  );
}
