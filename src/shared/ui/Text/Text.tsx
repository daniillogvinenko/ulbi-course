import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import classes from "./Text.module.scss";

export enum TextTheme {
    PRIMARY = "primary",
    INVERTED = "inverted",
    ERROR = "error",
}

export enum TextAlign {
    RIGHT = "right",
    LEFT = "left",
    CENTER = "center",
}

export enum TextSize {
    S = "size_s",
    M = "size_m",
    L = "size_l",
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

type HeaderTagType = "h1" | "h2" | "h3";

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: "h3",
    [TextSize.M]: "h2",
    [TextSize.L]: "h3",
};

export const Text = (props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div
            className={classNames(classes.Text, {}, [
                className,
                classes[theme],
                classes[align],
                classes[size],
            ])}
        >
            {title && <HeaderTag className={classes.title}>{title}</HeaderTag>}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    );
};
