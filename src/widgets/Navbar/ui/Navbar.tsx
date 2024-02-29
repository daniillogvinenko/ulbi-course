import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { LoginModal } from "@/features/AuthByUsername";
import { getUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { AvatarDropdown } from "@/features/avatarDropdown";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { NotificationButton } from "@/features/notificationButton";
import classes from "./Navbar.module.scss";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Button } from "@/shared/ui/redesigned/Button";

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
            <header className={classNames(classes.NavbarRedesigned, {}, [className])}>
                <HStack gap="16" className={classes.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }

    return (
        <header
            className={classNames(
                toggleFeatures({
                    name: "isAppRedesigned",
                    off: () => classes.Navbar,
                    on: () => classes.NavbarRedesigned,
                }),
                {},
                [className]
            )}
        >
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={classes.links}
                        onClick={onShowModal}
                    >
                        {t("Войти")}
                    </ButtonDeprecated>
                }
                on={
                    <Button variant="clear" className={classes.links} onClick={onShowModal}>
                        {t("Войти")}
                    </Button>
                }
            />
            {isAuthModal && <LoginModal isOpen={isAuthModal} onCLose={onCLoseModal} />}
        </header>
    );
});
