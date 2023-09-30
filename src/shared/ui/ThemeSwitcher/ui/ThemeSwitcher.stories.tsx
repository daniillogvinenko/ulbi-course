import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default {
    title: "shared/ThemeSwitcher",
    component: ThemeSwitcher,
    // тут можно прокинуть какие-то пропсы для каждой сторис
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => (
    <ThemeSwitcher {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
