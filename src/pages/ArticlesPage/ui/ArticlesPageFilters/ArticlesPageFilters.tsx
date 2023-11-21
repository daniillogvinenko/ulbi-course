import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { TabItem, Tabs } from "@/shared/ui/Tabs/Tabs";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import {
    ArticleSortField,
    ArticleSortSelect,
    ArticleType,
    ArticleTypeTabs,
    ArticleView,
    ArticleViewSwitcher,
} from "@/entities/Article";
import { SortOrder } from "@/shared/types";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "@/shared/ui/Card/Card";
import { Input } from "@/shared/ui/Input/Input";
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
        <div
            className={classNames(classes.ArticlesPageFilters, {}, [className])}
        >
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
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t("Поиск")}
                />
            </Card>
            <ArticleTypeTabs
                className={classes.tabs}
                value={type}
                onChangeType={onChangeType}
            />
        </div>
    );
};
