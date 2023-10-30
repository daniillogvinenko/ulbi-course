import { classNames } from "shared/lib/classNames/classNames";
import { useSelector } from "react-redux";
import { getArticlesPageView } from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import { ArticleView, ArticleViewSwitcher } from "entities/Article";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { articlesPageActions } from "pages/ArticlesPage/model/slices/ArticlesPageSlice";
import { Select } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import classes from "./ArticlesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const view = useSelector(getArticlesPageView);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch]
    );

    return (
        <div
            className={classNames(classes.ArticlesPageFilters, {}, [className])}
        >
            <div className={classes.sortWrapper}>
                <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
            </div>
            <Card className={classes.search}>
                <Input placeholder={t("Поиск")} />
            </Card>
        </div>
    );
};
