import { Profile } from "@/entities/Profile";
import { ValidateProfileError } from "../consts/consts";

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
