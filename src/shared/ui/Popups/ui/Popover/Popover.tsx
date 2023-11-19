import { Popover as HPopover } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import { ReactNode } from "react";
import { DropdownDirection } from "shared/types/ui";
import { mapDirectionClass } from "../../styles/consts";
import popupClasses from "../../styles/popup.module.scss";
import classes from "./Popover.module.scss";

interface PopoverProps {
    className?: string;
    trigger?: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const { className, direction = "bottom left", trigger, children } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover
            className={classNames(classes.Popover, {}, [
                className,
                popupClasses.popup,
            ])}
        >
            <HPopover.Button className={popupClasses.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(classes.panel, {}, menuClasses)}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
