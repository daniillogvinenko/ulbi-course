export { userActions, userReducer } from "./model/slice/userSlice";
export { User, UserSchema } from "./model/types/user";
export { getUserAuthData } from "./model/selector/getUserAuthData/getUserAuthData";
export { getUserInited } from "./model/selector/getUserInited/getUserInited";
// сущность User хранит в себе данные о том, авторизован пользователь или нет, а также данные об авторизованном пользователе
