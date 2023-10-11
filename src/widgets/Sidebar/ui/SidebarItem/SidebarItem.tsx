import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SidebarItemType } from "widgets/Sidebar/model/items";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./SidebarItem.module.scss";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { t } = useTranslation();
    const { item, collapsed } = props;
    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(classes.item, {
                [classes.collapsed]: collapsed,
            })}
        >
            <item.Icon className={classes.icon} />
            <span className={classes.link}>{t(item.text)}</span>
        </AppLink>
    );
});
