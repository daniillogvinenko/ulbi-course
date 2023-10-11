import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;

    // асинхронный редюсер
    login?: LoginSchema;
    profile?: ProfileSchema;
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
