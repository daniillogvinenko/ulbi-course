import {
    getProfileData,
    getProfileReadonly,
    profileActions,
    updateProfileData,
} from "entities/Profile";
import { getUserAuthData } from "entities/User";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { HStack } from "shared/ui/Stack/HStack/HStack";
import { Text } from "shared/ui/Text/Text";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
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
        <HStack
            max
            justify="between"
            className={classNames("", {}, [className])}
        >
            <Text title={t("Профиль пользователя")} />
            {canEdit && (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <div>
                    {readonly ? (
                        <Button onClick={onEdit} theme={ButtonTheme.OUTLINE}>
                            {t("Редактировать")}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                onClick={onSave}
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t("Сохранить")}
                            </Button>
                            <Button
                                onClick={onCancelEdit}
                                theme={ButtonTheme.OUTLINE_RED}
                            >
                                {t("Отменить")}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
