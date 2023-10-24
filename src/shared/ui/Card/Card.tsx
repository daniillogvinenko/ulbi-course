import { HTMLAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
}

export const Card = (props: CardProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={classNames(classes.Card, {}, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
