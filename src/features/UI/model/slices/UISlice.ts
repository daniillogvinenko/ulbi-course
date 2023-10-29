import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UISchema } from "../types/UISchema";

const initialState: UISchema = {
    scroll: {},
};

export const uiSlice = createSlice({
    name: "UI",
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

// меняем название при экспорте
export const { actions: uiActions, reducer: uiReducer } = uiSlice;
