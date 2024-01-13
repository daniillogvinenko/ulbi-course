import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/deprecated/Card";
import { Input } from "@/shared/ui/deprecated/Input";
import classes from "./ArticlesPageFilters.module.scss";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { ArticleSortSelect } from "@/features/ArticleSortSelect";
import { ArticleViewSwitcher } from "@/features/ArticleViewSwitcher";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = (props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const { onChangeOrder, onChangeSearch, onChangeSort, onChangeType, onChangeView, order, search, sort, type, view } =
        useArticleFilters();

    return (
        <div className={classNames(classes.ArticlesPageFilters, {}, [className])}>
            <div className={classes.sortWrapper}>
                <ArticleSortSelect
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
            </div>
            <Card className={classes.search}>
                <Input value={search} onChange={onChangeSearch} placeholder={t("Поиск")} />
            </Card>
            <ArticleTypeTabs className={classes.tabs} value={type} onChangeType={onChangeType} />
        </div>
    );
};
