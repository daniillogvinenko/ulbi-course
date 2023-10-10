import { getLoginError } from "features/AuthByUsername/model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { loginActions, loginReducer } from "../../model/slices/loginSlice";
import classes from "./LoginForm.module.scss";

export interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducerList = {
    login: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUserName = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(() => {
        // { username: username, password: password }
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <DynamicModuleLoader
            removeReducersAfterUnmount
            reducers={initialReducers}
        >
            <div className={classNames(classes.LoginForm, {}, [className])}>
                <Text title={t("Авторизация")} />
                {error && (
                    <Text
                        text={t("Неверный логин или пароль")}
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    placeholder={t("Логин")}
                    className={classes.input}
                    type="text"
                    onChange={onChangeUserName}
                    value={username}
                />
                <Input
                    placeholder={t("Пароль")}
                    className={classes.input}
                    type="text"
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    onClick={onLoginClick}
                    theme={ButtonTheme.OUTLINE}
                    className={classes.loginBtn}
                    disabled={isLoading}
                >
                    {t("Войти")}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;