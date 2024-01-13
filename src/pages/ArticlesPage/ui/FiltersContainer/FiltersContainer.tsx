import { ArticlesFilters } from "@/widgets/ArticlesFilters";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = ({ className }: FiltersContainerProps) => {
    const { onChangeOrder, onChangeSearch, onChangeSort, onChangeType, onChangeView, order, search, sort, type, view } =
        useArticleFilters();

    return (
        <ArticlesFilters
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            order={order}
            search={search}
            sort={sort}
            type={type}
            className={className}
        />
    );
};
