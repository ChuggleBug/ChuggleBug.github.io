

import { ParticlesProvider, Particles } from "@tsparticles/react";
import { useMemo, useCallback} from "react";
import { loadSlim } from "@tsparticles/slim";

import particleOptions from "../utils/particleOptions"

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

export default function ParticleBackground() {
    const particlesLoaded = useCallback(async (container) => {
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