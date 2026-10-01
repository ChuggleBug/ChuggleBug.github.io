"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback, useMemo } from "react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

// Must be defined outside the component: ParticlesProvider requires a stable init callback.
const particlesInit = async (engine: Engine) => {
  await loadSlim(engine);
};

export default function ParticlesBackground() {
  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("Particles loaded", container);
  }, []);

  const options: ISourceOptions = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    return {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: "#0C090A" },
      fpsLimit: isMobile ? 30 : 60,
      detectRetina: !isMobile,
      particles: {
        number: { value: isMobile ? 250 : 500 },
        shape: { type: "square" },
        opacity: {
          value: { min: 0, max: 1 },
          animation: { enable: true, speed: 0.5, sync: false, startValue: "random", destroy: "none" },
        },
        paint: {
          fill: {
            enable: true,
            color: { value: ["#FFFFFF", "#CFE8FF", "#DFEEFF", "#FFF6D9", "#FFE9C7"] },
          },
        },
        size: { value: { min: 2, max: 6 } },
        move: { enable: true, speed: { min: 0.05, max: 0.2 } },
        links: { enable: false },
      },
      interactivity: {
        events: { onHover: { enable: false }, onClick: { enable: false } },
      },
    };
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    </ParticlesProvider>
  );
}
