// @ts-nocheck
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Input } from "./Input";
import { Theme } from "@/shared/const/theme";

export default {
    title: "shared/Input",
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Light = Template.bind({});
Light.args = {
    value: "Text",
};

export const Dark = Template.bind({});
Dark.args = {
    value: "Text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
