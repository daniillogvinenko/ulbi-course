import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    // тип аргумента articleId
    string | undefined,
    // тип rejectValue
    ThunkConfig<string>
>("articleDetails/fetchCommentsByArticleId", async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!articleId) {
        return rejectWithValue("Error");
    }

    try {
        // получаем комментарии по айди статьи. урок 51 - 41:00
        const response = await extra.api.get<Comment[]>(`/comments`, {
            params: {
                articleId,
                _expand: "user",
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
});
