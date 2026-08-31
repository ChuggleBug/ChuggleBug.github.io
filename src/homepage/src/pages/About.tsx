
import "../styles/glass-button.css";

export default function About() {
    return (
        <div className="h-full flex flex-col overflow-y-auto">
            <div className="m-auto w-full h-fit lg:p-20 p-5">
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