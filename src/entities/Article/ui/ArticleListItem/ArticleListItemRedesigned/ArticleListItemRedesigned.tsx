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

    const types = <Text text={article.type.join(", ")} className={classes.types} />;
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
                        <Avatar size={32} src={article.user.avatar} />
                        <Text bold text={article.user.username} />
                        <Text text={article.createdAt} />
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
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}
        >
            <Card className={classes.card}>
                <div className={classes.imageWrapper}>
                    <AppImage
                        errorFallback={<Skeleton height={200} width="100%" />}
                        fallback={<Skeleton height={200} width="100%" />}
                        src={article.img}
                        alt={article.title}
                        className={classes.img}
                    />
                    <Text text={article.createdAt} className={classes.date} />
                </div>
                <div className={classes.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={classes.title} />
            </Card>
        </AppLink>
    );
};
