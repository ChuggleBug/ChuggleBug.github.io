import { defaultParticleOptions } from "@/app/lib/default-particle";
import { ISourceOptions, type Container } from "@tsparticles/engine";

type Listener = () => void;

let particleOptions: ISourceOptions = defaultParticleOptions;
const listeners = new Set<Listener>();

export function getParticleOptions() {
    return particleOptions;
}

export function setParticleOptions(opt: ISourceOptions) {
    particleOptions = structuredClone(opt);
    listeners.forEach((listener) => listener());
}

export function subscribeParticleOptions(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

let particleContainer: Container | null = null;

export function getParticleContainer(): Container | null {
    return particleContainer;
}

export function setParticlesContainer(container: Container | null) {
    particleContainer = container;
}
