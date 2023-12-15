import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { ArticleSortField, ArticleType, ArticleView } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../model/slices/ArticlesPageSlice";
import classes from "./ArticlesPageFilters.module.scss";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { ArticleSortSelect } from "@/features/ArticleSortSelect";
import { ArticleViewSwitcher } from "@/features/ArticleViewSwitcher";

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const order = useSelector(getArticlePageOrder);
    const sort = useSelector(getArticlePageSort);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch]
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onChangeOrder = useCallback(
        (sortOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(sortOrder));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onChangeSearch = useCallback(
        (newSearch: string) => {
            dispatch(articlesPageActions.setSearch(newSearch));
            dispatch(articlesPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData]
    );

    const onChangeType = useCallback(
        (value: ArticleType) => {
            dispatch(articlesPageActions.setType(value));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData]
    );

    return (
        <div className={classNames(classes.ArticlesPageFilters, {}, [className])}>
            <div className={classes.sortWrapper}>
                <ArticleSortSelect
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
            </div>
            <Card className={classes.search}>
                <Input value={search} onChange={onChangeSearch} placeholder={t("Поиск")} />
            </Card>
            <ArticleTypeTabs className={classes.tabs} value={type} onChangeType={onChangeType} />
        </div>
    );
};
