import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text } from "shared/ui/Text/Text";
import { VStack } from "shared/ui/Stack";
import { Comment } from "../../model/types/comment";
import classes from "./CommentCard.module.scss";

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = (props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                gap="8"
                max
                className={classNames(classes.CommentCard, {}, [className])}
            >
                <div className={classes.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        width={100}
                        height={16}
                        className={classes.username}
                    />
                </div>
                <Skeleton className={classes.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) return null;

    return (
        <VStack
            max
            gap="8"
            className={classNames(classes.CommentCard, {}, [className])}
        >
            <AppLink
                className={classes.header}
                to={`${RoutePath.profile}${comment?.user.id}`}
            >
                {comment?.user.avatar ? (
                    <Avatar src={comment.user.avatar} size={40} />
                ) : null}
                <Text
                    className={classes.username}
                    text={comment?.user.username}
                />
            </AppLink>
            <Text className={classes.text} text={comment?.text} />
        </VStack>
    );
};
