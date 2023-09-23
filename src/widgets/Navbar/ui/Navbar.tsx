import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import classes from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(classes.Navbar, {}, [className])}>
    <div className={classes.links}>
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        className={classes.mainLink}
        to="/about"
      >
        About
      </AppLink>
      <AppLink theme={AppLinkTheme.SECONDARY} to="/">
        Home
      </AppLink>
    </div>
  </div>
);
