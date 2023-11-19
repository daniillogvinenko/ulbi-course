import { Card, CardTheme } from "shared/ui/Card/Card";
import { Text } from "shared/ui/Text/Text";
import { classNames } from "shared/lib/classNames/classNames";
import { Notification } from "../../../Notification/model/types/notifications";
import classes from "./NotificationItem.module.scss";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(classes.NotificationItem, {}, [className])}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <a
                className={classes.link}
                target="_blank"
                href={item.href}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    return content;
};
