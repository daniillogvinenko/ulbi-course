import { createSelector } from "@reduxjs/toolkit";
// eslint-disable-next-line
import { getCounter } from "../getCounter/getCounter";

// реселект. Можно использовать уже существующий селектор (getCounter), чтобы получить новое значение (value)
export const getCounterValue = createSelector(
    getCounter,
    (counter) => counter.value
);
