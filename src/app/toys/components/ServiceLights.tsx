import { useId, useState } from "react";
import { type ProjectHealth } from "@/app/lib/api";
import { LightIndicator } from "@/app/toys/components/LightIndicator";

type ServiceLightsProps = {
    services?: ProjectHealth | null;
};

function serviceTypePrettyName(type: string) {
    if (type === "web") {
        return "Website";
    } else if (type === "api") {
        return "API";
    }
    return type;
}

export function ServiceLightsRow({ services = null }: ServiceLightsProps) {
    const id = useId();
    const [hoveredStatusType, setHoveredStatusType] = useState<string | null>(
        null,
    );

    let serviceMesssage = "Fetching Services...";
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

export function ServiceLightTable({ services = null }: ServiceLightsProps) {
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
                        className="flex flex-row items-center gap-2"
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
