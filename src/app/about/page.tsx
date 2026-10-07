"use client";

import { useState } from "react";
import "../globals.css";

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



type pfpState = 'linkedin' | 'github';

const pfpSources: Record<pfpState, { src: string; alt: string, href: string }> = {
    linkedin: {
        src: "https://www.gravatar.com/avatar/1740cd2f6f536c3c834ee794cdcf2f2d975e8c6b259879b16f41abfd2f9ca338?s=512",
        alt: "Jacob Gutierrez LinkedIn Profile Picture",
        href: "https://www.linkedin.com/in/jacob-gutierrez-486317292/"
    },
    github: {
        src: "https://github.com/ChuggleBug.png",
        alt: "Jacob Gutierrez GitHub Profile Picture",
        href: "https://github.com/ChuggleBug"
    },
};

export default function About() {
    const [pfpState, setPfpState] = useState<pfpState>('linkedin');
    const [loaded, setLoaded] = useState<Record<pfpState, boolean>>({ linkedin: false, github: false });

    const markLoaded = (key: pfpState) =>
        setLoaded((prev) => (prev[key] ? prev : { ...prev, [key]: true }));

    return (
        <div className="lg:px-20 p-10 flex flex-col gap-5">
            {/* About Me */}
            <div className="flex flex-col-reverse md:flex-row gap-5">
                {/* About text */}
                <div className="glass-panel-content flex-3">
                    <h2>About Me</h2>
                    <p className="min-h-[200px]">
                        Still figuring out what to write here
                    </p>
                </div>

                {/* About image */}
                <div className="glass-panel-content flex-1 items-center justify-center min-h-fit h-auto">
                    <div className="absolute z-10 bottom-5 right-5 flex flex-row-reverse gap-2">
                        <button className="glass-dark" aria-label="icon" onClick={() => setPfpState('linkedin')}>
                            <FaLinkedin size={24} />
                        </button>
                        <button className="glass-dark" aria-label="icon" onClick={() => setPfpState('github')}>
                            <FaGithub size={24} />
                        </button>
                    </div>

                    <div className="w-full aspect-square relative z-0 rounded-full overflow-hidden max-h-[256px] max-w-[256px]">
                        {(Object.keys(pfpSources) as pfpState[]).map((key) => (
                            <a
                                key={key}
                                href={pfpSources[key].href}
                                aria-hidden={pfpState !== key}
                                tabIndex={pfpState === key ? 0 : -1}
                                className={`absolute inset-0 z-10 ${pfpState === key && loaded[key] ? 'opacity-100' : 'opacity-0'} ${pfpState === key ? '' : 'pointer-events-none'}`}>
                                <img
                                    src={pfpSources[key].src}
                                    ref={(el) => { if (el?.complete && el.naturalWidth > 0) markLoaded(key); }}
                                    onLoad={() => markLoaded(key)}
                                    className="w-full h-full object-cover"
                                    alt={pfpSources[key].alt} />
                            </a>
                        ))}
                        {!loaded[pfpState] && <div className="absolute inset-0 bg-background z-0" />}
                    </div>

                </div>
            </div>

            {/* About Website */}
            <div className="glass-panel-content">
                <h2>About this Site</h2>
                <div className="min-h-[200px]">
                    For Now:
                    <ul className="list-disc ml-5">
                        <li>This site is next.js ssg</li>
                        <li>The blog is Jekyll (a tweaked Chirpy theme)</li>
                        <li>The toys can be a wide range of frameworks (and if there is a backend, then those will also vary)</li>
                    </ul>
                </div>
            </div>
        </div>

    );
}