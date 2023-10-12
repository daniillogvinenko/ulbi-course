import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
    // когда мы вызываем dispatch(loginByUsername(someData)), someData это и есть authData, которую принимает функция в следующией строчке
>("profile/fetchProfileData", async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Profile>("/profile");

        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Error");
    }
});
