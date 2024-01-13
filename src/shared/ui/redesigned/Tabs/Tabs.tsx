import { ReactNode, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Tabs.module.scss";
import { Card } from "../Card/Card";
import { Flex, FlexDirection } from "../Stack/Flex/Flex";

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction: FlexDirection;
}

export const Tabs = (props: TabsProps) => {
    const { className, onTabClick, tabs, value, direction = "row" } = props;

    const clickHandle = useCallback((tab: TabItem) => () => onTabClick(tab), [onTabClick]);

    return (
        <Flex align="start" direction={direction} gap="8" className={classNames(classes.Tabs, {}, [className])}>
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        onClick={clickHandle(tab)}
                        variant={isSelected ? "light" : "normal"}
                        key={tab.value}
                        className={classNames(classes.tab, { [classes.selected]: isSelected }, [])}
                        border="roundBorder"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
};
