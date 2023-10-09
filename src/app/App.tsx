import { Suspense, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import { Counter } from "entities/Counter/ui/Counter";
import { useDispatch } from "react-redux";
import { userActions } from "entities/User";
import { AppRouter } from "./providers/router";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData);
    }, [dispatch]);

    return (
        <div className={classNames("app", {}, [])}>
            <Suspense fallback={<PageLoader />}>
                <Navbar />
                <Counter />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
