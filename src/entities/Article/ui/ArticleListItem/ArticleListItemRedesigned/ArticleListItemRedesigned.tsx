import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ArticleListItemRedesigned.module.scss";
import { ArticleListItemProps } from "../ArticleListItem";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { Text } from "@/shared/ui/redesigned/Text";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import { ArticleBlockType, ArticleView } from "../../../model/consts/consts";
import { ArticleTextBlock } from "../../../model/types/article";
import { Card } from "@/shared/ui/redesigned/Card";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Button } from "@/shared/ui/redesigned/Button";
import { getRouteArticleDetails } from "@/shared/const/router";

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();

    const userInfo = (
        <>
            <Avatar size={32} src={article.user.avatar} className={classes.avatar} />
            <Text bold text={article.user.username} />
        </>
    );

    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={classes.views} />
        </HStack>
    );

    if (view === ArticleView.BIG) {
        // находим первый текстовый блок в статье
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
        return (
            <Card max padding="24" className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
                <VStack max gap="16">
                    <HStack gap="8" max>
                        {userInfo}
                    </HStack>
                    <Text title={article.title} bold />
                    <Text title={article.subtitle} size="s" />
                    <AppImage
                        errorFallback={<Skeleton height={250} width="100%" />}
                        fallback={<Skeleton height={250} width="100%" />}
                        src={article.img}
                        alt={article.title}
                        className={classes.img}
                    />
                    {textBlock?.paragraphs && (
                        <Text className={classes.textBlock} text={textBlock.paragraphs.slice(0, 2).join(" ")} />
                    )}
                    <HStack max justify="between">
                        <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                            <Button variant="outline">{t("Читать далее...")}</Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    // если view - small
    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}
        >
            <Card className={classes.card} border="roundBorder" padding="0">
                <AppImage
                    fallback={<Skeleton width="100%" height={200} />}
                    alt={article.title}
                    src={article.img}
                    className={classes.img}
                />
                <VStack className={classes.info} gap="4">
                    <Text title={article.title} className={classes.title} />
                    <VStack gap="4" className={classes.footer} max>
                        <HStack justify="between" max>
                            <Text text={article.createdAt} className={classes.date} />
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
};
