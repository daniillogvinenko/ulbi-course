// @ts-nocheck
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import LoginForm from "./LoginForm";
import { Theme } from "@/shared/const/theme";

export default {
    title: "features/LoginForm",
    component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({ login: { username: "MyUserName", password: "123" } })];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({ login: { username: "MyUserName", password: "123" } }), ThemeDecorator(Theme.DARK)];

export const LightError = Template.bind({});
LightError.args = {};
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
DarkError.args = {};
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
