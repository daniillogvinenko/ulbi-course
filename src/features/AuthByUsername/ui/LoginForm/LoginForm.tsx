import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import classes from "./LoginForm.module.scss";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(classes.LoginForm, {}, [className])}>
            <Input
                placeholder={t("Логин")}
                className={classes.input}
                type="text"
            />
            <Input
                placeholder={t("Пароль")}
                className={classes.input}
                type="text"
            />
            <Button theme={ButtonTheme.OUTLINE} className={classes.loginBtn}>
                {t("Войти")}
            </Button>
        </div>
    );
};
