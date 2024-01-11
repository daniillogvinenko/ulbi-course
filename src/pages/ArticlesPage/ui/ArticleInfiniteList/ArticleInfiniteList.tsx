import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ArticleList } from "@/entities/Article";
import { Text } from "@/shared/ui/deprecated/Text";
import { getArticles } from "../../model/slices/ArticlesPageSlice";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = (props: ArticleInfiniteListProps) => {
    const { className } = props;
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    const { t } = useTranslation();

    if (error) {
        return <Text text={t("Ошибка")} />;
    }

    return <ArticleList articles={articles} isLoading={isLoading} view={view} className={className} />;
};
