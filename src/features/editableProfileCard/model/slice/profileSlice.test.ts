import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { profileActions, profileReducer } from "./profileSlice";
import {
    ProfileSchema,
    ValidateProfileError,
} from "../types/editableProfileCardSchema";

const data = {
    username: "admin",
    age: 22,
    country: Country.Belarus,
    lastname: "Logvinenko",
    fisrt: "Daniil",
    city: "asdgas",
    currency: Currency.RUB,
};

describe("profileSlice", () => {
    test("test setReadonly", () => {
        const state: DeepPartial<ProfileSchema> = { readonly: true };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(false)
            )
        ).toEqual({ readonly: false });
    });

    test("test cancelEdit", () => {
        const state: DeepPartial<ProfileSchema> = {
            data,
            form: { fisrt: "new first name" },
            readonly: false,
            validateErrors: [ValidateProfileError.INCORRECT_AGE],
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit())
        ).toEqual({
            data,
            form: data,
            readonly: true,
            validateErrors: undefined,
        });
    });

    // test updateProfile <--- надо написать тест

    test("test updateProfileData pending", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending)
        ).toEqual({
            isLoading: true,
        });
    });

    test("test updateProfileData fulfilled", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfileData.fulfilled(data, "")
            )
        ).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: data,
            data,
        });
    });
});
