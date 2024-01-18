import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Comment } from "../../model/types/comment";
import classes from "./CommentCard.module.scss";
import { getRouteProfile } from "@/shared/const/router";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Text } from "@/shared/ui/redesigned/Text";
import { Card } from "@/shared/ui/redesigned/Card";
import { Avatar } from "@/shared/ui/redesigned/Avatar";

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = (props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    const Skeleton = toggleFeatures({
        name: "isAppRedesigned",
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack gap="8" max className={classNames(classes.CommentCard, {}, [className])}>
                <div className={classes.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton width={100} height={16} className={classes.username} />
                </div>
                <Skeleton className={classes.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) return null;

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <VStack max gap="8" className={classNames(classes.CommentCard, {}, [className])}>
                    <AppLinkDeprecated className={classes.header} to={getRouteProfile(comment?.user.id)}>
                        {comment?.user.avatar ? <AvatarDeprecated src={comment.user.avatar} size={40} /> : null}
                        <TextDeprecated className={classes.username} text={comment?.user.username} />
                    </AppLinkDeprecated>
                    <TextDeprecated className={classes.text} text={comment?.text} />
                </VStack>
            }
            on={
                <Card padding="24" max border="roundBorder">
                    <VStack max gap="8" className={classNames(classes.CommentCardRedesigned, {}, [className])}>
                        <AppLink to={getRouteProfile(comment?.user.id)}>
                            <HStack gap="16">
                                {comment?.user.avatar ? <Avatar src={comment.user.avatar} size={40} /> : null}
                                <Text bold text={comment?.user.username} />
                            </HStack>
                        </AppLink>
                        <Text text={comment?.text} />
                    </VStack>
                </Card>
            }
        />
    );
};
