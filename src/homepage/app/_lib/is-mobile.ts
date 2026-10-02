
// Wrapper for react-device-detect (since it does not work with next)
export const isMobile = typeof window !== "undefined" &&
    window.matchMedia('(pointer: coarse) and (hover: none)').matches;
