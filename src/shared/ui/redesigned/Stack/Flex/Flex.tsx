import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Flex.module.scss";

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type FlexGap = "4" | "8" | "16" | "24" | "32";
export type FlexWrap = "nowrap" | "wrap";

const justifyClasses: Record<FlexJustify, string> = {
    start: classes.justifyStart,
    center: classes.justifyCenter,
    end: classes.justifyEnd,
    between: classes.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
    start: classes.alignStart,
    center: classes.alignCenter,
    end: classes.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    row: classes.directionRow,
    column: classes.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
    4: classes.gap4,
    8: classes.gap8,
    16: classes.gap16,
    24: classes.gap24,
    32: classes.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
    wrap?: FlexWrap;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = "start",
        align = "center",
        direction = "row",
        gap,
        max,
        wrap = "nowrap",
    } = props;

    const classesArr = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
        classes[wrap],
    ];

    const mods: Mods = {
        [classes.max]: max,
    };

    return <div className={classNames(classes.Flex, mods, classesArr)}>{children}</div>;
};
