import { classNames } from "shared/lib/classNames/classNames";
import { Icon } from "shared/ui/Icon/Icon";
import { Text } from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/articleItem.svg";
import { Card } from "shared/ui/Card/Card";
import { Avatar } from "shared/ui/Avatar/Avatar";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from "../../model/types/article";
import classes from "./ArticleListItem.module.scss";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();

    const types = (
        <Text text={article.type.join(", ")} className={classes.types} />
    );
    const views = (
        <>
            <Text text={String(article.views)} className={classes.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        // находим первый текстовый блок в статье
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;
        return (
            <div
                className={classNames(classes.ArticleListItem, {}, [
                    className,
                    classes[view],
                ])}
            >
                <Card className={classes.card}>
                    <div className={classes.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text
                            text={article.user.username}
                            className={classes.username}
                        />
                        <Text
                            text={article.createdAt}
                            className={classes.date}
                        />
                    </div>
                    <Text title={article.title} className={classes.title} />
                    {types}
                    <img
                        src={article.img}
                        alt={article.title}
                        className={classes.img}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={classes.textBlock}
                        />
                    )}
                    <div className={classes.footer}>
                        <AppLink
                            target={target}
                            to={RoutePath.article_details + article.id}
                        >
                            <Button theme={ButtonTheme.OUTLINE}>
                                {t("Читать далее...")}
                            </Button>
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
            to={RoutePath.article_details + article.id}
            className={classNames(classes.ArticleListItem, {}, [
                className,
                classes[view],
            ])}
        >
            <Card className={classes.card}>
                <div className={classes.imageWrapper}>
                    <img
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
