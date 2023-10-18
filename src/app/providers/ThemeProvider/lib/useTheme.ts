/* eslint indent: 0 */ // --> OFF
import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface useThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

// кастомный хук для работы с темой
export function useTheme(): useThemeResult {
    const { setTheme, theme } = useContext(ThemeContext);

    const toggleTheme = () => {
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
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme: theme || Theme.LIGHT, toggleTheme };
}
