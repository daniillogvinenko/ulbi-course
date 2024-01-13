import { memo, ReactElement } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./StickyContentLayout.module.scss";

interface StickyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
    const { className, content, left, right } = props;

    return (
        <div className={classNames(classes.MainLayout, {}, [className])}>
            {right && <div className={classes.left}>{left}</div>}
            <div className={classes.content}>{content}</div>
            {left && <div className={classes.right}>{right}</div>}
        </div>
    );
});
