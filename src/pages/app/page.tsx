
import Image from "next/image";

export default function Home() {

  return (
    <div className="h-full bg-background flex flex-col-reverse md:flex-row items-center justify-center gap-10 p-5"> 
      <div className="text-white max-w-100 text-justify">
        <h1>Welcome</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, quam eu faucibus aliquet, mauris tellus mollis risus, et lobortis massa enim eu orci. Integer eget porttitor est</p>
      </div>
        <Image
            className="rounded"
            src="/fish.webp"
            alt="Spinning fish GIF"
            width={500}
            height={500}
            loading="eager"
            unoptimized
        />
    </div>

  );
}
