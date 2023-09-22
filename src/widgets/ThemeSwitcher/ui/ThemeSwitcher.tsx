import { useTheme } from "app/providers/ThemeProvider";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={classNames(classes.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      TOGGLE
    </button>
  );
};
