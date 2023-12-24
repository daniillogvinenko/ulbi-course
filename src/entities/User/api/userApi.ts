import { rtkApi } from "@/shared/api/rtkApi";
import { User } from "../model/types/user";
import { JsonSettings } from "../model/types/jsonSettings";

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({ jsonSettings, userId }) => ({
                url: `/users/${userId}`,
                body: { jsonSettings },
                method: "PATCH",
            }),
        }),
    }),
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
