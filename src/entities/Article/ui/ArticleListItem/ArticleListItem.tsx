import { HTMLAttributeAnchorTarget } from "react";
import { Article } from "../../model/types/article";
import { ArticleView } from "../../model/consts/consts";
import { ToggleFeatures } from "@/shared/lib/features";
import { ArticleListItemDeprecated } from "./ArticleListItemDeprecated/ArticleListItemDeprecated";
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    const { article, view, className, target } = props;
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<ArticleListItemDeprecated article={article} view={view} target={target} className={className} />}
            on={<ArticleListItemRedesigned article={article} view={view} target={target} className={className} />}
        />
    );
};
