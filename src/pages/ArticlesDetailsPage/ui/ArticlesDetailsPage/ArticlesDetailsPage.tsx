import { ArticleDetails } from "entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ArticlesDetailsPage.module.scss";

export interface ArticlesDetailsPageProps {
    className?: string;
}

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
        <div
            className={classNames(classes.ArticlesDetailsPage, {}, [className])}
        >
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArticlesDetailsPage);
