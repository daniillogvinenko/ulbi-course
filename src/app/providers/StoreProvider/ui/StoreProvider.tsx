import { DeepPartial } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";
// import { classNames } from "shared/lib/classNames/classNames";
// import classes from "./StoreProvider.module.scss";

interface StoreProviderProps {
    children?: React.ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props;
    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>{children}</Provider>;
};
