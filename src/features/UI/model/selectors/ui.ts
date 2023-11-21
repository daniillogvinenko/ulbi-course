import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";

export const getUIScroll = (state: StateSchema) => state.ui.scroll;

// 58 6:20 (для получения скролла, по конкретному пути)
export const getUIScrollByPath = createSelector(
    getUIScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0
);
