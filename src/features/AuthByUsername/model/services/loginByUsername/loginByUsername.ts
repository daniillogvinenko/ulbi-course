import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    { rejectValue: string }
    // когда мы вызываем dispatch(loginByUsername(someData)), someData это и есть authData, которую принимает функция в следующией строчке
>("login/loginByUsername", async (authData, thunkAPI) => {
    try {
        const response = await axios.post<User>(
            "http://localhost:8000/login",
            authData
        );

        // если ответ с сервера пустой - то это ошибка
        if (!response.data) {
            throw new Error();
        }

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data)
        );
        thunkAPI.dispatch(userActions.setAuthData(response.data));

        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue("Error");
    }
});
