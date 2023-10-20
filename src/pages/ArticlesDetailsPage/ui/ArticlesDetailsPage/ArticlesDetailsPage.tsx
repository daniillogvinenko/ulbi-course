import { ArticleDetails } from "entities/Article";
import { CommentList } from "entities/Comment";
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from "pages/ArticlesDetailsPage/model/selectors/comments";
// eslint-disable-next-line max-len
import { fetchCommentsByArticleId } from "pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from "pages/ArticlesDetailsPage/model/slice/articleDetailsCommentsSlice";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Text } from "shared/ui/Text/Text";
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
    const dispatch = useDispatch();

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
            <div
                className={classNames(classes.ArticlesDetailsPage, {}, [
                    className,
                ])}
            >
                <ArticleDetails id={id} />
                <Text
                    className={classes.commentTitle}
                    title={t("Комментарии")}
                />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage);
