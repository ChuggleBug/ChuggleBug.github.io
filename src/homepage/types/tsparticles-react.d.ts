// @tsparticles/react@4.4.0 points "types" at ./lib/index.d.ts, which isn't published,
// so mirror the declarations that ship at the package root. Remove once upstream fixes it.
declare module "@tsparticles/react" {
  import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
  import type { CSSProperties, FC, PropsWithChildren } from "react";

  export interface IParticlesProps {
    id?: string;
    options?: ISourceOptions;
    url?: string;
    style?: CSSProperties;
    className?: string;
    particlesLoaded?: (container?: Container) => Promise<void> | void;
  }

  export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void>;

  export interface IParticlesProviderProps extends PropsWithChildren {
    init: ParticlesPluginRegistrar;
  }

  export const Particles: FC<IParticlesProps>;
  export const ParticlesProvider: FC<IParticlesProviderProps>;
  export function useParticlesProvider(): { loaded: boolean };
  export default Particles;
}
