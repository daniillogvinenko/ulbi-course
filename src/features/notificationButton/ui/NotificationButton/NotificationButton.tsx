import { classNames } from "shared/lib/classNames/classNames";
import { Popover } from "shared/ui/Popups";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { NotificationList } from "entities/Notification";
import NotificationIcon from "shared/assets/icons/Notifications.svg";
import classes from "./NotificationButton.module.scss";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={classNames(classes.NotificationButton, {}, [className])}
            trigger={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon inverted Svg={NotificationIcon} />
                </Button>
            }
            direction="bottom left"
        >
            <NotificationList className={classes.notifications} />
        </Popover>
    );
};
