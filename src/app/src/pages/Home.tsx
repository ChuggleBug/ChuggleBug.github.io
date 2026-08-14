
import fishSpin from "../assets/fish_spin.gif"

export default function Home() {
    return (
        <div className="h-full bg-background flex flex-col-reverse md:flex-row items-center justify-center gap-10 p-5">
            <div className="text-white max-w-100 md:max-w-175 text-justify md:pr-25">
                <h1>Welcome</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi 
                    iaculis, quam eu faucibus aliquet, mauris tellus mollis risus, 
                    et lobortis massa enim eu orci. Integer eget porttitor est
                </p>
            </div>
            <img
                className="rounded"
                src={fishSpin}
                alt="Spinning fish GIF"
                width={500}
                height={500}
                loading="eager"
            />
        </div>
    );
}