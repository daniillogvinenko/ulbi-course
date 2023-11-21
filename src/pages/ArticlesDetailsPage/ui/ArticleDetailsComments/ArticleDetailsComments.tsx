import { useTranslation } from "react-i18next";
import { Suspense, useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AddCommentForm } from "@/features/addCommentForm";
import { Text } from "@/shared/ui/Text/Text";
import { CommentList } from "@/entities/Comment";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "@/shared/ui/Stack";
import { getArticleComments } from "../../model/slice/articleDetailsCommentsSlice";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/fetchCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch]
    );
    return (
        <VStack gap="16" max className={classNames("", {}, [className])}>
            <Text title={t("Комментарии")} />
            <Suspense fallback={t("Загрузка")}>
                <AddCommentForm onSendComment={onSendComment} />
            </Suspense>
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
    );
};
