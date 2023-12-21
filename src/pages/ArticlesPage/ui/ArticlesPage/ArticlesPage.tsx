import { memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducerList } from "@/shared/lib/components/DynamicModuleLoader/ui/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { articlesPageReducer } from "../../model/slices/ArticlesPageSlice";
import classes from "./ArticlesPage.module.scss";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { Page } from "@/widgets/Page";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount={false}>
            <Page
                data-testid="ArticlesPage"
                onScrollEnd={onLoadNextPart}
                className={classNames(classes.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteList className={classes.list} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
