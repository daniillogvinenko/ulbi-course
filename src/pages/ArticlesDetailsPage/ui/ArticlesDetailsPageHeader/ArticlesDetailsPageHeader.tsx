import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import Button, { ButtonTheme } from "@/shared/ui/Button/Button";
import { HStack } from "@/shared/ui/Stack";
import { getArticleDetailsData } from "@/entities/Article";
import { getCanEditArticle } from "../../model/selectors/article";
import { RoutePath } from "@/shared/const/router";

interface ArticlesDetailsPageHeaderProps {
    className?: string;
}

export const ArticlesDetailsPageHeader = (props: ArticlesDetailsPageHeaderProps) => {
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
        <HStack max justify="between" className={classNames("", {}, [className])}>
            <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
                {t("Назад к списку")}
            </Button>
            {canEdit && (
                <Button onClick={onEditArticle} theme={ButtonTheme.OUTLINE}>
                    {t("Редактировать")}
                </Button>
            )}
        </HStack>
    );
};
