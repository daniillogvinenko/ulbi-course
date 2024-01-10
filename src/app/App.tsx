import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { getUserInited, initAuthData } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { ToggleFeatures } from "@/shared/lib/features";
import { MainLayout } from "@/shared/layouts/MainLayout";

const App = () => {
    const dispatch = useAppDispatch();

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) return <PageLoader />;
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className={classNames("app", {}, [])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            {/* Урок 47, это надо, чтобы роутер отрисовывался после инициализации данных о пользователе (initAuthData) */}
                            {inited && <AppRouter />}
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div className={classNames("app_redesigned", {}, [])}>
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={<div>TOOLBAR</div>}
                        />
                    </Suspense>
                </div>
            }
        />
    );
};

export default App;
