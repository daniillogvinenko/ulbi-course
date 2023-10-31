import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { SortOrder } from "shared/types";
import { ArticleSortField, ArticleType } from "entities/Article";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../slices/ArticlesPageSlice";

export const initArticlesPage = createAsyncThunk<
    void,
    // тип аргумента
    URLSearchParams,
    // тип rejectValue
    ThunkConfig<string>
>("articlesPage/initArticlesPage", async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlesPageInited(getState());

    if (!inited) {
        const orderFromURL = searchParams.get("order") as SortOrder;
        const sortFromURL = searchParams.get("sort") as ArticleSortField;
        const searchFromURL = searchParams.get("search");
        const typeFromURL = searchParams.get("type") as ArticleType;

        if (orderFromURL) {
            dispatch(articlesPageActions.setOrder(orderFromURL));
        }
        if (sortFromURL) {
            dispatch(articlesPageActions.setSort(sortFromURL));
        }
        if (searchFromURL) {
            dispatch(articlesPageActions.setSearch(searchFromURL));
        }
        if (typeFromURL) {
            dispatch(articlesPageActions.setType(typeFromURL));
        }

        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
