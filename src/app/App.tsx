import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { getUserInited, initAuthData } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";
import { useAppToolbar } from "./lib/useAppToolbar";

const App = () => {
    const dispatch = useAppDispatch();
    const toolbar = useAppToolbar();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <div id="app" className={classNames("app_redesigned", {}, [])}>
                <ToggleFeatures feature="isAppRedesigned" off={<PageLoader />} on={<AppLoaderLayout />} />
            </div>
        );
    }
    return (
        <div id="app" className={classNames("app_redesigned", {}, [])}>
            <Suspense fallback="">
                <MainLayout header={<Navbar />} content={<AppRouter />} sidebar={<Sidebar />} toolbar={toolbar} />
            </Suspense>
        </div>
    );
};

export default App;
