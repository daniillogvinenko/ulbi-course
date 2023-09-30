import React, { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Button.module.scss";

export enum ThemeButton {
    CLEAR = "clear",
    OUTLINE = "outline",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        className,
        theme = ThemeButton.OUTLINE,
        ...otherProps
    } = props;
    return (
        <button
            type="button"
            className={classNames(classes.Button, {}, [
                className,
                classes[theme],
            ])}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;
