import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DynamicModuleLoader, ReducerList } from "@/shared/lib/components/DynamicModuleLoader/ui/DynamicModuleLoader";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { Text as TextDeprecated, TextTheme } from "@/shared/ui/deprecated/Text";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { loginActions, loginReducer } from "../../model/slices/loginSlice";
import classes from "./LoginForm.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";
import { Input } from "@/shared/ui/redesigned/Input";
import { Button } from "@/shared/ui/redesigned/Button";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { useForceUpdate } from "@/shared/lib/render/forceUpdate";

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

    const forceUpdate = useForceUpdate();

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
            forceUpdate();
        }
    }, [dispatch, username, password, onSuccess, forceUpdate]);

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <DynamicModuleLoader removeReducersAfterUnmount reducers={initialReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <div className={classNames(classes.LoginForm, {}, [className])}>
                        <TextDeprecated title={t("Авторизация")} />
                        {error && <TextDeprecated text={t("Неверный логин или пароль")} theme={TextTheme.ERROR} />}
                        <CardDeprecated className={classes.inputWrapper}>
                            <InputDeprecated
                                placeholder={t("Логин")}
                                className={classes.input}
                                type="text"
                                onChange={onChangeUserName}
                                value={username}
                            />
                        </CardDeprecated>

                        <CardDeprecated className={classes.inputWrapper}>
                            <InputDeprecated
                                placeholder={t("Пароль")}
                                className={classes.input}
                                type="text"
                                onChange={onChangePassword}
                                value={password}
                            />
                        </CardDeprecated>

                        <ButtonDeprecated
                            onClick={onLoginClick}
                            theme={ButtonTheme.OUTLINE}
                            className={classes.loginBtn}
                            disabled={isLoading}
                        >
                            {t("Войти")}
                        </ButtonDeprecated>
                    </div>
                }
                on={
                    <VStack className={classNames(classes.LoginForm, {}, [className])} gap="16">
                        <Text title={t("Авторизация")} />
                        {error && <Text text={t("Неверный логин или пароль")} variant="error" />}
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
                            variant="outline"
                            className={classes.loginBtn}
                            disabled={isLoading}
                        >
                            {t("Войти")}
                        </Button>
                    </VStack>
                }
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
