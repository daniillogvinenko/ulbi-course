import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileSchema } from "../types/profile";

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
});

// меняем название при экспорте
export const { actions: profileActions, reducer: profileReducer } =
    profileSlice;
