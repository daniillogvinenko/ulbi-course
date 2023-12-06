// @ts-nocheck
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Navbar } from "./Navbar";
import { Theme } from "@/shared/const/theme";

export default {
    title: "widget/Navbar",
    component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        login: {},
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    StoreDecorator({
        login: {},
    }),
    ThemeDecorator(Theme.DARK),
];

export const Auth = Template.bind({});
Auth.args = {};
Auth.decorators = [
    StoreDecorator({
        user: { authData: { username: "admin", id: "1" } },
    }),
    ThemeDecorator(Theme.DARK),
];
