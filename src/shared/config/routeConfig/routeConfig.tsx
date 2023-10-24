import { AboutPage } from "pages/AboutPage";
import { ArticlesDetailsPage } from "pages/ArticlesDetailsPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    PROFILE = "profile",
    ARTICLES = "articles",
    ARTICLE_DETAILS = "article_details",
    // last
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ABOUT]: "/about",
    [AppRoutes.PROFILE]: "/profile/", // + :id
    [AppRoutes.NOT_FOUND]: "*",
    [AppRoutes.ARTICLES]: "/articles",
    [AppRoutes.ARTICLE_DETAILS]: "/articles/", // + :id
};

export const RouteElements: Record<AppRoutes, React.ReactNode> = {
    [AppRoutes.MAIN]: <MainPage />,
    [AppRoutes.ABOUT]: <AboutPage />,
    [AppRoutes.PROFILE]: <ProfilePage />,
    [AppRoutes.NOT_FOUND]: <NotFoundPage />,
    [AppRoutes.ARTICLES]: <ArticlesPage />,
    [AppRoutes.ARTICLE_DETAILS]: <ArticlesDetailsPage />,
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: RouteElements.about,
    },
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: RouteElements.main,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: RouteElements.profile,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: RouteElements.not_found,
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: RouteElements.articles,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:id`,
        element: RouteElements.article_details,
        authOnly: true,
    },
};
