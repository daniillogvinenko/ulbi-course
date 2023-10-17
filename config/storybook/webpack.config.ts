import path from "path";
import webpack, { RuleSetRule, web } from "webpack";
import { buildCssLoader } from "../build/loaders/buildCssLoader";
import { BuildPaths } from "../build/types/config";

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: "",
        entry: "",
        html: "",
        src: path.resolve(__dirname, "..", "..", "src"),
    };
    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push(".ts", ".tsx");
    // тут мы исключаем правило, которое обрабатывает svg, а после пушим вместо него наше собственное правило svgr
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign

    config!.module!.rules = config.module!.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module?.rules?.push({
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
    });

    config!.module!.rules?.push(buildCssLoader(true));

    config!.plugins!.push(
        new webpack.DefinePlugin({
            __IS_DEV__: true,
            // пустая строка, потому что в сторибуке нам никуда не надо передавать запросы
            __API__: JSON.stringify(""),
            __PROJECT__: JSON.stringify("storybook"),
        })
    );

    return config;
};
