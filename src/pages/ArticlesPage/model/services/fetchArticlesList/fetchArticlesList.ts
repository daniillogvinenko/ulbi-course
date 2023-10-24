import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetchArticlesList = createAsyncThunk<
    Article[],
    // тип аргумента articleId
    void,
    // тип rejectValue
    ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // получаем комментарии по айди статьи. урок 51 - 41:00
        const response = await extra.api.get<Article[]>(`/articles`, {
            params: {
                _expand: "user",
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
