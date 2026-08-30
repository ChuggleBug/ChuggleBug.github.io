
import "../styles/star-control.css"

import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import defaultParticleOptions from '../utils/default-particle';
import { getParticleContainer, setParticleOptions } from '../utils/particle-control';
import { GlassButton } from '../components/GlassContent';
import { FaAngleDown } from "react-icons/fa";
import { type Container, type Particle } from "@tsparticles/engine"
import useWindowDimensions from "../utils/window-dimension";



function handleChangeWrapper(cb: (c: Container, v: number) => void) {
    return (_: React.SyntheticEvent | Event, value: number | number[]) => {
        let c = getParticleContainer();

        if (typeof value === "number" && c) {
            cb(c, value)
        }
    }
}

function applyParticleSpeedFactor(particle: Particle, factor: number) {
    const p = particle as typeof particle & { _dir?: { x: number; y: number } };
    const mag = Math.hypot(particle.velocity.x, particle.velocity.y);

    // Preserve state of particle in the case where factor is 0
    if (mag > 0) {
        // Non-zero current velocity: refresh direction from it, so
        // any bounce-induced changes since the last call aren't lost.
        p._dir = { x: particle.velocity.x / mag, y: particle.velocity.y / mag };
    } else if (!p._dir) {
        // Currently frozen at 0 with nothing captured yet (e.g. a
        // particle spawned while speed was already 0) — synthesize
        // a direction so it isn't permanently stuck.
        const angle = Math.random() * Math.PI * 2;
        p._dir = { x: Math.cos(angle), y: Math.sin(angle) };
    }

    particle.velocity.x = p._dir.x * factor;
    particle.velocity.y = p._dir.y * factor;
}

function applyParticleFlickerFactor(particle: Particle, factor: number) {
    // Basic presence check (shouldn't happen here)
    if (particle.opacity?.velocity === undefined) {
        return
    }

    // Track initial velocity upon first invocation with this particle
    const p = particle as typeof particle & { _base_vel: number };
    if (!p._base_vel) {
        p._base_vel = particle.opacity.velocity;
    }

    particle.opacity.velocity = p._base_vel * factor;
}

export default function Stars() {
    const { width, height } = useWindowDimensions();

    const [flickerRate, setFlickerRate] = useState<number>(1);
    const [starCount, setStarCount] = useState<number>(defaultParticleOptions.particles.number.value);
    const [starSpeed, setStarSpeed] = useState<number>(1);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const appliedFlickerRef = useRef<number>(1);
    const appliedCountRef = useRef<number>(defaultParticleOptions.particles.number.value);
    const appliedSpeedRef = useRef<number>(1);


    // Note: Dev environment triggers a refresh on page entry
    // this does not happen for real build
    useEffect(() => {
        return () => {
            setParticleOptions(defaultParticleOptions);
        }
    }, []);

    const handleToggle = () => {
        setMenuOpen((prev) => !prev);
    }



    const handleSpeed = (container: Container, value: number) => {
        container.particles.filter(() => true).forEach((particle) => {
            applyParticleSpeedFactor(particle, value);
        });

        appliedSpeedRef.current = value;


    };

    const handleFlicker = (container: Container, value: number) => {
        container.particles.filter(() => true).forEach((particle) => {
            applyParticleFlickerFactor(particle, value);
        });

        appliedFlickerRef.current = value;
    }

    const handleCount = (container: Container, value: number) => {
        const diff = Math.abs(appliedCountRef.current - value);

        // Do nothing
        if (diff === 0) {
        }
        // Deleting
        else if (value < appliedCountRef.current) {
            container.particles.removeQuantity(diff);
        }
        else {
            for (let i = 0; i < diff; i++) {
                const pxRatio = container.retina.pixelRatio;
                const position = {
                    x: Math.floor(Math.random() * pxRatio * width),
                    y: Math.floor(Math.random() * pxRatio * height)
                };

                // Make sure to apply to current factors
                const p = container.particles.addParticle(position);
                if (p) {
                    applyParticleSpeedFactor(p, appliedSpeedRef.current);
                    applyParticleFlickerFactor(p, appliedFlickerRef.current);
                }
            }
        }
        appliedCountRef.current = value;
    }

    return (
        <div className={`star-panel-main ${menuOpen ? `` : `closed`}`}>

            {/* Toggle */}
            <div onClick={handleToggle} className={`star-panel-toggle ${menuOpen ? `` : `closed`}`}>
                <GlassButton className="p-2">
                    <div className={`${menuOpen ? `` : `rotate-180`} transition-transform`}>
                        <FaAngleDown size={30} />
                    </div>
                </GlassButton>
            </div>

            {/* Controls */}
            <div className={`glass-panel star-panel-control ${menuOpen ? `` : `closed`}`} inert={!menuOpen ? true : undefined}>
                <Box sx={{ width: 200 }}>
                    <div>
                        <p>Star Twinkle: x{flickerRate}</p>
                        <Slider
                            aria-label='star-flicker'
                            value={flickerRate}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(_, value) => setFlickerRate(value)}
                            onChangeCommitted={handleChangeWrapper(handleFlicker)}
                        />
                    </div>
                    <div>
                        <p>Star Count: {starCount}</p>
                        <Slider
                            aria-label='star-count'
                            value={starCount}
                            min={0}
                            max={2000}
                            step={250}
                            onChange={(_, value) => setStarCount(value)}
                            onChangeCommitted={handleChangeWrapper(handleCount)}
                        />
                    </div>
                    <div>
                        <p>Star Speed: x{starSpeed}</p>
                        <Slider
                            aria-label='star-movement'
                            value={starSpeed}
                            min={0}
                            max={10}
                            onChange={(_, value) => setStarSpeed(value)}
                            onChangeCommitted={handleChangeWrapper(handleSpeed)}
                        />
                    </div>
                </Box>
            </div>
        </div >
    );
}