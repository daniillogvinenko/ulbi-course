import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import Button, { ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { getSidebarItems } from "widgets/Sidebar/model/selectors/getSidebarItems";
import { useSelector } from "react-redux";
import classes from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const sidebarItemList = useSelector(getSidebarItems);
    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <aside
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
                {sidebarItemList.map((item) => (
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
        </aside>
    );
});
