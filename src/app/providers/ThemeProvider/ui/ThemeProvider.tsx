import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../../../../shared/lib/context/ThemeContext";
import { Theme } from "@/shared/const/theme";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage";

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;
    // берем дефолтное значение из локал сторейджа, если локал сторейдж пустой - устанавливаем
    // светлую тему
    const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

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

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
