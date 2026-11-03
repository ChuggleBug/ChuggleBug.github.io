import Image from "next/image";

// Assets are served statically from public/toys/<title>/
function getThumbnail(title: string) {
    return `/toys/${title}/thumbnail.jpg`;
}

function getDemo(title: string) {
    return `/toys/${title}/demo.mp4`;
}

type ToyImageProps = {
    name: string;
    showDemo: boolean;
};

// Shows the thumbnail, or the demo video when showDemo is set.
export function ToyImage({ name: title, showDemo }: ToyImageProps) {
    return (
        <div className="relative aspect-5/4">
            <Image
                className="toy-image"
                height={200}
                width={250}
                src={getThumbnail(title)}
                alt={`Thumbnail for the ${title} toy`}
                loading="eager"
            />
            {showDemo && (
                <video
                    className="absolute inset-0 toy-image "
                    height={200}
                    width={250}
                    src={getDemo(title)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    content-type={`Demo for the ${title} toy`}
                />
            )}
        </div>
    );
}
