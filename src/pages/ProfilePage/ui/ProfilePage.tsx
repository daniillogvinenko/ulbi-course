import { useParams } from "react-router-dom";
import { EditableProfileCard, EditableProfileCardHeader } from "@/features/editableProfileCard";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import classes from "./ProfilePage.module.scss";
import { Page } from "@/widgets/Page";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

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
