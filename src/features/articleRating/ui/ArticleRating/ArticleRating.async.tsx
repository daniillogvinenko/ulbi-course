import { FC, Suspense, lazy } from "react";
import { ArticleRatingProps } from "./ArticleRating";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

// Когда Webpack сталкивается с таким синтаксисом, он
// автоматически начинает разделять код вашего приложения

export const ArticleRatingLazy = lazy(() => import("./ArticleRating"));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    <Suspense fallback={<Skeleton width="100%" height={140} />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
