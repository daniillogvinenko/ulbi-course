import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import Button, { ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { SidebarItemList } from "widgets/Sidebar/model/items";
import classes from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                classes.Sidebar,
                { [classes.collapsed]: collapsed },
                [className]
            )}
        >
            <Button
                square
                size={ButtonSize.XL}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
                className={classes.collapseBtn}
            >
                {collapsed ? t(">") : t("<")}
            </Button>
            <div className={classes.items}>
                {SidebarItemList.map((item) => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        collapsed={collapsed}
                    />
                ))}
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={classes.lang} />
            </div>
        </div>
    );
});
