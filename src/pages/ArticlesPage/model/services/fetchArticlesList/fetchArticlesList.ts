import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    // тип аргумента
    FetchArticlesListProps,
    // тип rejectValue
    ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    // значение по умолчанию
    const { page = 1 } = props;
    const limit = getArticlesPageLimit(getState());

    try {
        // получаем комментарии по айди статьи. урок 51 - 41:00
        const response = await extra.api.get<Article[]>(`/articles`, {
            params: {
                _expand: "user",
                _limit: limit,
                _page: page,
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
