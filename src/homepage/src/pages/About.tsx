
import "../styles/glass-button.css";

export default function About() {
    return (
        <div className="flex flex-col">
            <div className="w-full lg:px-20 md:px-10 p-5">
                <div className="flex glass-panel p-10">
                    <div className="flex-2">
                        <h2>About</h2>
                        <p className="text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean non sagittis ipsum. Mauris ac nisl a
                            purus viverra posuere vel sit amet lorem. Morbi interdum
                            iaculis eros. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Sed nulla leo, mollis ac sem ut, vehicula ullamcorper
                            nibh. Pellentesque congue felis nec luctus mollis.
                            Nullam sed tellus gravida, ultrices sapien nec,
                            iaculis dui.

                            ... Something something, enjoy the stars on this page
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}