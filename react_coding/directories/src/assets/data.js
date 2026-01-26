export const directories = {
    id: "root",
    name: "root",
    type: "folder",
    children: [
        {
            id: "1",
            name: "src",
            type: "folder",
            children: [
                { id: "2", name: "App.js", type: "file" },
                { id: "3", name: "index.js", type: "file" },
                { id: "4", name: "styles.css", type: "file" },
            ],
        },
        {
            id: "5",
            name: "public",
            type: "folder",
            children: [
                { id: "6", name: "index.html", type: "file" },
                { id: "7", name: "favicon.ico", type: "file" },
            ],
        },
        {
            id: "8",
            name: "package.json",
            type: "file",
        },
        {
            id: "9",
            name: "node_modules",
            type: "folder",
            children: [],
        },
    ],
};
