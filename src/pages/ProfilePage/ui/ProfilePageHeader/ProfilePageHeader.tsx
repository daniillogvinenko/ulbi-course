import {
    getProfileReadonly,
    profileActions,
    updateProfileData,
} from "entities/Profile";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import classes from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const readonly = useSelector(getProfileReadonly);

    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(classes.ProfilePageHeader, {}, [className])}>
            <Text title={t("Профиль пользователя")} />
            {readonly ? (
                <Button
                    onClick={onEdit}
                    className={classes.editBtn}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t("Редактировать")}
                </Button>
            ) : (
                <>
                    <Button
                        onClick={onSave}
                        className={classes.saveBtn}
                        theme={ButtonTheme.OUTLINE}
                    >
                        {t("Сохранить")}
                    </Button>
                    <Button
                        onClick={onCancelEdit}
                        className={classes.cancelBtn}
                        theme={ButtonTheme.OUTLINE_RED}
                    >
                        {t("Отменить")}
                    </Button>
                </>
            )}
        </div>
    );
};
