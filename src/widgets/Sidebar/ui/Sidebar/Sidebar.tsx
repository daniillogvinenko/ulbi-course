import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import Button, { ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher";
import { useSelector } from "react-redux";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { VStack } from "shared/ui/Stack/VStack/VStack";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
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
            <VStack role="navigation" gap="8" className={classes.items}>
                {sidebarItemList.map((item) => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        collapsed={collapsed}
                    />
                ))}
            </VStack>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={classes.lang} />
            </div>
        </aside>
    );
});
