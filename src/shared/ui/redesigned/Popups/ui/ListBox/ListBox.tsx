import { Fragment, ReactNode } from "react";
import { Listbox as HListbox } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import classes from "./ListBox.module.scss";
import { Button } from "../../../Button/Button";
import { mapDirectionClass } from "../../styles/consts";
import popupClasses from "../../styles/popup.module.scss";
import { HStack } from "../../../../redesigned/Stack";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";
import { Icon } from "../../../Icon";

export interface ListBoxItem<T extends string> {
    // value: string;
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const { className, items, defaultValue, value, onChange, readonly, direction = "bottom right", label } = props;

    const optionsClasses = [mapDirectionClass[direction], popupClasses.menu];

    const selectedItem = items?.find((item) => item.value === value);

    return (
        <HStack gap="16">
            {label && <span>{label}</span>}
            <HListbox
                disabled={readonly}
                as="div"
                className={classNames(classes.ListBox, {}, [className, popupClasses.popup])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button
                    as={Button}
                    className={popupClasses.trigger}
                    addonRight={<Icon Svg={ArrowIcon} />}
                    disabled={readonly}
                    variant="filled"
                >
                    {selectedItem?.content ?? defaultValue}
                </HListbox.Button>
                <HListbox.Options className={classNames(classes.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListbox.Option key={item.value} value={item.value} disabled={item.disabled} as={Fragment}>
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        classes.item,
                                        {
                                            [popupClasses.active]: active,
                                            [popupClasses.disabled]: item.disabled,
                                            [popupClasses.selected]: selected,
                                        },
                                        []
                                    )}
                                >
                                    {selected}
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
