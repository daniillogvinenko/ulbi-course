import { useTranslation } from "react-i18next";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar";
import { Loader as LoaderDeprecated } from "@/shared/ui/deprecated/Loader";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { Text as TextDeprecated, TextAlign, TextTheme } from "@/shared/ui/deprecated/Text";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { CurrencySelect } from "@/entities/Currency";
import { CountrySelect } from "@/entities/Country";
import classes from "./ProfileCardDeprecated.module.scss";

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();
    return (
        <HStack max justify="center" className={classNames(classes.ProfileCard, {}, [classes.error])}>
            <TextDeprecated
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
                title={t("Произошла ошибка при загрузке пользователя")}
                text={t("Попробуйте обновить страницу")}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => (
    <HStack justify="center" max className={classNames(classes.ProfileCard, {}, [classes.loading])}>
        <LoaderDeprecated className={classes.loader} />
    </HStack>
);

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
    const { t } = useTranslation();

    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeCurrency,
        onChangeCountry,
        onChangeUsername,
        onChangeAvatar,
    } = props;

    const mods: Mods = {
        [classes.editing]: !readonly,
    };

    return (
        <VStack gap="8" max className={classNames(classes.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="center" max className={classes.avatarWrapper}>
                    <AvatarDeprecated alt="" src={data.avatar} />
                </HStack>
            )}
            <InputDeprecated
                className={classes.input}
                value={data?.fisrt}
                placeholder={t("Введите имя")}
                onChange={onChangeFirstname}
                readOnly={readonly}
            />
            <InputDeprecated
                className={classes.input}
                value={data?.lastname}
                placeholder={t("Введите фамилию")}
                onChange={onChangeLastname}
                readOnly={readonly}
            />
            <InputDeprecated
                className={classes.input}
                value={data?.age}
                placeholder={t("Введите возраст")}
                onChange={onChangeAge}
                readOnly={readonly}
            />
            <InputDeprecated
                className={classes.input}
                value={data?.city}
                placeholder={t("Введите город")}
                onChange={onChangeCity}
                readOnly={readonly}
            />
            <InputDeprecated
                className={classes.input}
                value={data?.avatar}
                placeholder={t("Введите url аватара")}
                onChange={onChangeAvatar}
                readOnly={readonly}
            />
            <InputDeprecated
                className={classes.input}
                value={data?.username}
                placeholder={t("Введите имя пользователя")}
                onChange={onChangeUsername}
                readOnly={readonly}
            />
            <CurrencySelect
                className={classes.input}
                onChange={onChangeCurrency}
                value={data?.currency}
                readonly={readonly}
            />
            <CountrySelect
                className={classes.input}
                onChange={onChangeCountry}
                value={data?.country}
                readonly={readonly}
            />
        </VStack>
    );
};
