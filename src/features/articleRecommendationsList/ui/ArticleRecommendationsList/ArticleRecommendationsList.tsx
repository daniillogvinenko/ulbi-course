import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleList, ArticleView } from "@/entities/Article";
import { Text } from "@/shared/ui/deprecated/Text";
import { VStack } from "@/shared/ui/deprecated/Stack";
import { useArticleRecommendationsList } from "../../api/articleRecommendationsApi";

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        isLoading,
        // меняем имя переменной при деструктуризации
        data: articles,
        error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error) return null;

    return (
        <VStack gap="8" className={classNames("", {}, [className])}>
            <Text title={t("Рекомендуем")} />
            <ArticleList target="_blank" articles={articles} view={ArticleView.SMALL} />
        </VStack>
    );
});
