"use client";

import "../globals.css"

import TOYS from "./_lib/toy-data";
import { ToyElement, ToyElementMobile } from "./_components/ToyElement";
import { isMobile } from "../_lib/is-mobile";

export default function Toys() {

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Aenean non sagittis ipsum. Mauris ac nisl a
                        purus viverra posuere vel sit amet lorem.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-between">
                {TOYS.map((t, _) => {
                    return <EvalutatedToyElement key={t.title} toy={t} />;
                })}
            </div>

        </div>
    );
}