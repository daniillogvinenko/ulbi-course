import { ListBox } from "@/shared/ui/redesigned/Popups";
import { getFeatureFlag, updateFeatureFlag } from "@/shared/lib/features";
import { ListBoxItem } from "@/shared/ui/redesigned/Popups/ui/ListBox/ListBox";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";

interface uiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = (props: uiDesignSwitcherProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const isAppRedesigned = getFeatureFlag("isAppRedesigned");

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
        }
    };

    return (
        <HStack gap="16">
            <Text title="Вариант интерфейса" />
            <ListBox onChange={onChange} items={items} value={isAppRedesigned ? "new" : "old"} className={className} />
        </HStack>
    );
};
