import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ErrorPage.module.scss";
import { Button } from "@/shared/ui/deprecated/Button";

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
    const { t } = useTranslation();

    const reload = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(classes.ErrorPage, {}, [className])}>
            <p>{t("Произошла ошибка")}</p>
            <Button onClick={reload}>{t("Обновить страницу")}</Button>
        </div>
    );
};
