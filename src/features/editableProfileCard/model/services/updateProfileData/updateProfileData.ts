import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "entities/Profile";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfile } from "../validateProfile/validateProfile";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

export const updateProfileData = createAsyncThunk<
    // возвращаемое значение
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>("profile/updateProfileData", async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getProfileForm(getState());

    const errors = validateProfile(formData);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await extra.api.put<Profile>(
            `/profile/${formData?.id}`,
            formData
        );

        if (!response.data) {
            throw new Error();
        }

        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        console.log(error);
        // это тоже превращается в пэйлоад
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
