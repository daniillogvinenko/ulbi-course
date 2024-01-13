import { ArticleViewSwitcher } from "@/features/ArticleViewSwitcher";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

export const ViewSelectorContainer = () => {
    const { view, onChangeView } = useArticleFilters();

    return <ArticleViewSwitcher view={view} onViewClick={onChangeView} />;
};
