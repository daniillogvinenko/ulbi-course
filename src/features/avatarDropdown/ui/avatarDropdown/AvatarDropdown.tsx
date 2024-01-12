/* eslint-disable indent */
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { Dropdown as DropdownDeprecated } from "@/shared/ui/deprecated/Popups";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User";
import classes from "./avatarDropdown.module.scss";
import { getRouteAdmin, getRouteProfile } from "@/shared/const/router";
import { ToggleFeatures } from "@/shared/lib/features";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Dropdown } from "@/shared/ui/redesigned/Popups";

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

    const items = [
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
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <DropdownDeprecated
                    className={classNames(classes.avatarDropdown, {}, [className])}
                    direction="bottom left"
                    // по условию добавляем в dropdown ссылку на админку
                    items={items}
                    trigger={<AvatarDeprecated fallbackInverted src={authData.avatar} size={30} />}
                />
            }
            on={
                <Dropdown
                    className={classNames(classes.avatarDropdown, {}, [className])}
                    direction="bottom left"
                    // по условию добавляем в dropdown ссылку на админку
                    items={items}
                    trigger={<Avatar src={authData.avatar} size={40} />}
                />
            }
        />
    );
};
