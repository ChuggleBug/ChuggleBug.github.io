
import fishSpin from "../assets/fish_spin.gif";
import StarCover from "../components/StarCover";


export default function Home() {
    return (
        <div className="absolute inset-0 w-full flex flex-col gap-5">
            <div className="m-auto w-fit h-fit flex flex-col gap-2">
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
            </div>
        </div >
    );
}