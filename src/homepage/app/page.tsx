import Image from "next/image";
import homepageImage from "../public/homepage-image.gif";
import StarCover from "./_components/StarCover";
import "./globals.css";

export default function Home() {

  return (
    <div className="absolute inset-0 flex">
      <div className="m-auto w-fit h-fit">
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
            <div className="overflow-hidden rounded w-[500px] h-[300px] flex items-center justify-center">
              <Image
                className="w-full h-full object-contain"
                src={homepageImage}
                alt="Homepage Image"
                loading="eager"
              />
            </div>
          </div>
        </StarCover>
      </div>
    </div>
  );
}
