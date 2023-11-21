/* eslint-disable i18next/no-literal-string */
import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { LoginModal } from "@/features/AuthByUsername";
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { HStack } from "@/shared/ui/Stack";
import { NotificationButton } from "@/features/notificationButton";
import classes from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
    const authData = useSelector(getUserAuthData);

    const onCLoseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <div className={classNames(classes.Navbar, {}, [className])}>
                <Text
                    className={classes.appName}
                    title={t("ULBI TV APP")}
                    theme={TextTheme.INVERTED}
                />
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.article_create}
                    className={classes.createBtn}
                >
                    {t("Создать статью")}
                </AppLink>
                <HStack gap="16" className={classes.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </div>
        );
    }

    return (
        <header className={classNames(classes.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={classes.links}
                onClick={onShowModal}
            >
                {t("Войти")}
            </Button>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onCLose={onCLoseModal} />
            )}
        </header>
    );
});
