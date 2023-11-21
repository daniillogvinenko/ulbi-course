import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import {
    Article,
    ArticleSortField,
    ArticleType,
    ArticleView,
} from "@/entities/Article";
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { SortOrder } from "@/shared/types";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { ArticlePageSchema } from "../types/articlePageSchema";

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

// забыл что делает эта констуркция (пересмотреть видос с entityAdapter)
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
    name: "articlesPageSlice",
    initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
        hasMore: true,
        page: 1,
        _inited: false,
        limit: 9,
        sort: ArticleSortField.CREATED,
        order: "asc",
        search: "",
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLE_VIEW_LOCALSTORAGE_KEY
            ) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                // если в ответе с сервера элементов меньше чем limit, то больше элементов на сервере нету -> hasMore
                state.hasMore = action.payload.length >= state.limit;

                // аргумент, который принимаем в thunk'е
                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    articlesAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
    articlesPageSlice;
