import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        extensions: [".tsx", ".ts", ".js"],
        // про вот это я ничего не понял, надо погуглить (связано с абсолютными путями)
        preferAbsolute: true,
        modules: [options.paths.src, "node_modules"],
        mainFiles: ["index"],
        alias: {
            "@": options.paths.src,
        },
    };
}
