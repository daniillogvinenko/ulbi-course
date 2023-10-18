export interface User {
    id: string;
    username: string;
}

export interface UserSchema {
    authData?: User;

    // урок 47
    _inited: boolean;
}
