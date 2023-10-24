import {
    ArticleList,
    ArticleView,
    ArticleViewSwitcher,
} from "entities/Article";
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from "pages/ArticlesPage/model/slices/ArticlesPageSlice";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import {
    getArticlesPageError,
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
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch]
    );

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlesPageActions.initState());
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(classes.ArticlesPage, {}, [className])}>
                <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    view={view}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
