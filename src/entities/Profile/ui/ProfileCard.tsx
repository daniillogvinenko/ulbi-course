import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text } from "shared/ui/Text/Text";
import { getProfileData } from "../model/selectors/getProfileData/getProfileData";
import { getProfileError } from "../model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "../model/selectors/getProfileIsLoading/getProfileIsLoading";
import classes from "./ProfileCard.module.scss";

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    return (
        <div className={classNames(classes.ProfileCard, {}, [className])}>
            <div className={classes.header}>
                <Text title={t("Профиль пользователя")} />
                <Button className={classes.editBtn} theme={ButtonTheme.OUTLINE}>
                    {t("Редактировать")}
                </Button>
            </div>
            <div className={classes.data}>
                <Input
                    className={classes.input}
                    value={data?.fisrt}
                    placeholder={t("Введите имя")}
                />
                <Input
                    className={classes.input}
                    value={data?.lastname}
                    placeholder={t("Введите фамилию")}
                />
            </div>
        </div>
    );
};
