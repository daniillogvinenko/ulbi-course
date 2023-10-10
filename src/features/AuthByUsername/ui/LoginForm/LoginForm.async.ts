import { FC, lazy } from "react";
import { LoginFormProps } from "./LoginForm";

// Когда Webpack сталкивается с таким синтаксисом, он
// автоматически начинает разделять код вашего приложения

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
    () =>
        new Promise((res) => {
            setTimeout(() => {
                // @ts-ignore
                res(import("./LoginForm"));
            }, 1000);
        })
);
