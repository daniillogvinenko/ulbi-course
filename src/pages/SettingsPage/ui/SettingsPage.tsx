import { useTranslation } from "react-i18next";
import { UiDesignSwitcher } from "@/features/uiDesignSwitcher";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { Page } from "@/widgets/Page";

const SettingsPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <VStack gap="16">
                <Text title={t("Настройки")} />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
};

export default SettingsPage;
