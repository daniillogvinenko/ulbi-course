import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article, ArticleType } from "entities/Article";
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams";
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlesPageLimit,
    getArticlesPageNum,
} from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    // тип аргумента
    FetchArticlesListProps,
    // тип rejectValue
    ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const order = getArticlePageOrder(getState());
    const sort = getArticlePageSort(getState());
    const search = getArticlePageSearch(getState());
    const limit = getArticlesPageLimit(getState());
    const page = getArticlesPageNum(getState());
    const type = getArticlePageType(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        // получаем комментарии по айди статьи. урок 51 - 41:00
        const response = await extra.api.get<Article[]>(`/articles`, {
            params: {
                _expand: "user",
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                type: type === ArticleType.ALL ? undefined : type,
            },
        });

        if (!response.data) {
            throw new Error();
        }
        console.log(response.data);
        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        return rejectWithValue("Error");
    }
});
