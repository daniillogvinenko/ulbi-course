import { CSSProperties } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Skeleton.module.scss";

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const Skeleton = (props: SkeletonProps) => {
    const { className, border, height, width } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return <div className={classNames(classes.Skeleton, {}, [className])} style={styles} />;
};
