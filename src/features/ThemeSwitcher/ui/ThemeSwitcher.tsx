import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import ThemeIcon from "@/shared/assets/icons/LightTheme.svg";
import { Button } from "@/shared/ui/deprecated/Button";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/const/theme";
import { saveJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Icon } from "@/shared/ui/deprecated/Icon";

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
            <Icon Svg={ThemeIcon} width={40} height={40} inverted />
        </Button>
    );
});
