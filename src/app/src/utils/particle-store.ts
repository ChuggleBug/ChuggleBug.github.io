
import { defaultParticleOptions, type ParticleOptions } from "./default-particle";

type Listener = () => void;

let currentOptions = defaultParticleOptions;
const listeners = new Set<Listener>();

export function getParticleOptions() {
    return currentOptions;
}

export function setParticleOptions(options: ParticleOptions) {
    currentOptions = options;
    listeners.forEach((l) => l());
}

export function subscribeParticleOptions(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}