import { LoginSchema } from "../types/loginSchema";
import { loginActions, loginReducer } from "./loginSlice";

describe("loginSlice", () => {
    test("test set isLoading", () => {
        const state: DeepPartial<LoginSchema> = { username: "my username" };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername("1234546")
            )
        ).toEqual({ username: "1234546" });
    });
});
