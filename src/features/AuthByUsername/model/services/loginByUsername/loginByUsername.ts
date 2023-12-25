import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User, userActions } from "@/entities/User";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
    // когда мы вызываем dispatch(loginByUsername(someData)), someData это и есть authData, которую принимает функция в следующией строчке
>("login/loginByUsername", async (authData, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await extra.api.post<User>("/login", authData);

        // если ответ с сервера пустой - то это ошибка
        if (!response.data) {
            throw new Error();
        }

        dispatch(userActions.setAuthData(response.data));
        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Error");
    }
});
