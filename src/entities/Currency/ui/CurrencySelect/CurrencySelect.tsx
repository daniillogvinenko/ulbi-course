import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Select } from "shared/ui/Select/Select";
import { Currency } from "../../model/types/Currency";

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
        <ListBox
            readonly={readonly}
            className={className}
            onChange={onChangeHandler}
            value={value}
            items={options}
            defaultValue={t("Укажите валюту")}
            direction="top"
            label={t("Укажите валюту")}
        />
    );

    // return (
    //     <Select
    //         className={classNames("", {}, [className])}
    //         label={t("Укажите валюту")}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});
