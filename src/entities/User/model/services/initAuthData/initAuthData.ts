import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getUserDataByIdQuery } from "../../../api/userApi";
import { User } from "../../types/user";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";

export const initAuthData = createAsyncThunk<
    // тип получаемых данных
    User,
    // тип аргумента
    void,
    // тип rejectValue
    ThunkConfig<string>
>("user/initAuthData", async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) return rejectWithValue("userId is empty");

    try {
        const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

        // Эта дата, превращается в action.payload в слайсе
        return response;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Error");
    }
});
