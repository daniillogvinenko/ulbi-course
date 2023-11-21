import { VStack } from "@/shared/ui/Stack";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useNotifications } from "../../../Notification/api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import classes from "./NotificationList.module.scss";

interface NotificationListProps {
    className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 10000,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(classes.NotificationList, {}, [
                    className,
                ])}
            >
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(classes.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
};
