

/*
 * Structure for toys:
 * title: Title of the toy card, with spaces replaced with "_"
 *  - Note: A thumbnail.jpg and demo.gif should be provided under "assets/toys"
 *  - Note: Both of these assets should be around 250px x 200px
 * description: A short statement about what this "toy" is
 * webPath: The path, relative to root
 * useReactLink: use <Link> or <a>
 *  - Note: In most cases <a> works fine. <Link> needs to be used if
 *      webPath points to somewhere that is managed by the react homepage
*/
export type Toy = {
    title: string,
    description: string,
    webPath: string,
    useReactLink?: boolean
};

export const TOYS: ReadonlyArray<Toy> = [
    {
        title: "Star_Controls",
        description: "I wanted to see how these \"stars\" would look like with different configurations, so I made a control panel.",
        webPath: "/stars",
        useReactLink: true,
    },
    // {
    //     title: "WikiGraph",
    //     description: "",
    //     webPath: "/app/wikigraph",
    // },
];

export default TOYS;