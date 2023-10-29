import {
    ArticleList,
    ArticleView,
    ArticleViewSwitcher,
} from "entities/Article";

import { memo, useCallback } from "react";
import { Page } from "widgets/Page/Page";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from "../../model/slices/ArticlesPageSlice";
import {
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import classes from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const inited = useSelector(getArticlesPageInited);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch]
    );

    const onLoadNextPart = useCallback(() => {
        // !isLoading чтобы запрос не отправлялся в момент загрузки данных
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    });

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeReducersAfterUnmount={false}
        >
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(classes.ArticlesPage, {}, [className])}
            >
                <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    view={view}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
