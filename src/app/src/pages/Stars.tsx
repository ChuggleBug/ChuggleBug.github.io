
import "../styles/star-control.css"

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import defaultParticleOptions from '../utils/default-particle';
import { setParticleOptions } from '../utils/particle-store';
import { GlassButton } from '../components/GlassContent';
import { FaAngleDown } from "react-icons/fa";


function buildOptions(flickerRate: number, starCount: number, starMovement: number) {
    const opt = structuredClone(defaultParticleOptions);
    opt.particles.opacity.animation.speed *= flickerRate;
    opt.particles.number.value = starCount;
    opt.particles.move.speed = {
        min: opt.particles.move.speed.min * starMovement,
        max: opt.particles.move.speed.max * starMovement
    }

    return opt;
}

export default function Stars() {
    const [flickerRate, setFlickerRate] = useState<number>(1);
    const [starCount, setStarCount] = useState<number>(defaultParticleOptions.particles.number.value);
    const [starMovement, setStarMovement] = useState<number>(1);
    const [menuOpen, setMenuOpen] = useState<boolean>(true);

    useEffect(() => {
        setParticleOptions(buildOptions(flickerRate, starCount, starMovement));
    }, [flickerRate, starCount, starMovement]);

    useEffect(() => {
        return () => {
            setParticleOptions(defaultParticleOptions)
        }
    }, []);

    const handleToggle = () => {
        setMenuOpen((prev) => !prev);
    }

    const handleChange = (cb: (v: number) => void) => {
        return (_: Event, value: number | number[], __: number) => {
            if (typeof value === "number") {
                cb(value)
            }
        }
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
                            onChange={handleChange(setFlickerRate)}
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
                            onChange={handleChange(setStarCount)}
                        />
                    </div>
                    <div>
                        <p>Star Movement: x{starMovement}</p>
                        <Slider
                            aria-label='star-movement'
                            value={starMovement}
                            min={0}
                            max={10}
                            onChange={handleChange(setStarMovement)}
                        />
                    </div>
                </Box>
            </div>
        </div >
    );
}