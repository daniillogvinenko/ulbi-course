/* eslint-disable i18next/no-literal-string */
import { useTranslation } from "react-i18next";
import { TextAlign } from "@/shared/ui/deprecated/Text";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import { Card } from "@/shared/ui/redesigned/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Input } from "@/shared/ui/redesigned/Input";
import { CurrencySelect } from "@/entities/Currency";
import { CountrySelect } from "@/entities/Country";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation();
    return (
        <HStack max justify="center">
            <Text
                align={TextAlign.CENTER}
                variant="error"
                title={t("Произошла ошибка при загрузке пользователя")}
                text={t("Попробуйте обновить страницу")}
            />
        </HStack>
    );
};

export const ProfileCardRedesignedSkeleton = () => (
    <Card padding="24" max>
        <VStack gap="32">
            <HStack max justify="center">
                <Skeleton border="100%" width={128} height={128} />
            </HStack>
            <HStack gap="32" max>
                <VStack gap="16" max>
                    <Skeleton border="18px" width="100%" height={38} />
                    <Skeleton border="18px" width="100%" height={38} />
                    <Skeleton border="18px" width="100%" height={38} />
                    <Skeleton border="18px" width="100%" height={38} />
                </VStack>
                <VStack gap="16" max>
                    <Skeleton border="18px" width="100%" height={38} />
                    <Skeleton border="18px" width="100%" height={38} />
                    <Skeleton border="18px" width="100%" height={38} />
                    <Skeleton border="18px" width="100%" height={38} />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
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
    const { t } = useTranslation();

    return (
        <Card max padding="24" className={className}>
            <VStack gap="32">
                {data?.avatar && (
                    <HStack justify="center" max>
                        <Avatar size={128} alt="" src={data.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            label="Имя:"
                            value={data?.fisrt}
                            placeholder={t("Введите имя")}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                        />
                        <Input
                            label="Фамилия:"
                            value={data?.lastname}
                            placeholder={t("Введите фамилию")}
                            onChange={onChangeLastname}
                            readonly={readonly}
                        />
                        <Input
                            label="Возраст:"
                            value={data?.age}
                            placeholder={t("Введите возраст")}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            label="Город:"
                            value={data?.city}
                            placeholder={t("Введите город")}
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            label="Аватар:"
                            value={data?.avatar}
                            placeholder={t("Введите url аватара")}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        <Input
                            label="Имя пользователя:"
                            value={data?.username}
                            placeholder={t("Введите имя пользователя")}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                        <CurrencySelect onChange={onChangeCurrency} value={data?.currency} readonly={readonly} />
                        <CountrySelect onChange={onChangeCountry} value={data?.country} readonly={readonly} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
