import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import LoginForm from "./LoginForm";

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
Light.decorators = [
    StoreDecorator({ login: { username: "MyUserName", password: "123" } }),
];

export const Dark = Template.bind({});
Dark.args = {
    value: "Text",
};
Dark.decorators = [
    StoreDecorator({ login: { username: "MyUserName", password: "123" } }),
    ThemeDecorator(Theme.DARK),
];

export const LightError = Template.bind({});
LightError.args = {
    value: "Text",
};
LightError.decorators = [
    StoreDecorator({
        login: {
            username: "MyUserName",
            password: "123",
            error: "Ошибка",
        },
    }),
];

export const DarkError = Template.bind({});
DarkError.args = {
    value: "Text",
};
DarkError.decorators = [
    StoreDecorator({
        login: {
            username: "MyUserName",
            password: "123",
            error: "Ошибка",
        },
    }),
    ThemeDecorator(Theme.DARK),
];
