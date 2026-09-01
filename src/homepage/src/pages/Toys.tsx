import "../styles/toy-element.css"

import TOYS from "../utils/toy-data";
import { ToyElement, ToyElementMobile } from "../components/ToyElement";
import { isMobile } from "react-device-detect";


export default function Toys() {

    // Figure what container to 
    // use since mobile doesnt have mouse
    // and will need some other style
    const EvalutatedToyElement = isMobile ? ToyElementMobile : ToyElement;

    return (
        <div className="flex flex-col gap-5 lg:px-20 md:px-10 px-5 pt-5">
            <div className="w-full">
                <div className="flex glass-panel p-10">
                    <div className="flex-2">
                        <h2>Toys That I've Made</h2>
                        <p className="text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean non sagittis ipsum. Mauris ac nisl a
                            purus viverra posuere vel sit amet lorem.
                        </p>
                    </div>
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