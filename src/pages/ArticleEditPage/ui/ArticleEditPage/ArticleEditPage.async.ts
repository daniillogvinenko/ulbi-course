import { lazy } from "react";

// Когда Webpack сталкивается с таким синтаксисом, он
// автоматически начинает разделять код вашего приложения

export const ArticleEditPageAsync = lazy(
    () =>
        new Promise((res) => {
            setTimeout(() => {
                // @ts-ignore
                res(import("./ArticleEditPage"));
            }, 1000);
        })
);
