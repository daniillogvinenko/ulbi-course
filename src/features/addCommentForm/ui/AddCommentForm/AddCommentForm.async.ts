import { FC, lazy } from "react";
import { addCommentFormProps } from "./AddCommentForm";

export const AddCommentFormAsync = lazy<FC<addCommentFormProps>>(
    () =>
        new Promise((res) => {
            setTimeout(() => {
                // @ts-ignore
                res(import("./AddCommentForm"));
            }, 1500);
        })
);
