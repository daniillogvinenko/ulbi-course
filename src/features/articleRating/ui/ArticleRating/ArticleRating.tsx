import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RatingCard } from "@/entities/Rating";
import { useGetArticleRating, useRateArticle } from "../../api/articleRatingApi";
import { getUserAuthData } from "@/entities/User";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";
import { ToggleFeatures } from "@/shared/lib/features";

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetArticleRating({ articleId, userId: userData?.id ?? "" });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? "",
                    articleId,
                    rate: starsCount,
                    feedback,
                });
            } catch (error) {
                console.log(error);
            }
        },
        [articleId, rateArticleMutation, userData?.id]
    );

    const onAccept = useCallback(
        (starsCount: number, feedback: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle]
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle]
    );

    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<SkeletonDeprecated width="100%" height={120} />}
                on={<SkeletonRedesigned border="40px" width="100%" height={120} />}
            />
        );
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title={t("Оцените статью")}
            feedbackTitle={t("Оставьте свой отзыв о статье, это поможет улучшить качетво контента")}
            hasFeedback
        />
    );
};

export default ArticleRating;
