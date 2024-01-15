/* eslint-disable indent */
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User";
import classes from "./avatarDropdown.module.scss";
import { getRouteAdmin, getRouteProfile, getRouteSettings } from "@/shared/const/router";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Dropdown } from "@/shared/ui/redesigned/Popups";
import { DropdownItem } from "@/shared/ui/redesigned/Popups/ui/Dropdown/Dropdown";

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

    const items: DropdownItem[] = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t("Админка"),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            content: t("Профиль"),
            href: getRouteProfile(authData.id),
        },
        {
            content: t("Выйти"),
            onClick: onLogout,
        },
        {
            content: "Настройки",
            href: getRouteSettings(),
        },
    ];

    return (
        <Dropdown
            className={classNames(classes.avatarDropdown, {}, [className])}
            direction="bottom left"
            // по условию добавляем в dropdown ссылку на админку
            items={items}
            trigger={<Avatar src={authData.avatar} size={40} />}
        />
    );
};
