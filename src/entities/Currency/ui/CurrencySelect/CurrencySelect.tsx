import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { Currency } from "../../model/types/Currency";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, onChange, value, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
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
                    defaultValue={t("Укажите валюту")}
                    direction="top right"
                    label={t("Укажите валюту")}
                />
            }
            on={
                <ListBox
                    readonly={readonly}
                    className={className}
                    onChange={onChangeHandler}
                    value={value}
                    items={options}
                    defaultValue={t("Укажите валюту")}
                    direction="top right"
                    label={t("Укажите валюту")}
                />
            }
        />
    );
});
