import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import { Comment } from "@/entities/Comment";
import { getUserAuthData } from "@/entities/User";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
    // тип возвращаемого значения
    Comment,
    // тип аргумента, который принимает dispatch(thunk(arg)), в данном случае аргумент не принимаем, а достанем всё что нужно из стейта
    string,
    ThunkConfig<string>
    // когда мы вызываем dispatch(loginByUsername(someData)), someData это и есть authData, которую принимает функция в следующией строчке
>("articleDetails/addCommentForArticle", async (text, thunkApi) => {
    const { extra, rejectWithValue, dispatch, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue("error");
    }
    // here +
    try {
        const response = await extra.api.post<Comment>("/comments", {
            articleId: article.id,
            userId: userData.id,
            text,
        });

        // если ответ с сервера пустой - то это ошибка
        if (!response.data) {
            throw new Error();
        }

        dispatch(fetchCommentsByArticleId(article.id));

        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        return rejectWithValue("Error");
    }
});
