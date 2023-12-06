import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { PageLoader } from "@/widgets/PageLoader";
import { AppRoutesProps } from "@/shared/types/router";
import { routeConfig } from "../config/routerConfig";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

        return (
            <Route
                key={route.path}
                path={route.path}
                // если элемент (маршрут) authOnly -> оборачиваем его в RequireAuth, иначе, просто возвращаем элемент
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
