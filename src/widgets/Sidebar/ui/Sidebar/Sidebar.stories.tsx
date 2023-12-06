// @ts-nocheck
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Sidebar } from "./Sidebar";
import { Theme } from "@/shared/const/theme";

export default {
    title: "widget/Sidebar",
    component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
