import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { AppRoutesProps } from "@/shared/types/router";
import { routeConfig } from "../config/routerConfig";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";

const PageLoaderRedesigned = () => (
    <VStack gap="16" style={{ height: "100%" }}>
        <Skeleton width="70%" height={32} border="16px" />
        <Skeleton width="40%" height={20} border="16px" />
        <Skeleton width="50%" height={20} border="16px" />
        <Skeleton width="30%" height={32} border="16px" />
        <Skeleton width="80%" height="40%" border="16px" />
        <Skeleton width="80%" height="40%" border="16px" />
    </VStack>
);

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        // @ts-ignore
        const element = <Suspense fallback={<PageLoaderRedesigned />}>{route.element}</Suspense>;

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
