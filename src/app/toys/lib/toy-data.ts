/*
 * Structure for toys:
 * internalName: The name used by internal services such as API status checks
 *  - Note: A thumbnail.jpg and demo.gif should be provided under "public/toys/<title>"
 *  - Note: Both of these assets should be around 250px x 200px
 * displayName: Title of the toy card, with spaces replaced with "_"
 * description: A short statement about what this "toy" is
 * webPath: The path, relative to root
 * useReactLink: use <Link> or <a>
 *  - Note: In most cases <a> works fine. <Link> needs to be used if
 *      webPath points to somewhere that is managed by the react homepage
 */
export type Toy = {
    internalName: string;
    displayName: string;
    description: string;
    webPath: string;
    useReactLink?: boolean;
};

export const TOYS: ReadonlyArray<Toy> = [
    {
        internalName: "stars",
        displayName: "Star Controls",
        description:
            'I wanted to see how these "stars" would look like with different configurations, so I made a control panel.',
        webPath: "/stars",
        useReactLink: true,
    },
    {
        internalName: "wikigraph",
        displayName: "WikiGraph",
        description:
            "Wikipedia is a highly connected article database, so I made it into a explorable graph.",
        webPath: "/app/wikigraph",
    },
];

export default TOYS;
