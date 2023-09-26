import { lazy } from "react";

// Когда Webpack сталкивается с таким синтаксисом, он автоматически
// начинает разделять код вашего приложения
export const MainPageAsync = lazy(
    () =>
        new Promise((res) => {
            setTimeout(() => {
                // @ts-ignore
                res(import("./MainPage"));
            }, 1000);
        })
);
