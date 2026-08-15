

import { ParticlesProvider, Particles } from "@tsparticles/react";
import { useMemo, useCallback} from "react";
import { loadSlim } from "@tsparticles/slim";
import { type Engine, type Container } from "@tsparticles/engine";

import particleOptions from "../utils/particleOptions"

const particlesInit = async (engine: Engine) => {
  await loadSlim(engine);
};

export default function ParticleBackground() {
    const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("Particles container loaded", container);
  }, []);

  const options = useMemo(
    () => (particleOptions),
    [],
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    </ParticlesProvider>
  );
}