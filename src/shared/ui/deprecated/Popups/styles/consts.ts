import { DropdownDirection } from "@/shared/types/ui";
import classes from "./popup.module.scss";

export const mapDirectionClass: Record<DropdownDirection, string> = {
    "bottom left": classes.optionsBottomLeft,
    "bottom right": classes.optionsBottomRight,
    "top left": classes.optionsTopLeft,
    "top right": classes.optionsTopRight,
};
