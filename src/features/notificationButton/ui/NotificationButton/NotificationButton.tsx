import { useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Popover } from "@/shared/ui/Popups";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { NotificationList } from "@/entities/Notification";
import NotificationIcon from "@/shared/assets/icons/Notifications.svg";
import { AnimationProvider } from "@/shared/lib/components/AnimationProvider";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import classes from "./NotificationButton.module.scss";

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
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon inverted Svg={NotificationIcon} />
        </Button>
    );

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(classes.NotificationButton, {}, [
                        className,
                    ])}
                    trigger={trigger}
                    direction="bottom left"
                >
                    <NotificationList className={classes.notifications} />
                </Popover>
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
