import { ArticleDetails, ArticleList, ArticleView } from "entities/Article";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/addCommentForm";
// eslint-disable-next-line max-len
// eslint-disable-next-line max-len

import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Page } from "widgets/Page/Page";
import { articleDetailsPageReducer } from "pages/ArticlesDetailsPage/model/slice";
import { Text } from "shared/ui/Text/Text";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/fetchCommentForArticle/addCommentForArticle";
import { getArticleComments } from "../../model/slice/ArticleDetailsCommentsSlice";
// eslint-disable-next-line max-len
import { getArticleRecommendations } from "../../model/slice/ArticleDetailsPageRecommendationsSlice";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations";
// eslint-disable-next-line max-len
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import classes from "./ArticlesDetailsPage.module.scss";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";

export interface ArticlesDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(
        getArticleRecommendationsIsLoading
    );
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch]
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <div
                className={classNames(classes.ArticlesDetailsPage, {}, [
                    className,
                ])}
            >
                {t("Статья не найдена")}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <Page
                className={classNames(classes.ArticlesDetailsPage, {}, [
                    className,
                ])}
            >
                <ArticlesDetailsPageHeader />
                <ArticleDetails id={id} />
                <Text
                    className={classes.commentTitle}
                    title={t("Рекомендуем")}
                />
                <ArticleList
                    // eslint-disable-next-line i18next/no-literal-string
                    target="_blank"
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    view={ArticleView.SMALL}
                    className={classes.recommendations}
                />
                <Text
                    className={classes.commentTitle}
                    title={t("Комментарии")}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage);
