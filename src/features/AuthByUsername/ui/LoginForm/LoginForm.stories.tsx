import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { LoginForm } from "./LoginForm";

export default {
    title: "features/LoginForm",
    component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
);

export const Light = Template.bind({});
Light.args = {
    value: "Text",
};

export const Dark = Template.bind({});
Dark.args = {
    value: "Text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
