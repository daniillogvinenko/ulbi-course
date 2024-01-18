/* eslint indent: 0 */ // --> OFF

import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducerList } from "@/shared/lib/components/DynamicModuleLoader/ui/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Text as TextDeprecated, TextAlign, TextSize } from "@/shared/ui/deprecated/Text";
import EyeIcon from "@/shared/assets/icons/articleItem.svg";
import CalendarIcon from "@/shared/assets/icons/profileItem.svg";
import { Icon } from "@/shared/ui/deprecated/Icon";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import classes from "./ArticleDetails.module.scss";
import { renderArticleBlock } from "./renderBlock";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <HStack justify="center" max className={classes.avatarWrapper}>
                <AvatarDeprecated src={article?.img} size={200} className={classes.avatar} />
            </HStack>
            <VStack gap="4" max>
                <TextDeprecated
                    size={TextSize.L}
                    className={classes.title}
                    title={article?.title}
                    text={article?.subtitle}
                />
                <HStack gap="8" className={classes.articleInfo}>
                    <Icon className={classes.icon} Svg={EyeIcon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack gap="8" className={classes.articleInfo}>
                    <Icon className={classes.icon} Svg={CalendarIcon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <Text size="l" title={article?.title} bold />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={<SkeletonRedesigned width="100%" height={420} border="16px" />}
                src={article?.img}
                className={classes.img}
            />
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const ArticleDetailsSkeleton = () => {
    const Skeleton = toggleFeatures({
        name: "isAppRedesigned",
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <VStack gap="16" max>
            <Skeleton className={classes.avatar} width={200} height={200} border="50%" />
            <Skeleton className={classes.title} width={300} height={32} />
            <Skeleton className={classes.skeleton} width={600} height={24} />
            <Skeleton className={classes.skeleton} width="100%" height={200} />
            <Skeleton className={classes.skeleton} width="100%" height={200} />
        </VStack>
    );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== "storybook") {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else if (error) {
        content = <Text align={TextAlign.CENTER} title={t("Произошла ошибка при загрузке статьи")} />;
    } else {
        content = <ToggleFeatures feature="isAppRedesigned" off={<Deprecated />} on={<Redesigned />} />;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <VStack gap="16" max className={classNames(classes.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
