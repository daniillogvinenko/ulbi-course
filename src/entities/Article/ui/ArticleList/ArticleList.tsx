import { HTMLAttributeAnchorTarget } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Article, ArticleView } from "../../model/types/article";
import classes from "./ArticleList.module.scss";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
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
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    const renderArticles = (article: Article) => (
        <ArticleListItem
            target={target}
            className={classes.card}
            article={article}
            view={view}
            key={article.id}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(classes.ArticleList, {}, [
                    className,
                    classes[view],
                ])}
            >
                <Text title={t("Статьи не найдены")} />
            </div>
        );
    }

    return (
        <div
            className={classNames(classes.ArticleList, {}, [
                className,
                classes[view],
            ])}
        >
            {articles.length > 0 ? articles.map(renderArticles) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
};
