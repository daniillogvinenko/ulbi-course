/* eslint-disable indent */
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import "app/styles/index.scss";
import { loginReducer } from "features/AuthByUsername/model/slices/loginSlice";

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    login: loginReducer,
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>) =>
    (
        StoryComponent: Story,
        asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    ) =>
        (
            <StoreProvider
                initialState={state}
                asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
            >
                <StoryComponent />
            </StoreProvider>
        );
