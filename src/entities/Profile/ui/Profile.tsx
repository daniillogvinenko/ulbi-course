import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Profile.module.scss";

interface ProfileProps {
    className?: string;
}

export const Profile = (props: ProfileProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(classes.Profile, {}, [className])}>
            {t("Профиль")}
        </div>
    );
};
