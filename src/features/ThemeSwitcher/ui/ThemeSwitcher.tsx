import React, { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import DarkIcon from "@/shared/assets/icons/DarkTheme.svg"; // преобразовывается в реакт компоненты
import LightIcon from "@/shared/assets/icons/LightTheme.svg";
// eslint-disable-next-line ulbi-tv-plugin/path-checker
import { Button } from "@/shared/ui/Button";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/const/theme";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button className={classNames("", {}, [className])} onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
});
