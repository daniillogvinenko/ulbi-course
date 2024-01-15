import { UiDesignSwitcher } from "@/features/uiDesignSwitcher";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { Page } from "@/widgets/Page";

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = (props: SettingsPageProps) => {
    const { className } = props;

    return (
        <Page>
            <VStack gap="16">
                <Text title="Настройки" />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
};

export default SettingsPage;
