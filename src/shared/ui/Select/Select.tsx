import { ChangeEvent, memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Select.module.scss";

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
    const { className, label, options, onChange, value, readonly } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    // eslint-disable-next-line
    const optionList = useMemo(() => {
        return options?.map((opt) => (
            <option
                className={classes.option}
                value={opt.value}
                key={opt.value}
            >
                {opt.content}
            </option>
        ));
    }, [options]);

    return (
        <div className={classNames(classes.Wrapper, {}, [className])}>
            {label && <span className={classes.label}>{label}</span>}
            <select
                disabled={readonly}
                value={value}
                onChange={onChangeHandler}
                className={classes.select}
                name=""
                id=""
            >
                {optionList}
            </select>
        </div>
    );
});
