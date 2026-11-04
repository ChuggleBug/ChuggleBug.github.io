"use client";

import TOYS from "@/app/toys/lib/toy-data";
import { ToyElement } from "@/app/toys/components/ToyElement";
import { useIsMobile } from "@/app/lib/useIsMobile";
import { useEffect, useState } from "react";
import { getAPIStatus, getAPIStatusEvents, StatusReport } from "@/app/lib/api";

export default function Toys() {
    const isMobile = useIsMobile();

    const [apiStatus, setApiStatus] = useState<StatusReport | null>(null);

    useEffect(() => {
        // First time fetch
        async function fetch_data() {
            const status = await getAPIStatus();
            setApiStatus(status);
        }
        fetch_data();

        const eventSource = getAPIStatusEvents();

        eventSource.addEventListener("update", (event: MessageEvent) => {
            const newData = JSON.parse(event.data) as StatusReport;
            handleUpdate(newData);
        });

        return () => {
            eventSource.close();
        };
    }, []);

    const handleUpdate = (updated: StatusReport) => {
        setApiStatus((prev) => {
            if (!prev) {
                return prev;
            }
            const knownUpdates: StatusReport = {};
            for (const k of Object.keys(updated)) {
                if (k in prev) {
                    knownUpdates[k] = updated[k];
                }
            }
            return { ...prev, ...knownUpdates };
        });
    };

    return (
        <div className="flex flex-col gap-5 px-5 lg:px-20 py-10">
            <div className="glass-content">
                <div>
                    <h2>Toys That I've Made</h2>
                    <p>
                        To me, a "toy" is some web app that doesn't really do
                        much but is complete enough to be shared publicly to
                        show something off. Go check out the ones I have shared
                        here.
                    </p>
                </div>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-between"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-between">
                {TOYS.map((t) => {
                    return (
                        <ToyElement
                            key={t.displayName}
                            toy={t}
                            includeButton={isMobile}
                            serviceStatus={
                                apiStatus ? apiStatus[t.internalName] : null
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
