
import fishSpin from "../assets/fish_spin.gif";
import { GlassButton } from "../components/GlassContent";
import { Link } from "react-router";


import "../App.css";

type StarCoverProps = {
    children: React.ReactNode;
};

function StarCover({ children }: StarCoverProps) {
    return (
        <div className="h-full w-fit flex flex-col justify-center items-center">
            <div className="flex star-cover">
                {children}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        // Take up all the space
        <div className="h-full w-full flex flex-col justify-center items-center">
            <StarCover>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 p-5">
                    <div className="text-white max-w-100 md:max-w-175 text-justify md:pr-25 w-fit">
                        <h1>Welcome</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                            iaculis, quam eu faucibus aliquet, mauris tellus mollis risus,
                            et lobortis massa enim eu orci. Integer eget porttitor est
                        </p>
                    </div>
                    <div className="overflow-hidden rounded max-w-[500px] max-h-[300px]">
                        <img
                            src={fishSpin}
                            alt="Spinning fish GIF"
                            width={500}
                            height={300}
                            loading="eager"
                        />
                    </div>
                </div>
            </StarCover>

            <div className="w-full absolute inset-x-0 bottom-0 text-white pb-5 flex items-center justify-center">
                <Link to="/stars">
                    <GlassButton className="p-3">
                        Click to see the stars
                    </GlassButton>
                </Link>
            </div>

        </div >
    );
}