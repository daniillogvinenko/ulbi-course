import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../slices/ArticlesPageSlice";

export const initArticlesPage = createAsyncThunk<
    void,
    // тип аргумента
    void,
    // тип rejectValue
    ThunkConfig<string>
>("articlesPage/initArticlesPage", async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlesPageInited(getState());

    if (!inited) {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({ page: 1 }));
    }
});
