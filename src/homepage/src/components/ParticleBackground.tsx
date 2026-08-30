

import { ParticlesProvider, Particles } from "@tsparticles/react";
import { useCallback, useSyncExternalStore } from "react";
import { loadSlim } from "@tsparticles/slim";
import { type Engine, type Container } from "@tsparticles/engine";

import { getParticleOptions, setParticlesContainer, subscribeParticleOptions } from "../utils/particle-control";

const particlesInit = async (engine: Engine) => {
  await loadSlim(engine);
};

export default function ParticleBackground() {
  const options = useSyncExternalStore(subscribeParticleOptions, getParticleOptions);

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      setParticlesContainer(container);
    }
  }, []);


  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    </ParticlesProvider>
  );
}