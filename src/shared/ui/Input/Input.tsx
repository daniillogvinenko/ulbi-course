import React, { InputHTMLAttributes, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Input.module.scss";

// удаляем свойства value, onChange из типа InputHTMLAttributes<HTMLInputElement>, чтобы потом добавить свои
type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const { value, className, onChange, type, placeholder, ...otherProps } =
        props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(classes.Input, {}, [className])}>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
        </div>
    );
});
