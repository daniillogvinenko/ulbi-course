/* eslint-disable i18next/no-literal-string */
import { classNames } from "shared/lib/classNames/classNames";
import { Fragment, ReactNode } from "react";
import { DropdownDirection } from "shared/types/ui";
import { Menu } from "@headlessui/react";
import classes from "./Dropdown.module.scss";
import { AppLink } from "../AppLink/AppLink";

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

const mapDirectionClass: Record<DropdownDirection, string> = {
    "bottom left": classes.optionsBottomLeft,
    "bottom right": classes.optionsBottomRight,
    "top left": classes.optionsTopLeft,
    "top right": classes.optionsTopRight,
};

export function Dropdown(props: DropdownProps) {
    const { className, items, trigger, direction = "bottom left" } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            as="div"
            className={classNames(classes.Dropdown, {}, [className])}
        >
            <Menu.Button className={classes.button}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(classes.menu, {}, menuClasses)}>
                {items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            disabled={item.disabled}
                            type="button"
                            onClick={item.onClick}
                            className={classNames(
                                classes.item,
                                { [classes.active]: active },
                                []
                            )}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            // если указать as=AppLink, то у Menu.Item появятся пропсы AppLink'a (такие как to)
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
