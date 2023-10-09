import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { loginReducer } from "features/AuthByUsername/model/slices/loginSlice";
import { StateSchema } from "./StateSchema";

export function createReduxStore(initialState?: StateSchema) {
    const RootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        login: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: RootReducer,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
