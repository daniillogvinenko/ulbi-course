import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";

export const fetchProfileData = createAsyncThunk<
    Profile,
    // аргумент, который принимает thunk
    string,
    ThunkConfig<string>
>("profile/fetchProfileData", async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Profile>(`/profile/${profileId}`);

        if (!response.data) {
            throw new Error();
        }

        // Эта дата, превращается в action.payload (это не точно) в слайсе
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue("Error");
    }
});
