import { Country, CountrySelect } from "entities/Country";
import { Currency, CurrencySelect } from "entities/Currency";
import { useTranslation } from "react-i18next";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Input } from "shared/ui/Input/Input";
import { Loader } from "shared/ui/Loader/Loader";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { HStack, VStack } from "shared/ui/Stack";
import { Profile } from "../../model/types/profile";
import classes from "./ProfileCard.module.scss";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency?: Currency) => void;
    onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
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
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <HStack
                className={classNames(classes.ProfileCard, {}, [
                    className,
                    classes.loading,
                ])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                justify="center"
                className={classNames(classes.ProfileCard, {}, [
                    className,
                    classes.error,
                ])}
            >
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t("Произошла ошибка при загрузке пользователя")}
                    text={t("Попробуйте обновить страницу")}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [classes.editing]: !readonly,
    };

    return (
        <VStack
            gap="8"
            max
            className={classNames(classes.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify="center" max className={classes.avatarWrapper}>
                    <Avatar alt="" src={data.avatar} />
                </HStack>
            )}
            <Input
                className={classes.input}
                value={data?.fisrt}
                placeholder={t("Введите имя")}
                onChange={onChangeFirstname}
                readOnly={readonly}
            />
            <Input
                className={classes.input}
                value={data?.lastname}
                placeholder={t("Введите фамилию")}
                onChange={onChangeLastname}
                readOnly={readonly}
            />
            <Input
                className={classes.input}
                value={data?.age}
                placeholder={t("Введите возраст")}
                onChange={onChangeAge}
                readOnly={readonly}
            />
            <Input
                className={classes.input}
                value={data?.city}
                placeholder={t("Введите город")}
                onChange={onChangeCity}
                readOnly={readonly}
            />
            <Input
                className={classes.input}
                value={data?.avatar}
                placeholder={t("Введите url аватара")}
                onChange={onChangeAvatar}
                readOnly={readonly}
            />
            <Input
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
