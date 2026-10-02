"use client";

import { useState } from "react";
import { type Toy } from "../_lib/toy-data";
import Link from "next/link";
import Image from "next/image";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// Assets are served statically from public/toys/<title>/
function getThumbnail(title: string) {
    return `/toys/${title}/thumbnail.jpg`;
}

function getDemo(title: string) {
    return `/toys/${title}/demo.gif`;
}

type ToyImageProps = {
    title: string;
    showDemo: boolean;
}

// Shows the thumbnail, or the demo gif when showDemo is set.
function ToyImage({ title, showDemo }: ToyImageProps) {
    const [demoLoaded, setDemoLoaded] = useState<boolean>(false);
    if (showDemo && !demoLoaded) {
        setDemoLoaded(true);
    }

    return (
        <div className="relative">
            <Image className="overflow-clip rounded select-none"
                height={200}
                width={250}
                src={getThumbnail(title)}
                alt={`Thumbnail for the ${title} toy`}
                loading="eager"
            />
            {demoLoaded &&
                <Image className={`absolute inset-0 overflow-clip rotate-y-180 rounded select-none ${showDemo ? 'visible' : 'invisible'}`}
                    height={200}
                    width={250}
                    src={getDemo(title)}
                    alt={`Demo for the ${title} toy`}
                    loading="eager"
                />}
        </div>
    );
}

type ToyEmenentProps = {
    toy: Toy;
}

export function ToyElement({ toy }: ToyEmenentProps) {
    // Source - https://stackoverflow.com/a/62785130
    // Posted by Arthur Bruel
    // Retrieved 2026-08-31, License - CC BY-SA 4.0
    const [timeout, setModalTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [showDemo, setShowDemo] = useState<boolean>(false);

    const handleMouseEnter = () => {
        timeout && !showDemo && clearTimeout(timeout);
        setModalTimeout(setTimeout(() => {
            setShowDemo(true);
        }, 500));

    }

    const handleMouseLeave = () => {
        timeout && clearTimeout(timeout)
        setShowDemo(false);
    }

    const cardChildren = (
        <div className="glass-panel toy-element flex flex-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="flex flex-col gap-2">
                <div className="w-full rounded flex justify-center pb-2">
                    <ToyImage title={toy.title} showDemo={showDemo} />
                </div>
                <div>
                    <p className="toy-title text-left w-full pb-1">{toy.title.replace('_', ' ')}</p>
                    <p>{toy.description}</p>
                </div>
            </div>
        </div>
    );

    return (toy.useReactLink ?? false) ? <Link href={toy.webPath}>{cardChildren}</Link> : <a href={toy.webPath}>{cardChildren}</a>
}

export function ToyElementMobile({ toy }: ToyEmenentProps) {
    const [flipped, setFlipped] = useState<boolean>(false);

    const NavButton = (
        <div className="toy-element-mobile-button p-2">
            {(toy.useReactLink ?? false) ?
                <Link href={toy.webPath}>
                    Go!
                </Link>
                :
                <a href={toy.webPath}>
                    Go!
                </a>}
        </div>
    );

    return (
        <ClickAwayListener onClickAway={() => (setFlipped(false))}>
            <div onClick={() => setFlipped(!flipped)}>
                <div className={`glass-panel toy-element-mobile ${flipped ? 'rotate-y-180 flipped' : ''} flex flex-col items-center-safe`}>
                    <div className="w-full rounded flex justify-center pb-2">
                        <ToyImage title={toy.title} showDemo={flipped} />
                    </div>

                    <div className="h-full w-full toy-element-mobile-content relative">
                        <div className={`${flipped ? 'opacity-0' : 'opacity-100'}`}>
                            <p className="toy-title text-left w-full pb-1">{toy.title.replace('_', ' ')}</p>
                            <p>{toy.description}</p>
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center -rotate-y-180 ${!flipped ? 'opacity-0' : 'opacity-100'}`} inert={!flipped ? true : undefined} onClick={() => setFlipped(true)}>
                            {NavButton}
                        </div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    );
}

