import { Fragment, ReactNode } from "react";
import { Menu } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import classes from "./Dropdown.module.scss";
import { AppLink } from "../../../AppLink/AppLink";
import { mapDirectionClass } from "../../styles/consts";
import popupClasses from "../../styles/popup.module.scss";

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger?: ReactNode;
    direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
    const { className, items, trigger, direction = "bottom left" } = props;

    const menuClasses = [mapDirectionClass[direction], popupClasses.menu];

    return (
        <Menu as="div" className={classNames(classes.Dropdown, {}, [className, popupClasses.popup])}>
            <Menu.Button className={popupClasses.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(classes.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            disabled={item.disabled}
                            type="button"
                            onClick={item.onClick}
                            className={classNames(classes.item, { [popupClasses.active]: active }, [])}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            // если указать as=AppLink, то у Menu.Item появятся пропсы AppLink'a (такие как to)
                            <Menu.Item
                                key={`dropdown-key-${index}`}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item key={`dropdown-key-${index}`} as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
