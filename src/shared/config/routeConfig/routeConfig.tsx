import { AboutPageAsync } from "pages/AboutPage";
import { MainPageAsync } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    PROFILE = "profile",
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ABOUT]: "/about",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.NOT_FOUND]: "*",
};

export const RouteElements: Record<AppRoutes, React.ReactNode> = {
    [AppRoutes.MAIN]: <MainPageAsync />,
    [AppRoutes.ABOUT]: <AboutPageAsync />,
    [AppRoutes.PROFILE]: <ProfilePage />,
    [AppRoutes.NOT_FOUND]: <NotFoundPage />,
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
        path: RoutePath.profile,
        element: RouteElements.profile,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: RouteElements.not_found,
    },
};
