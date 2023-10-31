import { HTMLAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Card.module.scss";

export enum CardTheme {
    NORMAL = "normal",
    OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
    theme?: CardTheme;
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        ...otherProps
    } = props;

    return (
        <div
            className={classNames(classes.Card, {}, [
                className,
                classes[theme],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
