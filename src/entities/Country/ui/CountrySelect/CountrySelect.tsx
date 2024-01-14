import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { Country } from "../../model/types/Country";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, onChange, value, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange]
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ListBoxDeprecated
                    readonly={readonly}
                    className={className}
                    onChange={onChangeHandler}
                    value={value}
                    items={options}
                    defaultValue={t("Укажите страну")}
                    direction="top right"
                    label={t("Укажите страну")}
                />
            }
            on={
                <ListBox
                    readonly={readonly}
                    className={className}
                    onChange={onChangeHandler}
                    value={value}
                    items={options}
                    defaultValue={t("Укажите страну")}
                    direction="top right"
                    label={t("Укажите страну")}
                />
            }
        />
    );
});
