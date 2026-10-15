import { useEffect, useState } from "react";

export type WebGLCheckState =
    "checking" | "supported" | "disabled" | "not-supported";

export type WebGLState = {
    suported: boolean;
    checkState: WebGLCheckState;
};

function detectWebGL(): Exclude<WebGLCheckState, "checking"> {
    if (!window.WebGLRenderingContext) {
        return "not-supported";
    }

    try {
        const canvas = document.createElement("canvas");
        const gl =
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");
        return gl ? "supported" : "disabled";
    } catch {
        return "not-supported";
    }
}

export function useWebGL(): WebGLState {
    const [checkState, setCheckState] = useState<WebGLCheckState>("checking");

    useEffect(() => {
        async function f() {
            setCheckState(detectWebGL());
        }
        f();
    }, []);

    return {
        suported: checkState === "supported",
        checkState,
    };
}
