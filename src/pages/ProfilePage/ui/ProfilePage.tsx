import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";
import { EditableProfileCard } from "features/editableProfileCard";
import { classNames } from "shared/lib/classNames/classNames";
import { VStack } from "shared/ui/Stack/VStack/VStack";
// eslint-disable-next-line max-len
import { EditableProfileCardHeader } from "features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import classes from "./ProfilePage.module.scss";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    if (!id) return <Text text={t("Профиль не найден")} />;

    return (
        <Page className={classNames(classes.ProfilePage, {}, [className])}>
            <VStack max gap="16">
                <EditableProfileCardHeader />
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
