import { Theme, useTheme } from "app/providers/ThemeProvider";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import DarkIcon from "shared/assets/icons/DarkTheme.svg"; // преобразовывается в реакт компоненты
import LightIcon from "shared/assets/icons/LightTheme.svg";
import Button from "shared/ui/Button/Button";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            className={classNames("", {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
};
