import { ReactElement } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MainLayout.module.scss";

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { className, content, header, sidebar, toolbar } = props;

    return (
        <div className={classNames(classes.MainLayout, {}, [className])}>
            <div className={classes.sidebar}>{sidebar}</div>
            <div className={classes.content}>{content}</div>
            <div className={classes.rightbar}>
                <div className={classes.header}>{header}</div>
                <div className={classes.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
};
