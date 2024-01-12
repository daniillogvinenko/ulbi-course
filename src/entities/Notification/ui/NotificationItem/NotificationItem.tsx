import { Card as CardDeprecated, CardTheme } from "@/shared/ui/deprecated/Card";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Notification } from "../../../Notification/model/types/notifications";
import classes from "./NotificationItem.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Card } from "@/shared/ui/redesigned/Card";
import { Text } from "@/shared/ui/redesigned/Text";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(classes.NotificationItem, {}, [className])}
                >
                    <TextDeprecated title={item.title} text={item.description} />
                </CardDeprecated>
            }
            on={
                <Card variant="normal" className={classNames(classes.NotificationItem, {}, [className])}>
                    <Text title={item.title} text={item.description} />
                </Card>
            }
        />
    );

    if (item.href) {
        return (
            <a className={classes.link} target="_blank" href={item.href} rel="noreferrer">
                {content}
            </a>
        );
    }

    return content;
};
