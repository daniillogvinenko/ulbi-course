// eslint-disable-next-line unused-imports/no-unused-imports
import { createSelector } from "@reduxjs/toolkit";
// eslint-disable-next-line
import { getCounter } from "../getCounter/getCounter";
import { buildSelector } from "@/shared/lib/store";

// реселект. Можно использовать уже существующий селектор (getCounter), чтобы получить новое значение (value)
// export const getCounterValue = createSelector(
//     getCounter,
//     (counter) => counter.value
// );

// 105
export const [useCounterValue, getCounterValue] = buildSelector((state) => state.counter.value);
