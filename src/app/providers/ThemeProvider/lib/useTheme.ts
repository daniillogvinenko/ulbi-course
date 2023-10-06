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
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        document.body.className = newTheme;
        setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme, toggleTheme };
}
