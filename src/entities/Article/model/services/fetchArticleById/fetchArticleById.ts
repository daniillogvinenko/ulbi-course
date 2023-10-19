import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<
    Article,
    // тип аргумента articleId
    string,
    // тип rejectValue
    ThunkConfig<string>
>("article/fetchArticleById", async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Article>(`/articles/${articleId}`);

        if (!response.data) {
            throw new Error();
        }

        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Error");
    }
});
