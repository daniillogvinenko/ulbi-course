import { Suspense, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { getUserInited, userActions } from "entities/User";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { AppRouter } from "./providers/router";

const App = () => {
    const dispatch = useAppDispatch();

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
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
    );
};

export default App;
