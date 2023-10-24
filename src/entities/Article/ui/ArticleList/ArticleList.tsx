import { Article, ArticleView } from "entities/Article/model/types/article";
import { classNames } from "shared/lib/classNames/classNames";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import classes from "./ArticleList.module.scss";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

// eslint-disable-next-line
const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className={classes.card}
                key={index}
                view={view}
            />
        ));
};

export const ArticleList = (props: ArticleListProps) => {
    const { className, articles, view = ArticleView.SMALL, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(classes.ArticleList, {}, [
                    className,
                    classes[view],
                ])}
            >
                {getSkeletons(view)}
            </div>
        );
    }

    const renderArticles = (article: Article) => (
        <ArticleListItem
            className={classes.card}
            article={article}
            view={view}
            key={article.id}
        />
    );

    return (
        <div
            className={classNames(classes.ArticleList, {}, [
                className,
                classes[view],
            ])}
        >
            {articles.length > 0 ? articles.map(renderArticles) : null}
        </div>
    );
};
