import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "entities/Article/model/selectors/articleDetails";
import { fetchArticleById } from "entities/Article/model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Loader } from "shared/ui/Loader/Loader";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Text, TextAlign } from "shared/ui/Text/Text";
import classes from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    // const isLoading = useSelector(getArticleDetailsIsLoading);
    const isLoading = true;
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <div>
                <Skeleton
                    className={classes.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={classes.title} width={300} height={32} />
                <Skeleton
                    className={classes.skeleton}
                    width={600}
                    height={24}
                />
                <Skeleton
                    className={classes.skeleton}
                    width="100%"
                    height={200}
                />
                <Skeleton
                    className={classes.skeleton}
                    width="100%"
                    height={200}
                />
            </div>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t("Произошла ошибка при загрузке статьи")}
            />
        );
    } else {
        content = t("ArticleDetails");
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <div
                className={classNames(classes.ArticleDetails, {}, [className])}
            >
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
