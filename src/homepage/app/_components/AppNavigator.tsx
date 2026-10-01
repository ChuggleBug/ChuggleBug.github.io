"use client";

import "../globals.css";
import { GiHamburgerMenu } from "react-icons/gi";

import logo from "../../public/logo.svg"
import Link from "next/link"
import { useCallback, useEffect } from "react";
import useWindowDimensions from "../_lib/useWindowDimensions";


export type AppNavigatorProps = {
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
};

function SidebarNavigator({ onToggle, onClose, open }: AppNavigatorProps) {

    const handleEscape = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [handleEscape]);

    return (
        <>
            {/* <div className="cursor-pointer w-fit sticky z-10 top-5 left-5 mb-5" onClick={onToggle}></div> */}
            <button className="w-fit glass" aria-label="icon" onClick={onToggle}>
                <GiHamburgerMenu size={30} />
            </button>

            {/* Sidebar content. Make sure it cant be interacted with when closed */}
            <nav className={`z-20 sidebar ${open ? `open` : ``}`} inert={!open ? true : undefined}>
                <div className="relative flex flex-col w-full top-5 text-white font-bold">

                    <div className="flex flex-row items-center gap-2 relative left-5">
                        <div className="cursor-pointer p-2" onClick={onToggle}>
                            <GiHamburgerMenu size={30} color='white' />
                        </div>
                        <Link href="/" onClick={() => onClose()}>
                            <img className="select-none" src={logo.src} width={30} height={30}></img>
                        </Link>
                    </div>

                    {/* Buttons */}
                    <Link href="/" className="sidebar-element" onClick={() => onClose()}>
                        <div className="pl-5 py-3 min-w-20">Home</div>
                    </Link>
                    {/* Points to non-react managed website */}
                    <a href='/blog' className="sidebar-element" onClick={() => onClose()}>
                        <div className="pl-5 py-3 min-w-20">Blog</div>
                    </a>
                    <Link href='/about' className="sidebar-element" onClick={() => onClose()}>
                        <div className="pl-5 py-3 min-w-20">About</div>
                    </Link>
                    <Link href='/toys' className="sidebar-element" onClick={() => onClose()}>
                        <div className="pl-5 py-3 min-w-20">Toys</div>
                    </Link>
                </div>
            </nav>
        </>
    );
}

function DefaultNavigator() {
    return (
        <header className="flex w-fit items-center gap-10">
            <Link href="/">
                <img className="select-none" src={logo.src} width={75} height={75}></img>
            </Link>

            <nav className='flex gap-5'>
                {/* Points to non-react managed website */}
                <a href='/blog'>
                    <button className="glass" aria-label="text">Blog</button>
                </a>
                <Link href='/about'>
                    <button className="glass" aria-label="text">About</button>
                </Link>
                <Link href='/toys'>
                    <button className="glass" aria-label="text">Toys</button>
                </Link>
            </nav>

        </header>
    );
}


export default function AppNavigator({ open, onToggle, onClose }: AppNavigatorProps) {
    const { width } = useWindowDimensions();
    useEffect(() => {
        if (width >= 768) {
            onClose();
        }
    }, [width]);

    return (
        <>
            <div className={`hidden md:contents`}>
                {/* Default nav does not have a toggle and is always considered "closed" */}
                <DefaultNavigator />
            </div>
            <div className={`contents md:hidden`}>
                <SidebarNavigator open={open} onToggle={onToggle} onClose={onClose} />
            </div>
        </>
    );
}