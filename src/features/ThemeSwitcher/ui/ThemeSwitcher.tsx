import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import DarkIcon from "@/shared/assets/icons/DarkTheme.svg"; // преобразовывается в реакт компоненты
import LightIcon from "@/shared/assets/icons/LightTheme.svg";
// eslint-disable-next-line ulbi-tv-plugin/path-checker
import { Button } from "@/shared/ui/Button";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/const/theme";
import { saveJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();
    const onToggleTheme = useCallback(() => {
        toggleTheme((newTheme: Theme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme, dispatch]);

    return (
        <Button className={classNames("", {}, [className])} onClick={onToggleTheme}>
            {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
});
