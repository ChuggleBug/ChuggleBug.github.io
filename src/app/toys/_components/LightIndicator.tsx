import "@/app/globals.css";
import { type Status } from "@/app/_lib/api";

export type LightIndicatorProps = {
    size?: number;
    status: Status;
};

export function LightIndicator({ size = 12, status }: LightIndicatorProps) {
    return (
        <div
            className={`traffic-light cursor-default`}
            style={{ height: size, width: size }}
            light-status={status}
        />
    );
}
