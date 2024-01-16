import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getArticleDetailsData } from "@/entities/Article";
import { Card } from "@/shared/ui/redesigned/Card";
import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";
import classes from "./AdditionalInfoContainer.module.scss";
import { getRouteArticleEdit } from "@/shared/const/router";

export const AdditionalInfoContainer = () => {
    const article = useSelector(getArticleDetailsData);

    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [navigate, article]);

    if (!article) return null;

    return (
        <Card padding="24" border="roundBorder" className={classes.card}>
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                author={article?.user}
                createdAt={article?.createdAt}
                views={article?.views}
            />
        </Card>
    );
};
