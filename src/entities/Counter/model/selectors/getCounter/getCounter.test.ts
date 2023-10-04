import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getCounter } from "./getCounter";

describe("getCounter", () => {
    test("should return counter value", () => {
        // урок 30 - 23:39 DeepPartial позволяет проигнорировать все поля и объявить только необходимые, часто используется именно для тестов
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 10,
            },
        };
        // as StateSchema пишем потому-что на вход getCounter ожидает StateSchema, а мы передаем DeepPartial<StateSchema>
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
