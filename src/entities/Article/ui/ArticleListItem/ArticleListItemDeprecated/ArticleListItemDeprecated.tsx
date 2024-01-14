import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "../ArticleListItem.module.scss";
import { ArticleListItemProps } from "../ArticleListItem";
import { Text } from "@/shared/ui/deprecated/Text";
import { Icon } from "@/shared/ui/deprecated/Icon";
import EyeIcon from "@/shared/assets/icons/articleItem.svg";
import { ArticleBlockType, ArticleView } from "../../../model/consts/consts";
import { ArticleTextBlock } from "../../../model/types/article";
import { Card } from "@/shared/ui/deprecated/Card";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { getRouteArticleDetails } from "@/shared/const/router";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { AppLink } from "@/shared/ui/deprecated/AppLink";
import { AppImage } from "@/shared/ui/redesigned/AppImage";

export const ArticleListItemDeprecated = (props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();

    const types = <Text text={article.type.join(", ")} className={classes.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={classes.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        // находим первый текстовый блок в статье
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
        return (
            <div className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
                <Card className={classes.card}>
                    <div className={classes.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={classes.username} />
                        <Text text={article.createdAt} className={classes.date} />
                    </div>
                    <Text title={article.title} className={classes.title} />
                    {types}
                    {/* @ts-ignore */}
                    <AppImage
                        errorFallback={<Skeleton height={250} width="100%" />}
                        fallback={<Skeleton height={250} width="100%" />}
                        src={article.img}
                        alt={article.title}
                        className={classes.img}
                    />
                    {textBlock && <ArticleTextBlockComponent block={textBlock} className={classes.textBlock} />}
                    <div className={classes.footer}>
                        <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                            <Button theme={ButtonTheme.OUTLINE}>{t("Читать далее...")}</Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
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
