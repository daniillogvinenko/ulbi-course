import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { Select } from "./Select";

export default {
    title: "shared/Select",
    component: Select,
    // тут можно прокинуть какие-то пропсы для каждой сторис
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const LightSelect = Template.bind({});
LightSelect.args = {
    label: "Укажите значение",
    options: [
        { value: "123", content: "First option" },
        { value: "234", content: "Second option" },
        { value: "345", content: "Third option" },
    ],
};

export const DarkSelect = Template.bind({});
DarkSelect.args = {
    label: "Укажите значение",
    options: [
        { value: "123", content: "First option" },
        { value: "234", content: "Second option" },
        { value: "345", content: "Third option" },
    ],
};
DarkSelect.decorators = [ThemeDecorator(Theme.DARK)];
