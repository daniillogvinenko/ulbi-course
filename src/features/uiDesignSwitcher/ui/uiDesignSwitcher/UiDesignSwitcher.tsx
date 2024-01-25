import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { getFeatureFlag, updateFeatureFlag } from "@/shared/lib/features";
import { ListBoxItem } from "@/shared/ui/redesigned/Popups/ui/ListBox/ListBox";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { useForceUpdate } from "@/shared/lib/render/forceUpdate";

interface uiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = (props: uiDesignSwitcherProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAppRedesigned = getFeatureFlag("isAppRedesigned");
    const { t } = useTranslation();

    const forceUpdate = useForceUpdate();

    const items: ListBoxItem<string>[] = [
        {
            content: "Новый",
            value: "new",
        },
        {
            content: "Старый",
            value: "old",
        },
    ];

    const onChange = (value: string) => {
        if (authData) {
            dispatch(
                updateFeatureFlag({
                    userId: authData?.id,
                    newFeatures: {
                        isAppRedesigned: value === "new",
                    },
                })
            );
            forceUpdate();
        }
    };

    return (
        <HStack gap="16">
            <Text title={t("Вариант интерфейса")} />
            <ListBox onChange={onChange} items={items} value={isAppRedesigned ? "new" : "old"} className={className} />
        </HStack>
    );
};
