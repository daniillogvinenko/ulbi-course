/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/no-unstable-nested-components */
import { memo } from "react";
import { useParams } from "react-router-dom";
import { VStack } from "@/shared/ui/Stack";
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
import { Card } from "@/shared/ui/Card";

export interface ArticlesDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage = (props: ArticlesDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    if (!id) return null;

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <VStack gap="16" max>
                <Page className={classNames(classes.ArticlesDetailsPage, {}, [className])}>
                    <ArticlesDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ToggleFeatures
                        feature="isArticleRatingEnabled"
                        on={<ArticleRating articleId={id} />}
                        off={<Card>Оценка статей скоро появится!</Card>}
                    />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </Page>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage);
