/* eslint indent: 0 */ // --> OFF

import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HStack, VStack } from "@/shared/ui/deprecated/Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducerList } from "@/shared/lib/components/DynamicModuleLoader/ui/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { Text, TextAlign, TextSize } from "@/shared/ui/deprecated/Text";

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
import { ArticleBlock } from "../../model/types/article";
import classes from "./ArticleDetails.module.scss";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleBlockType } from "../../model/consts/consts";

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent key={block.id} className={classes.block} block={block} />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent key={block.id} className={classes.block} block={block} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent key={block.id} className={classes.block} block={block} />;
        default:
            return null;
    }
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== "storybook") {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={classes.avatar} width={200} height={200} border="50%" />
                <Skeleton className={classes.title} width={300} height={32} />
                <Skeleton className={classes.skeleton} width={600} height={24} />
                <Skeleton className={classes.skeleton} width="100%" height={200} />
                <Skeleton className={classes.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = <Text align={TextAlign.CENTER} title={t("Произошла ошибка при загрузке статьи")} />;
    } else {
        content = (
            <>
                <HStack justify="center" max className={classes.avatarWrapper}>
                    <Avatar src={article?.img} size={200} className={classes.avatar} />
                </HStack>
                <VStack gap="4" max>
                    <Text size={TextSize.L} className={classes.title} title={article?.title} text={article?.subtitle} />
                    <HStack gap="8" className={classes.articleInfo}>
                        <Icon className={classes.icon} Svg={EyeIcon} />
                        <Text text={String(article?.views)} />
                    </HStack>
                    <HStack gap="8" className={classes.articleInfo}>
                        <Icon className={classes.icon} Svg={CalendarIcon} />
                        <Text text={article?.createdAt} />
                    </HStack>
                </VStack>

                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeReducersAfterUnmount>
            <VStack gap="16" max className={classNames(classes.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
