// Do not add "use client" here
// add it in the file that uses this
// in general, this is used when a cursor
// is not availible, or just for performance,
// not for css media

import { useSyncExternalStore } from "react";

// Wrapper for react-device-detect (since it does not work with next)
const MOBILE_QUERY = '(pointer: coarse) and (hover: none)';

export const isMobile = typeof window !== "undefined" &&
    window.matchMedia(MOBILE_QUERY).matches;

// Hydration-safe variant for values that end up in rendered output:
// reports false during SSR/hydration, then the real value after mount
export function useIsMobile() {
    return useSyncExternalStore(
        (onChange) => {
            const mql = window.matchMedia(MOBILE_QUERY);
            mql.addEventListener("change", onChange);
            return () => mql.removeEventListener("change", onChange);
        },
        () => window.matchMedia(MOBILE_QUERY).matches,
        () => false
    );
}
