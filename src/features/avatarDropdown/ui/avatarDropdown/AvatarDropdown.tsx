/* eslint-disable indent */
import { useTranslation } from "react-i18next";
import { Dropdown } from "shared/ui/Popups";
import { classNames } from "shared/lib/classNames/classNames";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from "entities/User";
import classes from "./avatarDropdown.module.scss";

interface avatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = (props: avatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const authData = useSelector(getUserAuthData);
    const isManager = useSelector(isUserManager);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            className={classNames(classes.avatarDropdown, {}, [className])}
            direction="bottom left"
            // по условию добавляем в dropdown ссылку на админку
            items={[
                ...(isAdminPanelAvailable
                    ? [
                          {
                              content: t("Админка"),
                              href: RoutePath.admin_panel,
                          },
                      ]
                    : []),
                {
                    content: t("Профиль"),
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: t("Выйти"),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar src={authData.avatar} size={30} />}
        />
    );
};
