import { Fragment, ReactNode, useState } from "react";
import { Listbox as HListbox } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import classes from "./ListBox.module.scss";
import Button, { ButtonTheme } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { mapDirectionClass } from "../../styles/consts";
import popupClasses from "../../styles/popup.module.scss";

interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

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

export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        defaultValue,
        value,
        onChange,
        readonly,
        direction = "bottom right",
        label,
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="16">
            {label && <span>{label}</span>}
            <HListbox
                disabled={readonly}
                as="div"
                className={classNames(classes.ListBox, {}, [
                    className,
                    popupClasses.popup,
                ])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button
                    disabled={readonly}
                    className={popupClasses.trigger}
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
                                            [popupClasses.active]: active,
                                            [popupClasses.disabled]:
                                                item.disabled,
                                        },
                                        []
                                    )}
                                >
                                    {selected && "-> "}
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
