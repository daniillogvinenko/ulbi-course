import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { ValidateProfileError } from "../../consts/consts";

describe("getProfileReadonly", () => {
    test("test", () => {
        const validateErrors: ValidateProfileError[] = [
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.SERVER_ERROR,
        ];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(
            validateErrors
        );
    });
    test("empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(
            undefined
        );
    });
});
