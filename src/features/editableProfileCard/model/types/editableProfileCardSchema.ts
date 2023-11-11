import { Profile } from "entities/Profile";

export enum ValidateProfileError {
    INCORRECT_USER_DATA = "INCORRECT_USER_DATA",
    INCORRECT_AGE = "INCORRECT_AGE",
    INCORRECT_COUNTRY = "INCORRECT_COUNTRY",
    NO_DATA = "NO_DATA",
    SERVER_ERROR = "SERVER_ERROR",
}

export interface ProfileSchema {
    // "настоящее" значение
    data?: Profile;
    // это то, что изменяет пользователь и при нажатии "отменить" эти значения пропадут
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
