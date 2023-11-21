import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<
    Article,
    // тип аргумента articleId (undefined 75 11:00)
    string | undefined,
    // тип rejectValue
    ThunkConfig<string>
>("article/fetchArticleById", async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        if (!articleId) throw new Error("");
        const response = await extra.api.get<Article>(
            `/articles/${articleId}`,
            {
                params: {
                    _expand: "user",
                },
            }
        );

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
