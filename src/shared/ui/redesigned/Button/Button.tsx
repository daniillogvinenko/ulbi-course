import React, { ButtonHTMLAttributes, memo } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import classes from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const { children, className, variant = "outline", square, fullWidth, size = "m", disabled, ...otherProps } = props;

    const mods: Mods = {
        [classes.square]: square,
        [classes.disabled]: disabled,
        [classes.fullWidth]: fullWidth,
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={classNames(classes.Button, mods, [className, classes[variant], classes[size]])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
