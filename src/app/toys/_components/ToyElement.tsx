"use client";

import { useState } from "react";
import { type Toy } from "../_lib/toy-data";
import Link from "next/link";
import Image from "next/image";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useIsMobile } from "@/app/_lib/is-mobile";
import { Status, type ProjectHealth } from "@/app/_lib/api"
import { LightIndicator } from "./LightIndicator";
import { keyframes } from "@emotion/react";

// Assets are served statically from public/toys/<title>/
function getThumbnail(title: string) {
    return `/toys/${title}/thumbnail.jpg`;
}

function getDemo(title: string) {
    return `/toys/${title}/demo.gif`;
}

type ToyImageProps = {
    name: string;
    showDemo: boolean;
}


// Shows the thumbnail, or the demo gif when showDemo is set.
function ToyImage({ name: title, showDemo }: ToyImageProps) {
    const isMobile = useIsMobile();
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
                <Image className={`absolute inset-0 overflow-clip rounded select-none ${showDemo ? 'visible' : 'invisible'} ${isMobile ? 'rotate-y-180' : ''}`}
                    height={200}
                    width={250}
                    src={getDemo(title)}
                    alt={`Demo for the ${title} toy`}
                    loading="eager"
                />}
        </div>
    );
}

function transformType(type: string) {
    if (type === "web") {
        return "Website"
    }
    else if (type === "api") {
        return "API"
    }
    return type
}

type ToyEmenentProps = {
    toy: Toy;
    serviceStatus: ProjectHealth | null;
}

export function ToyElement({ toy, serviceStatus }: ToyEmenentProps) {
    // Source - https://stackoverflow.com/a/62785130
    // Posted by Arthur Bruel
    // Retrieved 2026-08-31, License - CC BY-SA 4.0
    const [timeout, setModalTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [showDemo, setShowDemo] = useState<boolean>(false);

    // State for status indicators
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    let aggregateStatus = "unknown"
    const serviceCount = Object.keys(serviceStatus ?? {}).length;
    if (serviceCount !== 0) {
        const upCount = Object.keys(serviceStatus ?? {}).filter((k) => {
            return serviceStatus![k].status === "ok";
        }).length

        if (upCount === serviceCount) {
            aggregateStatus = "All Up"
        }
        else if (upCount < serviceCount && upCount > 0) {
            aggregateStatus = "Some Up"
        }
        else if (upCount === 0) {
            aggregateStatus = "None Up"
        }
    }
    const lightSelected = type !== ""
    const statusMessage = lightSelected ? `${transformType(type)}: ${status}` : `Status: ${aggregateStatus}`;

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
            <div className="relative flex flex-row gap-2 items-center -top-1" onMouseLeave={() => { setType(""); setStatus(""); }}>
                {Object.keys(serviceStatus ?? {}).sort().map((k) => {
                    const status = serviceStatus ? serviceStatus[k].status : "unknown"
                    return (
                        <div
                            className="relative -top-0.5"
                            key={`${toy.internalName}-${k}`}
                            onMouseEnter={() => { setType(k); setStatus(status); }}
                        >
                            <LightIndicator size={14} status={status} />
                        </div>
                    );
                })}
                <p className="h-7 text-center" >{statusMessage}</p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="w-full rounded flex justify-center pb-2">
                    <ToyImage name={toy.internalName} showDemo={showDemo} />
                </div>
                <div>
                    <p className="toy-title text-left w-full pb-1">{toy.displayName.replace('_', ' ')}</p>
                    <p>{toy.description}</p>
                </div>
            </div>
        </div>
    );

    return (toy.useReactLink ?? false) ? <Link href={toy.webPath}>{cardChildren}</Link> : <a href={toy.webPath}>{cardChildren}</a>
}

export function ToyElementMobile({ toy, serviceStatus }: ToyEmenentProps) {
    const [flipped, setFlipped] = useState<boolean>(false);

    // State for status indicators
    let aggregateStatus = "unknown"
    const serviceCount = Object.keys(serviceStatus ?? {}).length;
    if (serviceCount !== 0) {
        const upCount = Object.keys(serviceStatus ?? {}).filter((k) => {
            return serviceStatus![k].status === "ok";
        }).length

        if (upCount === serviceCount) {
            aggregateStatus = "All Up"
        }
        else if (upCount < serviceCount && upCount > 0) {
            aggregateStatus = "Some Up"
        }
        else if (upCount === 0) {
            aggregateStatus = "None Up"
        }
    }
    const statusMessage = `Status: ${aggregateStatus}`;

    const NavButton = (
        <button className="glass-dark toy-element-mobile-button" aria-label='text'>
            {(toy.useReactLink ?? false) ?
                <Link className="text-2xl" href={toy.webPath}>
                    Go!
                </Link>
                :
                <a className="text-2xl" href={toy.webPath}>
                    Go!
                </a>}
        </button>
    );

    return (
        <div onClick={() => setFlipped(!flipped)}>
            <div className={`glass-panel toy-element-mobile ${flipped ? 'rotate-y-180 flipped' : ''} flex flex-col items-center-safe`}>
                <div className={`relative flex flex-row gap-2 items-center justify-start w-full -top-1 ${flipped ? "opacity-0" : ''}`}>
                    {Object.keys(serviceStatus ?? {}).sort().map((k) => {
                        const status = serviceStatus ? serviceStatus[k].status : "unknown"
                        return (
                            <div
                                className="relative -top-0.5"
                                key={`${toy.internalName}-${k}`}
                            >
                                <LightIndicator size={14} status={status} />
                            </div>
                        );
                    })}
                    <p className="h-7 text-center" >{statusMessage}</p>
                </div>


                <div className="w-full rounded flex justify-center pb-2">
                    <ToyImage name={toy.internalName} showDemo={flipped} />
                </div>

                <div className="h-full w-full toy-element-mobile-content relative">
                    <div className={`${flipped ? 'opacity-0' : 'opacity-100'}`}>
                        <p className="toy-title text-left w-full pb-1">{toy.displayName.replace('_', ' ')}</p>
                        <p>{toy.description}</p>
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center -rotate-y-180 ${!flipped ? 'opacity-0' : 'opacity-100'}`} inert={!flipped ? true : undefined} onClick={() => setFlipped(true)}>
                        {NavButton}
                    </div>
                </div>
            </div>
        </div>
    );
}

