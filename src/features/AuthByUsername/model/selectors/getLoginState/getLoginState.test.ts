import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginState } from "./getLoginState";

describe("getLoginState", () => {
    test("should return login state", () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                username: "Alexander",
                password: "123",
            },
        };
        expect(getLoginState(state as StateSchema)).toEqual({
            username: "Alexander",
            password: "123",
        });
    });
    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginState(state as StateSchema)).toEqual(undefined);
    });
});
