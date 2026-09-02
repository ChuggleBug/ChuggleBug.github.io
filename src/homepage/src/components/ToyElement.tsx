
import { useState } from "react";
import { type Toy } from "../utils/toy-data";
import { Link } from "react-router";
import ClickAwayListener from "@mui/material/ClickAwayListener";

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

export function ToyElement({ toy }: ToyEmenentProps) {
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

    const cardChildren = (
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

    return (toy.useReactLink ?? false) ? <Link to={toy.webPath}>{cardChildren}</Link> : <a href={toy.webPath}>{cardChildren}</a>
}

export function ToyElementMobile({ toy }: ToyEmenentProps) {
    const [flipped, setFlipped] = useState<boolean>(false);
    


    const NavButton = (
        <div className="toy-element-mobile-button p-2">
            {(toy.useReactLink ?? false) ?
                <Link to={toy.webPath}>
                    Start!
                </Link>
                :
                <a href={toy.webPath}>
                    Start!
                </a>}
        </div>
    );

    return (
        <ClickAwayListener onClickAway={() => (setFlipped(false))}>
            <div onClick={() => setFlipped(!flipped)}>
                <div className={`glass-panel toy-element-mobile ${flipped ? 'rotate-y-180 flipped' : ''} flex flex-col items-center-safe`}>
                    <div className={`h-250 w-fit max-h-250 rounded flex justify-center pb-2 ${flipped ? '-rotate-y-180' : ''}`}>
                        {/* Show demo gif is there is one */}
                        <img className="overflow-clip rounded select-none"
                            height={200}
                            width={250}
                            src={(flipped && getDemo(toy.title) || getThumbnail(toy.title))}
                            alt={`Thumbnail for the ${toy.title} toy`}
                        />

                    </div>

                    <div className="h-full w-full toy-element-mobile-content relative">
                        <div className={`${flipped ? 'opacity-0' : 'opacity-100'}`}>
                            <p className="toy-title text-left w-full pb-1">{toy.title.replace('_', ' ')}</p>
                            <p>{toy.description}</p>
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center -rotate-y-180 ${!flipped ? 'opacity-0' : 'opacity-100'}`} inert={!flipped ? true : undefined} onClick={() => setFlipped(true)}>
                            {NavButton}
                        </div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    );
}

