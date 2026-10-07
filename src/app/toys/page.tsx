"use client";

import "../globals.css"

import TOYS from "./_lib/toy-data";
import { ToyElement, ToyElementMobile } from "./_components/ToyElement";
import { useIsMobile } from "../_lib/is-mobile";

export default function Toys() {
    const isMobile = useIsMobile();

    // Figure what container to 
    // use since mobile doesnt have mouse
    // and will need some other style.
    const EvalutatedToyElement = isMobile ? ToyElementMobile : ToyElement;

    return (
        <div className="flex flex-col gap-5 px-5 lg:px-20 py-10">
            <div className="glass-panel-content">
                <div>
                    <h2>Toys That I've Made</h2>
                    <p>
                        To me, a "toy" is some web app that doesn't really do much but is complete enough to be
                        shared publicly to show something off. Go check out the ones I have shared here.
                        
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-between">
                {TOYS.map((t, _) => {
                    return <EvalutatedToyElement key={t.title} toy={t}/>;
                })}
            </div>

        </div>
    );
}