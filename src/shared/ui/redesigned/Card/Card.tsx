import { HTMLAttributes } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Card.module.scss";

export type CardVariant = "normal" | "outlined" | "light";

export type CardPadding = "0" | "8" | "16" | "24";

export type CardBorder = "roundBorder" | "partialRoundBorder" | "normalBorder";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    0: "gap_0",
    8: "gap_8",
    16: "gap_16",
    24: "gap_24",
};

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        variant = "normal",
        max,
        padding = "8",
        border = "normalBorder",
        ...otherProps
    } = props;

    const paddingClass = mapPaddingToClass[padding];

    return (
        <div
            className={classNames(classes.Card, { [classes.max]: max }, [
                className,
                classes[variant],
                classes[paddingClass],
                classes[border],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
