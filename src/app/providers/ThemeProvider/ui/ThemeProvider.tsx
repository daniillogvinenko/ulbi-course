import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../../../../shared/lib/context/ThemeContext";
import { Theme } from "@/shared/const/theme";
import { useJsonSettings } from "@/entities/User";

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;

    const { theme: defaultTheme = Theme.DARK } = useJsonSettings();
    const [isThemeInited, setIsThemeInited] = useState(false);

    // либо достаем initialState из пропсов, если он есть, либо из defaultTheme выше
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    // 127 22:30
    useEffect(() => {
        if (!isThemeInited) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

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
