import { StateSchema } from "app/providers/StoreProvider";

export const gerProfileFirstname = (state: StateSchema) =>
    state?.profile?.data?.fisrt || "";
