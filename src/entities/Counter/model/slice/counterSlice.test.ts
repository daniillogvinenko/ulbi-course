import { CounterSchema } from "../types/counterSchema";
import { counterActions, counterReducer } from "./counterSlice";

describe("getCounterValue", () => {
    test("decrement, should return 9", () => {
        // урок 30 - 23:39 DeepPartial позволяет проигнорировать все поля и объявить только необходимые, часто используется именно для тестов
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducer(state, counterActions.decrement)).toEqual({
            value: 9,
        });
    });
    test("increment, should return 11", () => {
        // урок 30 - 23:39 DeepPartial позволяет проигнорировать все поля и объявить только необходимые, часто используется именно для тестов
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducer(state, counterActions.increment)).toEqual({
            value: 11,
        });
    });
    test("should work with empty state", () => {
        expect(counterReducer(undefined, counterActions.increment)).toEqual({
            value: 1,
        });
    });
});
