import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { VStack } from "@/shared/ui/Stack";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import classes from "./Sidebar.module.scss";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLogo } from "@/shared/ui/AppLogo";

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
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [className])}
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
                            <SidebarItem key={item.path} item={item} collapsed={collapsed} />
                        ))}
                    </VStack>
                    <div className={classes.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher short={collapsed} className={classes.lang} />
                    </div>
                </aside>
            }
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(classes.SidebarRedesigned, { [classes.collapsed]: collapsed }, [className])}
                    // eslint-disable-next-line i18next/no-literal-string
                >
                    <AppLogo className={classes.appLogo} />
                </aside>
            }
        />
    );
});
