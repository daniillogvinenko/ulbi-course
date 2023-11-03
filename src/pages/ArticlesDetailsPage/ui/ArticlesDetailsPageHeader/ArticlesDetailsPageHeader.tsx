import { classNames } from "shared/lib/classNames/classNames";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useCallback } from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCanEditArticle } from "pages/ArticlesDetailsPage/model/selectors/article";
import { getArticleDetailsData } from "entities/Article";
import classes from "./ArticlesDetailsPageHeader.module.scss";

interface ArticlesDetailsPageHeaderProps {
    className?: string;
}

export const ArticlesDetailsPageHeader = (
    props: ArticlesDetailsPageHeaderProps
) => {
    const { className } = props;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [navigate, article?.id]);

    return (
        <div
            className={classNames(classes.ArticlesDetailsPageHeader, {}, [
                className,
            ])}
        >
            <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
                {t("Назад к списку")}
            </Button>
            {canEdit && (
                <Button
                    className={classes.editBtn}
                    onClick={onEditArticle}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t("Редактировать")}
                </Button>
            )}
        </div>
    );
};
