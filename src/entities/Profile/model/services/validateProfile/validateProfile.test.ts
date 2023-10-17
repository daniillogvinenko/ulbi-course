import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { Profile, ValidateProfileError } from "../../types/profile";
import { validateProfile } from "./validateProfile";

const data: Profile = {
    username: "admin",
    age: 22,
    country: Country.Belarus,
    lastname: "Logvinenko",
    fisrt: "Daniil",
    city: "asdgas",
    currency: Currency.RUB,
};

describe("validateProfile", () => {
    test("success", () => {
        const result = validateProfile(data);

        expect(result).toEqual([]);
    });
    test("wihtout first and last names", () => {
        const result = validateProfile({ ...data, fisrt: "", lastname: "" });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
    test("incorrect age", () => {
        const result = validateProfile({ ...data, age: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });
    test("incorrect country", () => {
        const result = validateProfile({ ...data, country: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });
    test("incorrect all", () => {
        const result = validateProfile({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
