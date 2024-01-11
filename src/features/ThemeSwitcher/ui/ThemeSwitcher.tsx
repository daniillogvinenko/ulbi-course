import React, { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import ThemeIconDeprecated from "@/shared/assets/icons/LightTheme.svg";
import ThemeIcon from "@/shared/assets/icons/theme.svg";
import { Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/const/theme";
import { saveJsonSettings } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui/redesigned/Icon";

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon Svg={ThemeIcon} clickable onClick={onToggleTheme} />}
            off={
                <ButtonDeprecated className={classNames("", {}, [className])} onClick={onToggleTheme}>
                    <IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} inverted />
                </ButtonDeprecated>
            }
        />
    );
});
