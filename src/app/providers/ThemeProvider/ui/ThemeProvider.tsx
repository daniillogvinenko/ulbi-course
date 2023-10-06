// eslint-disable-next-line object-curly-newline
import React, { FC, useEffect, useMemo, useState } from "react";
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext,
} from "../lib/ThemeContext";

interface ThemeProviderProps {
    initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const { initialTheme, children } = props;
    // берем дефолтное значение из локал сторейджа, если локал сторейдж пустой - устанавливаем
    // светлую тему
    const defaultTheme =
        (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

    // либо достаем initialState из пропсов, если он есть, либо из defaultTheme выше
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

    // чел в комментах из 31 урока сказал, что он так сделал
    useEffect(() => {
        document.body.className = defaultTheme;
    }, [defaultTheme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
