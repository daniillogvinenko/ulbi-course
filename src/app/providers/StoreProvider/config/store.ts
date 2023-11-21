import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { counterReducer } from "@/entities/Counter";
import { uiReducer } from "@/features/UI";
import { rtkApi } from "@/shared/api/rtkApi";
import { userReducer } from "@/entities/User";
import { $api } from "@/shared/api/api";
import { createReducerManager } from "./reducerManager";
import { StateSchema, ThunkExtraArg } from "./StateSchema";

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    const RootReducer: ReducersMapObject<StateSchema> = {
        // не понял зачем мы разворачиваем асинхронные редюсеры в начальное состояние стора 35 - 40:00
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        ui: uiReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(RootReducer);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
