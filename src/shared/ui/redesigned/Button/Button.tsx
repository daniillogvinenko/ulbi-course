import React, { ButtonHTMLAttributes, ReactNode, memo } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import classes from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";
export type ButtonColor = "normal" | "success" | "error";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: React.ReactNode;
    fullWidth?: boolean;
    color?: ButtonColor;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        children,
        className,
        variant = "outline",
        square,
        fullWidth,
        size = "m",
        disabled,
        addonLeft,
        addonRight,
        color = "normal",
        ...otherProps
    } = props;

    const mods: Mods = {
        [classes.square]: square,
        [classes.disabled]: disabled,
        [classes.fullWidth]: fullWidth,
        [classes.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={classNames(classes.Button, mods, [className, classes[variant], classes[size], classes[color]])}
            {...otherProps}
        >
            <div className={classes.addonLeft}>{addonLeft}</div>
            {children}
            <div className={classes.addonRight}>{addonRight}</div>
        </button>
    );
});
