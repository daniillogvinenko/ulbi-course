import { Fragment, ReactNode, useState } from "react";
import { Mods, classNames } from "shared/lib/classNames/classNames";
import { Listbox as HListbox } from "@headlessui/react";
import classes from "./ListBox.module.scss";
import Button, { ButtonTheme } from "../Button/Button";
import { Text } from "../Text/Text";
import { HStack } from "../Stack";

interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DropdownDirection = "top" | "bottom";

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: classes.optionsottom,
    top: classes.optionsTop,
};

export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        defaultValue,
        value,
        onChange,
        readonly,
        direction = "bottom",
        label,
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="16">
            {label && <span>{label}</span>}
            <HListbox
                disabled={readonly}
                as="div"
                className={classNames(classes.ListBox, {}, [className])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button
                    disabled={readonly}
                    className={classes.trigger}
                >
                    <Button disabled={readonly} theme={ButtonTheme.OUTLINE}>
                        {value ?? defaultValue}
                    </Button>
                </HListbox.Button>
                <HListbox.Options
                    className={classNames(classes.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListbox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        classes.item,
                                        {
                                            [classes.active]: active,
                                            [classes.disabled]: item.disabled,
                                        },
                                        []
                                    )}
                                >
                                    {selected && "!!! "}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>
    );
}
