"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback, useMemo } from "react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defaultParticleOptions } from "../_lib/default-particle";

// Must be defined outside the component: ParticlesProvider requires a stable init callback.
const particlesInit = async (engine: Engine) => {
  await loadSlim(engine);
};

export default function ParticlesBackground() {
  const particlesLoaded = useCallback(async (container?: Container) => {
  }, []);

  const options: ISourceOptions = useMemo(() => {
    return defaultParticleOptions}, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    </ParticlesProvider>
  );
}
