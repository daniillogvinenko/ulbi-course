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
import { ArticleRating } from "@/features/articleRating";
import { Page } from "@/widgets/Page";
import { getFeatureFlags } from "@/shared/lib/features";
import { Counter } from "@/entities/Counter";

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

    const isArticleRatingEnabled = getFeatureFlags("isArticleRatingEnabled");
    const isCounterEnabled = getFeatureFlags("isCounterEnabled");

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <VStack gap="16" max>
                <Page className={classNames(classes.ArticlesDetailsPage, {}, [className])}>
                    <ArticlesDetailsPageHeader />
                    <ArticleDetails id={id} />
                    {isArticleRatingEnabled && <ArticleRating articleId={id} />}
                    {isCounterEnabled && <Counter />}
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </Page>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage);
