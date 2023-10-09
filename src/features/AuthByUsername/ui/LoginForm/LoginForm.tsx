// eslint-disable-next-line max-len
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text, TextTheme } from "shared/ui/Text/Text";
// eslint-disable-next-line max-len
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginActions } from "../../model/slices/loginSlice";
import classes from "./LoginForm.module.scss";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { username, password, isLoading, error } = useSelector(getLoginState);

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
    );
});
