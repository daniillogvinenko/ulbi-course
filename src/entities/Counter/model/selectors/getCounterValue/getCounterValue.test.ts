import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getCounterValue } from "./getCounterValue";

describe("getCounterValue", () => {
    test("should return counter value", () => {
        // урок 30 - 23:39 DeepPartial позволяет проигнорировать все поля и объявить только необходимые, часто используется именно для тестов
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 14,
            },
        };
        // as StateSchema пишем потому-что на вход getCounter ожидает StateSchema, а мы передаем DeepPartial<StateSchema>
        expect(getCounterValue(state as StateSchema)).toEqual(14);
    });
});
