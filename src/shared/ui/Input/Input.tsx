import React, { InputHTMLAttributes, memo } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import classes from "./Input.module.scss";

// удаляем свойства value, onChange из типа InputHTMLAttributes<HTMLInputElement>, чтобы потом добавить свои
type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        value,
        className,
        onChange,
        type,
        placeholder,
        readOnly,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [classes.readonly]: readOnly,
    };

    return (
        <div className={classNames(classes.Input, mods, [className])}>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChangeHandler}
                readOnly={readOnly}
                {...otherProps}
            />
        </div>
    );
});
