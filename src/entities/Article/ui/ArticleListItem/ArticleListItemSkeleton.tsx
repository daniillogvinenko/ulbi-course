import { classNames } from "shared/lib/classNames/classNames";
import { Card } from "shared/ui/Card/Card";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { ArticleView } from "../../model/types/article";
import classes from "./ArticleListItem.module.scss";

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = (
    props: ArticleListItemSkeletonProps
) => {
    const { className, view } = props;

    if (view === ArticleView.BIG) {
        return (
            <div
                className={classNames(classes.ArticleListItem, {}, [
                    className,
                    classes[view],
                ])}
            >
                <Card className={classes.card}>
                    <div className={classes.header}>
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton
                            width={150}
                            height={16}
                            className={classes.username}
                        />
                        <Skeleton
                            width={150}
                            height={16}
                            className={classes.date}
                        />
                    </div>
                    <Skeleton
                        width={250}
                        height={24}
                        className={classes.title}
                    />
                    <Skeleton height={200} className={classes.img} />
                    <div className={classes.footer}>
                        <Skeleton height={36} width={200} />
                    </div>
                </Card>
            </div>
        );
    }

    // если view - small
    return (
        <div
            className={classNames(classes.ArticleListItem, {}, [
                className,
                classes[view],
            ])}
        >
            <Card className={classes.card}>
                <div className={classes.imageWrapper}>
                    <Skeleton
                        width={200}
                        height={200}
                        className={classes.img}
                    />
                </div>
                <div className={classes.infoWrapper}>
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton width={150} height={16} className={classes.title} />
            </Card>
        </div>
    );
};
