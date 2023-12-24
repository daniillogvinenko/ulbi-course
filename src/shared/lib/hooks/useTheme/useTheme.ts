/* eslint indent: 0 */ // --> OFF
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Theme } from "@/shared/const/theme";

interface useThemeResult {
    // в toggleTheme передаем действие которое будет происходить при переключении темы.
    // То есть мы передаем функцию, которая будет сохранять новую тему в стейт/локал сторейдж и т.д.
    toggleTheme: (saveAction: (theme: Theme) => void) => void;
    theme: Theme;
}

// кастомный хук для работы с темой
export function useTheme(): useThemeResult {
    const { setTheme, theme } = useContext(ThemeContext);

    const toggleTheme = (saveAction: (theme: Theme) => void) => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                newTheme = Theme.ORANGE;
                break;
            case Theme.ORANGE:
                newTheme = Theme.DARK;
                break;

            default:
                newTheme = Theme.LIGHT;
                break;
        }
        document.body.className = newTheme;
        // chaining оператор для функции
        setTheme?.(newTheme);

        saveAction?.(newTheme);
    };

    return { theme: theme || Theme.LIGHT, toggleTheme };
}
