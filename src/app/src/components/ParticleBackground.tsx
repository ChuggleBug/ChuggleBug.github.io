

import { ParticlesProvider, Particles } from "@tsparticles/react";
import { useCallback, useSyncExternalStore } from "react";
import { loadSlim } from "@tsparticles/slim";
import { type Engine, type Container } from "@tsparticles/engine";

import { getParticleOptions, subscribeParticleOptions } from "../utils/particle-store";

const particlesInit = async (engine: Engine) => {
  await loadSlim(engine);
};

export default function ParticleBackground() {
  const particlesLoaded = useCallback(async (_?: Container) => {}, []);

  const options = useSyncExternalStore(subscribeParticleOptions, getParticleOptions);

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    </ParticlesProvider>
  );
}