import { ArticleDetails } from "entities/Article";
import { CommentList } from "entities/Comment";
import { AddCommentForm } from "features/addCommentForm";
import { getArticleCommentsIsLoading } from "pages/ArticlesDetailsPage/model/selectors/comments";
// eslint-disable-next-line max-len
import { addCommentForArticle } from "pages/ArticlesDetailsPage/model/services/fetchCommentForArticle/addCommentForArticle";
// eslint-disable-next-line max-len
import { fetchCommentsByArticleId } from "pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from "pages/ArticlesDetailsPage/model/slice/articleDetailsCommentsSlice";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { Page } from "widgets/Page/Page";
import classes from "./ArticlesDetailsPage.module.scss";

export interface ArticlesDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch]
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
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
                <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
                    {t("Назад к списку")}
                </Button>
                <ArticleDetails id={id} />
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
