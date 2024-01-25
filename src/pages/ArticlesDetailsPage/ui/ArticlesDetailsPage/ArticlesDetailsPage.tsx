import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleDetails } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducerList } from "@/shared/lib/components/DynamicModuleLoader/ui/DynamicModuleLoader";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import { articleDetailsPageReducer } from "../../model/slice";
import classes from "./ArticlesDetailsPage.module.scss";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { Page } from "@/widgets/Page";
import { ToggleFeatures } from "@/shared/lib/features";
import { ArticleRating } from "@/features/articleRating";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";
import { DetailsContainer } from "../DetailsContainer/DetailsContainer";
import { AdditionalInfoContainer } from "../AdditionalInfoContainer/AdditionalInfoContainer";

export interface ArticlesDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    if (!id) return null;

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <Page className={classNames(classes.ArticlesDetailsPage, {}, [className])}>
                        <VStack gap="16" max>
                            <ArticlesDetailsPageHeader />
                            <ArticleDetails id={id} />
                            <ToggleFeatures
                                feature="isArticleRatingEnabled"
                                on={<ArticleRating articleId={id} />}
                                off={<CardDeprecated>{t("Оценка статей скоро появится!")}</CardDeprecated>}
                            />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                }
                on={
                    <StickyContentLayout
                        content={
                            <Page className={classNames(classes.ArticlesDetailsPage, {}, [className])}>
                                <VStack gap="16" max>
                                    <DetailsContainer />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments id={id} />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContainer />}
                    />
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage);
