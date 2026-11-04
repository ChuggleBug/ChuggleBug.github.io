"use client";

import React, { useState } from "react";
import { type Toy } from "@/app/toys/lib/toy-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ProjectHealth } from "@/app/lib/api";
import {
    ServiceLightTable,
    ServiceLightsRow,
} from "@/app/toys/components/ServiceLights";
import { ToyImage } from "@/app/toys/components/ToyImage";
import { FaInfo } from "react-icons/fa";

type LinkWrapperProps = {
    toy: Toy;
    children: React.ReactNode;
};

// Uses Next's client-side Link for in-app toys, a plain anchor otherwise.
function LinkWrapper({ toy, children }: LinkWrapperProps) {
    return (toy.useReactLink ?? false) ? (
        <Link href={toy.webPath}>{children}</Link>
    ) : (
        <a href={toy.webPath}>{children}</a>
    );
}

type ToyEmenentProps = {
    toy: Toy;
    serviceStatus: ProjectHealth | null;
    includeButton: boolean;
};

export function ToyElement({
    toy,
    serviceStatus,
    includeButton = true,
}: ToyEmenentProps) {
    // Source - https://stackoverflow.com/a/62785130
    // Posted by Arthur Bruel
    // Retrieved 2026-08-31, License - CC BY-SA 4.0
    const [timeout, setModalTimeout] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const router = useRouter();

    const showDemo = hoverTimeout;

    // Counter-rotate content so it isn't mirrored while the card is flipped
    const unflip = flipped ? "rotate-y-180" : "";

    const handleMouseEnter = () => {
        if (timeout && !hoverTimeout) {
            clearTimeout(timeout);
        }
        setModalTimeout(
            setTimeout(() => {
                setHoverTimeout(true);
            }, 500),
        );
    };

    const handleMouseLeave = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        setHoverTimeout(false);
    };

    // Whole card acts as the link when there's no dedicated button
    const navigate = () => {
        if (toy.useReactLink ?? false) {
            router.push(toy.webPath);
        } else {
            window.location.assign(toy.webPath);
        }
    };

    const cardLinkProps = includeButton
        ? {}
        : {
              role: "link",
              tabIndex: 0,
              onClick: navigate,
          };

    return (
        // Wrapper needed to preserver hover timer
        <div
            className={`w-full h-full ${includeButton ? "" : "cursor-pointer"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...cardLinkProps}
        >
            <div
                className={`glass toy-element ${flipped ? "rotate-y-180" : ""}`}
            >
                {/* Service and Info */}
                <div className={`relative ${unflip}`}>
                    <div
                        className={flipped ? "invisible" : ""}
                        aria-hidden={flipped}
                    >
                        <ServiceLightsRow services={serviceStatus} />
                    </div>
                    <button
                        className="glass-dark w-fit! absolute -right-2 -top-2"
                        content-type="icon"
                        set-blur="true"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFlipped((prev) => !prev);
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                    >
                        <FaInfo size={18} />
                    </button>
                </div>

                <div className={`toy-element-main ${unflip}`}>
                    {/* Image */}
                    <div className="rounded">
                        <ToyImage name={toy.internalName} showDemo={showDemo} />
                    </div>
                    {/* Side Content */}
                    <div className="flex flex-col justify-between gap-5">
                        {/* Information */}
                        <div className="grid">
                            <div
                                className={`col-start-1 row-start-1 ${flipped ? "" : "invisible"}`}
                                aria-hidden={!flipped}
                            >
                                <p className="toy-title">Services</p>
                                <ServiceLightTable services={serviceStatus} />
                            </div>
                            <div
                                className={`col-start-1 row-start-1 ${flipped ? "invisible" : ""}`}
                                aria-hidden={flipped}
                            >
                                <p className="toy-title">{toy.displayName}</p>
                                <p>{toy.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Navigate button */}
                {includeButton && (
                    <div
                        className={`flex items-center justify-center ${unflip}`}
                    >
                        <LinkWrapper toy={toy}>
                            <button
                                className="glass-dark"
                                content-type="text"
                                set-blur="true"
                            >
                                Enter
                            </button>
                        </LinkWrapper>
                    </div>
                )}
            </div>
        </div>
    );
}
