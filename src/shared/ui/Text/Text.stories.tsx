// @ts-nocheck
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { Text, TextTheme } from "./Text";

export default {
    title: "shared/Text",
    component: Text,
    // тут можно прокинуть какие-то пропсы для каждой сторис
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Light = Template.bind({});
Light.args = {
    title: "TITLE",
    text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
};

export const Dark = Template.bind({});
Dark.args = {
    title: "TITLE",
    text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorLight = Template.bind({});
ErrorLight.args = {
    title: "TITLE",
    text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
    theme: TextTheme.ERROR,
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
    title: "TITLE",
    text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
    theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];
