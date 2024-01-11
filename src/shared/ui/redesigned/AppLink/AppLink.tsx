import React from "react";
import { NavLink, LinkProps } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppLink.module.scss";

export type AppLinkVariant = "primary" | "red";

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    activeClassname?: string;
}

export const AppLink: React.FC<AppLinkProps> = (props) => {
    const { className, children, variant = "primary", to, activeClassname = "", ...otherProps } = props;

    return (
        <NavLink
            to={to}
            {...otherProps}
            className={
                ({ isActive }) =>
                    classNames(classes.AppLink, { [activeClassname]: isActive }, [className, classes[variant]])
                // eslint-disable-next-line react/jsx-curly-newline
            }
        >
            {children}
        </NavLink>
    );
};
