import { ArticleDetails, ArticleList, ArticleView } from "entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { VStack } from "shared/ui/Stack";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Text } from "shared/ui/Text/Text";
import { Page } from "widgets/Page/Page";
import { ArticleRecommendationsList } from "features/articleRecommendationsList";
import { articleDetailsPageReducer } from "../../model/slice";
import classes from "./ArticlesDetailsPage.module.scss";
import { ArticlesDetailsPageHeader } from "../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";

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
            <VStack gap="16" max>
                <Page
                    className={classNames(classes.ArticlesDetailsPage, {}, [
                        className,
                    ])}
                >
                    <ArticlesDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </Page>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesDetailsPage);
