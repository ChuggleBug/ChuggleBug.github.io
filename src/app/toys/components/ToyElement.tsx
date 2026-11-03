"use client";

import React, { useState, useId } from "react";
import { type Toy } from "@/app/toys/lib/toy-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { type ProjectHealth } from "@/app/lib/api";
import { LightIndicator } from "@/app/toys/components/LightIndicator";
import { FaInfo } from "react-icons/fa";

// Assets are served statically from public/toys/<title>/
function getThumbnail(title: string) {
    return `/toys/${title}/thumbnail.jpg`;
}

function getDemo(title: string) {
    return `/toys/${title}/demo.mp4`;
}

type ToyImageProps = {
    name: string;
    showDemo: boolean;
};

// Shows the thumbnail, or the demo video when showDemo is set.
function ToyImage({ name: title, showDemo }: ToyImageProps) {
    return (
        <div className="relative aspect-5/4">
            <Image
                className="object-cover w-full h-full overflow-clip rounded select-none"
                height={200}
                width={250}
                src={getThumbnail(title)}
                alt={`Thumbnail for the ${title} toy`}
                loading="eager"
            />
            {showDemo && (
                <video
                    className="absolute inset-0 w-full h-full object-cover overflow-clip rounded select-none"
                    height={200}
                    width={250}
                    src={getDemo(title)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    content-type={`Demo for the ${title} toy`}
                />
            )}
        </div>
    );
}

function serviceTypePrettyName(type: string) {
    if (type === "web") {
        return "Website";
    } else if (type === "api") {
        return "API";
    }
    return type;
}

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

type ServiceLightsProps = {
    services?: ProjectHealth | null;
};

function ServiceLightsRow({ services = null }: ServiceLightsProps) {
    const id = useId();
    const [hoveredStatusType, setHoveredStatusType] = useState<string | null>(
        null,
    );

    let serviceMesssage = "No Services Reported";
    if (services) {
        const serviceNames = Object.keys(services).sort();
        const serviceCount = serviceNames.length;
        if (serviceCount > 0) {
            const upCount = serviceNames.filter(
                (k) => services[k].status === "ok",
            ).length;
            if (upCount === 0) {
                serviceMesssage = "None Up";
            } else if (upCount < serviceCount) {
                serviceMesssage = "Some Up";
            } else {
                serviceMesssage = "All Up";
            }
        }
    }

    if (hoveredStatusType && services) {
        const status = services[hoveredStatusType].status ?? "unknown";
        serviceMesssage = `${serviceTypePrettyName(hoveredStatusType)}: ${status}`;
    }

    return (
        <div
            className="flex flex-row gap-2 items-center"
            onMouseLeave={() => setHoveredStatusType(null)}
        >
            {Object.keys(services ?? {})
                .sort()
                .map((k) => {
                    const status = services ? services[k].status : "unknown";
                    return (
                        <div
                            className="relative"
                            key={`${id}-${k}`}
                            onMouseEnter={() => {
                                setHoveredStatusType(k);
                            }}
                        >
                            <LightIndicator size={18} status={status} />
                        </div>
                    );
                })}
            <p>{serviceMesssage}</p>
        </div>
    );
}

function ServiceLightTable({ services = null }: ServiceLightsProps) {
    const id = useId();
    const serviceNames = Object.keys(services ?? {}).sort();

    if (!services || serviceNames.length === 0) {
        return <p>No Services Reported</p>;
    }

    return (
        <div className="flex flex-col gap-2">
            {Object.keys(services).map((k) => {
                const status = services ? services[k].status : "unknown";
                return (
                    <div
                        className="relative flex flex-row items-center gap-2"
                        key={`${id}-${k}`}
                    >
                        <LightIndicator size={18} status={status} />
                        <p>{`${serviceTypePrettyName(k)}: ${status}`}</p>
                    </div>
                );
            })}
        </div>
    );
}

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

    const showDemo = flipped || hoverTimeout;

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
                className={`glass toy-element grid grid-cols-1 grid-rows-[0.25fr_3fr] gap-2 ${flipped ? "rotate-y-180" : ""}`}
            >
                {/* Service and Info */}
                <div
                    className={`relative w-full h-fit flex flex-row items-center justify-between ${unflip}`}
                >
                    <div
                        className={flipped ? "invisible" : ""}
                        aria-hidden={flipped}
                    >
                        <ServiceLightsRow services={serviceStatus} />
                    </div>
                    <button
                        className="glass-dark w-fit! absolute p-2 -right-2 -top-2"
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

                <div
                    className={`grid sm:grid-cols-[1.25fr_1fr] md:grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-5 ${unflip}`}
                >
                    {/* Image */}
                    <div className="flex w-full h-full items-start justify-center rounded">
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
                                <p className="toy-title text-left w-full pb-1">
                                    Services
                                </p>
                                <ServiceLightTable services={serviceStatus} />
                            </div>
                            <div
                                className={`col-start-1 row-start-1 ${flipped ? "invisible" : ""}`}
                                aria-hidden={flipped}
                            >
                                <p className="toy-title text-left w-full pb-1">
                                    {toy.displayName}
                                </p>
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
