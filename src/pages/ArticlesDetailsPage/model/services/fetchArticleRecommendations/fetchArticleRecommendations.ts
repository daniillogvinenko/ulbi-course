import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    // тип аргумента
    void,
    // тип rejectValue
    ThunkConfig<string>
>(
    "articlesDetailsPage/fetchArticleRecommendations",
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            // получаем комментарии по айди статьи. урок 51 - 41:00
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _limit: 4,
                },
            });

            if (!response.data) {
                throw new Error();
            }
            // Эта дата, превращается в action.payload (это не точно) в слайсе
            return response.data;
        } catch (error) {
            return rejectWithValue("Error");
        }
    }
);
