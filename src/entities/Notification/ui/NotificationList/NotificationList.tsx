import { VStack } from "@/shared/ui/redesigned/Stack";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useNotifications } from "../../../Notification/api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import classes from "./NotificationList.module.scss";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";
import { toggleFeatures } from "@/shared/lib/features";

interface NotificationListProps {
    className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 10000,
    });

    const Skeleton = toggleFeatures({
        name: "isAppRedesigned",
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames(classes.NotificationList, {}, [className])}>
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack gap="16" max className={classNames(classes.NotificationList, {}, [className])}>
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
};
