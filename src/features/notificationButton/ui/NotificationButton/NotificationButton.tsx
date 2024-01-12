import { useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Popover as PopoverDeprecated } from "@/shared/ui/deprecated/Popups";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";
import { NotificationList } from "@/entities/Notification";
import NotificationIconDeprecated from "@/shared/assets/icons/Notifications.svg";
import NotificationIcon from "@/shared/assets/icons/notification.svg";
import { Drawer } from "@/shared/ui/deprecated/Drawer";
import classes from "./NotificationButton.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Popover } from "@/shared/ui/redesigned/Popups";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
                    <IconDeprecated width={20} height={20} inverted Svg={NotificationIconDeprecated} />
                </ButtonDeprecated>
            }
            on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
        />
    );

    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={
                        <PopoverDeprecated
                            className={classNames(classes.NotificationButton, {}, [className])}
                            trigger={trigger}
                            direction="bottom left"
                        >
                            <NotificationList className={classes.notifications} />
                        </PopoverDeprecated>
                    }
                    on={
                        <Popover
                            className={classNames(classes.NotificationButton, {}, [className])}
                            trigger={trigger}
                            direction="bottom left"
                        >
                            <NotificationList className={classes.notifications} />
                        </Popover>
                    }
                />
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
};
