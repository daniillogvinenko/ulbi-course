import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink as AppLinkDeprecated, AppLinkTheme } from "@/shared/ui/deprecated/AppLink";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../../model/items";
import classes from "./SidebarItem.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { t } = useTranslation();
    const { item, collapsed } = props;
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) return null;

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <AppLinkDeprecated
                    theme={AppLinkTheme.SECONDARY}
                    to={item.path}
                    className={classNames(classes.item, {
                        [classes.collapsed]: collapsed,
                    })}
                >
                    <item.Icon className={classes.icon} />
                    <span className={classes.link}>{t(item.text)}</span>
                </AppLinkDeprecated>
            }
            on={
                <AppLink
                    to={item.path}
                    className={classNames(classes.itemRedesigned, {
                        [classes.collapsedRedesigned]: collapsed,
                    })}
                    activeClassname={classes.active}
                >
                    <Icon Svg={item.Icon} />
                    <span className={classes.link}>{t(item.text)}</span>
                </AppLink>
            }
        />
    );
});
