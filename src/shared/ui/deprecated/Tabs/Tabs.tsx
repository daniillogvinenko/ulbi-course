import { ReactNode, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Tabs.module.scss";
import { Card, CardTheme } from "../Card/Card";

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 */
export const Tabs = (props: TabsProps) => {
    const { className, onTabClick, tabs, value } = props;

    const clickHandle = useCallback((tab: TabItem) => () => onTabClick(tab), [onTabClick]);

    return (
        <div className={classNames(classes.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    onClick={clickHandle(tab)}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    key={tab.value}
                    className={classes.tab}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
