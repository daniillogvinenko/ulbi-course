import { useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { classNames } from "@/shared/lib/classNames/classNames";
import { NotificationList } from "@/entities/Notification";
import NotificationIcon from "@/shared/assets/icons/notification.svg";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import classes from "./NotificationButton.module.scss";
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

    const trigger = <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />;

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(classes.NotificationButton, {}, [className])}
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
