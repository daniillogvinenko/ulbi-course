import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ArticlesFilters.module.scss";
import { Card } from "@/shared/ui/redesigned/Card";
import { ArticleSortSelect } from "@/features/ArticleSortSelect";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { Input } from "@/shared/ui/redesigned/Input";
import SearchIcon from "@/shared/assets/icons/search.svg";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newOrder: ArticleSortField) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort, onChangeSearch, onChangeType, search, type } = props;

    const { t } = useTranslation();

    return (
        <Card className={classNames(classes.ArticlesFilters, {}, [className])} padding="24">
            <VStack gap="32">
                <Input
                    addonLeft={<Icon Svg={SearchIcon} />}
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t("Поиск")}
                />
                <ArticleTypeTabs className={classes.tabs} value={type} onChangeType={onChangeType} />
                <ArticleSortSelect
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
};
