/* eslint-disable indent */
import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import "@/app/styles/index.scss";
import { articleDetailsPageReducer } from "@/pages/ArticlesDetailsPage/model/slice";
import { ReducerList } from "@/shared/lib/components/DynamicModuleLoader";
import { articleDetailsReducer } from "@/entities/Article/testing";
import { loginReducer } from "@/features/AuthByUsername/testing";
import { addCommentFormReducer } from "@/features/addCommentForm/testing";
import { profileReducer } from "@/features/editableProfileCard/testing";

const defaultAsyncReducers: ReducerList = {
    login: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>) => (StoryComponent: Story, asyncReducers?: ReducerList) =>
        (
            <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
                <StoryComponent />
            </StoreProvider>
        );
