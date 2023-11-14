import { UserRole, getUserAuthData, getUserRoles } from "entities/User";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface RequireAuthProps {
    children: JSX.Element;
    // это роли, которые необходимы для доступа к данному маршруту (если пустой - доступ для всех ролей)
    roles?: UserRole[];
}

// если пользователь не авторизован, то делаем редирект на mainPage
const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    // делаем проверку, есть ли у пользователя все необходимые роли, для посещения данной страницы
    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        // если хотя бы одна роль авторизованного юзера совпадет со списком необходимых ролей для доступа к этому маршруту, то вернется true
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    // если пользователь не авторизован, то делаем редирект на главную
    if (!auth) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        );
    }

    // если у пользователя нету нужных ролей, то делаем редирект на forbiddenPage
    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={RoutePath.forbidden}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default RequireAuth;
