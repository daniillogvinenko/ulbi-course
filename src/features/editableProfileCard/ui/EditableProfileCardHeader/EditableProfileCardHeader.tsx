import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { getUserAuthData } from "@/entities/User";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = (props: EditableProfileCardHeaderProps) => {
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
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <HStack max justify="between" className={classNames("", {}, [className])}>
                    <TextDeprecated title={t("Профиль пользователя")} />
                    {canEdit && (
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        <div>
                            {readonly ? (
                                <ButtonDeprecated onClick={onEdit} theme={ButtonTheme.OUTLINE}>
                                    {t("Редактировать")}
                                </ButtonDeprecated>
                            ) : (
                                <HStack gap="8">
                                    <ButtonDeprecated onClick={onSave} theme={ButtonTheme.OUTLINE}>
                                        {t("Сохранить")}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated onClick={onCancelEdit} theme={ButtonTheme.OUTLINE_RED}>
                                        {t("Отменить")}
                                    </ButtonDeprecated>
                                </HStack>
                            )}
                        </div>
                    )}
                </HStack>
            }
            on={
                <Card border="partialRoundBorder" padding="16" max>
                    <HStack max justify="between" className={classNames("", {}, [className])}>
                        <Text title={t("Профиль пользователя")} />
                        {canEdit && (
                            // eslint-disable-next-line react/jsx-no-useless-fragment
                            <div>
                                {readonly ? (
                                    <Button onClick={onEdit} variant="outline">
                                        {t("Редактировать")}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button onClick={onSave} variant="outline" color="success">
                                            {t("Сохранить")}
                                        </Button>
                                        <Button onClick={onCancelEdit} variant="outline" color="error">
                                            {t("Отменить")}
                                        </Button>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                </Card>
            }
        />
    );
};
