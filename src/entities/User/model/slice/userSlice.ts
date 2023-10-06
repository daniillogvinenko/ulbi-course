import { createSlice } from "@reduxjs/toolkit";
import { UserSchema } from "../types/user";

const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

// меняем название при экспорте
export const { actions: userActions, reducer: userReducer } = userSlice;
