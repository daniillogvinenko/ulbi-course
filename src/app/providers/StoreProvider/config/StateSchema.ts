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
import { ArticleDetailsSchema } from "entities/Article";
import { ArticlesDetailsCommentsSchema } from "pages/ArticlesDetailsPage";
import { AddCommmentFormSchema } from "features/addCommentForm";
import { ArticlePageSchema } from "pages/ArticlesPage";
import { UISchema } from "features/UI/model/types/UISchema";

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    ui: UISchema;
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

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - вмонтирован, false - демонтирован (или еще не был вмонтирован)
    getMountedReducers: () => MountedReducers;
}

// EnhancedStore - это обычный тип стора, мы расширяем его, чтобы использовать менеджер редюсеров
export interface ReduxStoreWithManager extends EnhancedStore {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
