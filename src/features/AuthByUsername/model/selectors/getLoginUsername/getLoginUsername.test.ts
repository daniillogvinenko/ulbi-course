import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginUsername } from "./getLoginUsername";

describe("getLoginUsername", () => {
    test("should return Alexander", () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                username: "Alexander",
            },
        };
        expect(getLoginUsername(state as StateSchema)).toBe("Alexander");
    });
    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual("");
    });
});
