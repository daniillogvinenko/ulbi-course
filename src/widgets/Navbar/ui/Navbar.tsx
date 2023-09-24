import React from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import classes from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(classes.Navbar, {}, [className])}>
      <div className={classes.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={classes.mainLink}
          to="/about"
        >
          {t("О сайте")}
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/">
          {t("Главная")}
        </AppLink>
      </div>
    </div>
  );
};
