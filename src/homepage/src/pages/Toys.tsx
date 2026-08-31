import "../styles/toy-element.css"

import { useState } from "react";
import TOYS, { type Toy } from "../utils/toy-data";
import { Link } from "react-router";

const thumbnails = import.meta.glob('../assets/toys/*/thumbnail.jpg', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

const demos = import.meta.glob('../assets/toys/*/demo.gif', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

function getThumbnail(title: string) {
    return thumbnails[`../assets/toys/${title}/thumbnail.jpg`];
}

function getDemo(title: string) {
    return demos[`../assets/toys/${title}/demo.gif`];
}

type ToyEmenentProps = {
    toy: Toy;
}

function ToyElement({ toy }: ToyEmenentProps) {
    // Source - https://stackoverflow.com/a/62785130
    // Posted by Arthur Bruel
    // Retrieved 2026-08-31, License - CC BY-SA 4.0
    const [timeout, setModalTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [showDemo, setShowDemo] = useState<boolean>(false);

    const handleMouseEnter = () => {
        timeout && !showDemo && clearTimeout(timeout);
        setModalTimeout(setTimeout(() => {
            setShowDemo(true);
        }, 500));

    }

    const handleMouseLeave = () => {
        timeout && clearTimeout(timeout)
        setShowDemo(false);
    }

    const children = (
        <div className="glass-panel toy-element flex flex-col items-center-safe" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="h-250 w-fit max-h-250 rounded flex justify-center pb-2">
                {/* Show demo gif is there is one */}
                <img className="overflow-clip rounded select-none"
                    height={200}
                    width={250}
                    src={(showDemo && getDemo(toy.title) || getThumbnail(toy.title))}
                    alt={`Thumbnail for the ${toy.title} toy`}
                />

            </div>
            <p className="toy-title text-left w-full pb-1">{toy.title.replace('_', ' ')}</p>
            <p>{toy.description}</p>
        </div>
    );

    return (toy.useReactLink ?? false) ? <Link to={toy.webPath}>{children}</Link> : <a href={toy.webPath}>{children}</a>
}

export default function Toys() {
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
                    return <ToyElement key={t.title} toy={t} />;
                })}
            </div>
        </div>
    );
}