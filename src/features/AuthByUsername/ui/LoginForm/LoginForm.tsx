import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Card } from "shared/ui/Card/Card";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { loginActions, loginReducer } from "../../model/slices/loginSlice";
import classes from "./LoginForm.module.scss";

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducerList = {
    login: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
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

    const onLoginClick = useCallback(async () => {
        // { username: username, password: password }
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess();
        }
    }, [dispatch, username, password, onSuccess]);

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
                <Card className={classes.inputWrapper}>
                    <Input
                        placeholder={t("Логин")}
                        className={classes.input}
                        type="text"
                        onChange={onChangeUserName}
                        value={username}
                    />
                </Card>

                <Card className={classes.inputWrapper}>
                    <Input
                        placeholder={t("Пароль")}
                        className={classes.input}
                        type="text"
                        onChange={onChangePassword}
                        value={password}
                    />
                </Card>

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
