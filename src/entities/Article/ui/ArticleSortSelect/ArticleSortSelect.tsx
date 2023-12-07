import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Select, SelectOption } from "@/shared/ui/Select";
import { SortOrder } from "@/shared/types";
import classes from "./ArticleSortSelect.module.scss";
import { ArticleSortField } from "../../model/consts/consts";

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

    const orderOptions = useMemo<SelectOption[]>(
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

    const sortFieldOptions = useMemo<SelectOption[]>(
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

    // используем такой костыль, т.к. в onChange надо передать (value: string) => void
    const changeSortHandler = useCallback(
        (newSort: string) => {
            onChangeSort(newSort as ArticleSortField);
        },
        [onChangeSort]
    );

    // используем такой костыль, т.к. в onChange надо передать (value: string) => void
    const changeOrderHandler = useCallback(
        (newOrder: string) => {
            onChangeOrder(newOrder as SortOrder);
        },
        [onChangeOrder]
    );

    return (
        <div className={classNames(classes.ArticleSortSelect, {}, [className])}>
            <Select
                onChange={changeSortHandler}
                value={sort}
                options={sortFieldOptions}
                label={t("Сортировать по")}
            />
            <Select
                onChange={changeOrderHandler}
                value={order}
                options={orderOptions}
                label={t("по")}
                className={classes.order}
            />
        </div>
    );
};
