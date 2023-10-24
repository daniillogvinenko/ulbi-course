import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { CombinedState } from "redux";
import { AxiosInstance } from "axios";
import { CounterSchema } from "entities/Counter";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";
import { NavigateOptions, To } from "react-router-dom";
import { ArticleDetailsSchema } from "entities/Article";
import { ArticlesDetailsCommentsSchema } from "pages/ArticlesDetailsPage";
import { AddCommmentFormSchema } from "features/addCommentForm";
import { ArticlePageSchema } from "pages/ArticlesPage";

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

    // асинхронный редюсер
    login?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticlesDetailsCommentsSchema;
    addCommentForm?: AddCommmentFormSchema;
    articlesPage?: ArticlePageSchema;
}

// ключи StateSchem'ы (например counter, user, login)
export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

// EnhancedStore - это обычный тип стора, мы расширяем его, чтобы использовать менеджер редюсеров
export interface ReduxStoreWithManager extends EnhancedStore {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
