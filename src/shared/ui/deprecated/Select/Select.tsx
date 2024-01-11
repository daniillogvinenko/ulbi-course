import { ChangeEvent, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Select.module.scss";

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

/**
 * @deprecated
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, onChange, value, readonly } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    // eslint-disable-next-line
    const optionList = useMemo(() => {
        return options?.map((opt) => (
            <option className={classes.option} value={opt.value} key={opt.value}>
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
};
