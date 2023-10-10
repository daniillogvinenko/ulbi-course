import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";
// import { classNames } from "shared/lib/classNames/classNames";
// import classes from "./StoreProvider.module.scss";

interface StoreProviderProps {
    children?: React.ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>
    );

    return <Provider store={store}>{children}</Provider>;
};
