import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Select, SelectOption } from "@/shared/ui/Select";
import { SortOrder } from "@/shared/types/sort";
import classes from "./ArticleSortSelect.module.scss";
import { ArticleSortField } from "../../../../entities/Article/model/consts/consts";

interface ArticleSortSelectProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newOrder: ArticleSortField) => void;
}

export const ArticleSortSelect = (props: ArticleSortSelectProps) => {
    const { className, order, sort, onChangeOrder, onChangeSort } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: "asc",
                content: t("возрастанию"),
            },
            {
                value: "desc",
                content: t("убыванию"),
            },
        ],
        [t]
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                content: t("дате создания"),
            },
            {
                value: ArticleSortField.TITLE,
                content: t("заголовку"),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t("просмотрам"),
            },
        ],
        [t]
    );

    return (
        <div className={classNames(classes.ArticleSortSelect, {}, [className])}>
            <Select onChange={onChangeSort} value={sort} options={sortFieldOptions} label={t("Сортировать по")} />
            <Select
                onChange={onChangeOrder}
                value={order}
                options={orderOptions}
                label={t("по")}
                className={classes.order}
            />
        </div>
    );
};
