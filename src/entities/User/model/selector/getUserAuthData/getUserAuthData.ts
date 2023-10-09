import { StateSchema } from "app/providers/StoreProvider";
import { UserSchema } from "../../types/user";

export const getUserAuthData = (state: StateSchema) => state.user.authData;
