import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { JsonSettings } from "../../types/jsonSettings";
import { getUserAuthData } from "../../selector/getUserAuthData/getUserAuthData";
import { getJsonSettings } from "../../selector/jsonSettings";
import { setJsonSettingsMutation } from "../../../api/userApi";

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    // тип аргумента articleId (undefined 75 11:00)
    JsonSettings,
    // тип rejectValue
    ThunkConfig<string>
>("uesr/saveJsonSettings", async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) return rejectWithValue("userData is empty");

    try {
        const response = await dispatch(
            setJsonSettingsMutation({ jsonSettings: { ...currentSettings, ...newJsonSettings }, userId: userData.id })
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue("Error, response is empty");
        }

        // Эта дата, превращается в action.payload в слайсе
        return response.jsonSettings;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Error");
    }
});
