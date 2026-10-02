
import { defaultParticleOptions, type ParticleOptions } from "./default-particle";
import { type Container } from "@tsparticles/engine"

type Listener = () => void;

let particleOptions: ParticleOptions = defaultParticleOptions;
const listeners = new Set<Listener>();

export function getParticleOptions(){
    return particleOptions;
}

export function setParticleOptions(opt: ParticleOptions) {
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