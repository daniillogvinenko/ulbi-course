import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSvgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        react(),
        vitePluginSvgr({
            exportAsDefault: true,
        }),
    ],
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify("http://localhost:8000"),
        // __API__: JSON.stringify("https://express-js-test.vercel.app"),
        __PROJECT__: JSON.stringify("frontend"),
    },
});
