import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ArticleAdditionalInfo.module.scss";
import { User } from "@/entities/User";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Text } from "@/shared/ui/redesigned/Text";
import { Button } from "@/shared/ui/redesigned/Button";

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

export const ArticleAdditionalInfo = (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation();

    return (
        <VStack gap="32" className={classNames(classes.ArticleAdditionalInfo, {}, [className])}>
            <HStack gap="8">
                <Avatar src={author.avatar} size={32} />
                <Text text={author.username} bold />
                <Text text={createdAt} />
            </HStack>
            <Button onClick={onEdit}>{t("Редактировать")}</Button>
            <Text text={t("{{count}} просмотров", { count: views })} />
        </VStack>
    );
};
