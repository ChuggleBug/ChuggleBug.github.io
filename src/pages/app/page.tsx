
import Image from "next/image";

export default function Home() {

  return (
    <div className="w-full h-full flex justify-center items-center py-10 justify-evenly">

      {/* Main body */}
      <div className="h-full flex flex-col gap-5">
        <h1 className="text-2xl font-bold">There isnt much here now</h1>
        <div>
          <p>Go click the blog button</p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-app-black p-8 rounded shadow gap-2">
        <a href='https://tenor.com/vRj2a7yfTXB.gif'>
          <Image
            className="rounded"
            src="/fish_spin.gif"
            alt="Spinning fish GIF"
            width={500}
            height={500}
            loading="eager"
            unoptimized
          />
        </a>
        <span className="text-light font-bold">Fish :)</span>
      </div>
    </div>
  );
}
