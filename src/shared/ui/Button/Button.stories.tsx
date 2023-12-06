// @ts-nocheck
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import Button, { ButtonSize, ButtonTheme } from "./Button";

export default {
    title: "shared/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: "Text",
};

export const Clear = Template.bind({});
Clear.args = {
    children: "Text",
    theme: ButtonTheme.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: "Text",
    theme: ButtonTheme.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
    children: "Text",
    theme: ButtonTheme.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: "Text",
    theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Background = Template.bind({});
Background.args = {
    children: "Text",
    theme: ButtonTheme.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: "Text",
    theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const squareM = Template.bind({});
squareM.args = {
    square: true,
    size: ButtonSize.M,
    children: ">",
    theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const squareL = Template.bind({});
squareL.args = {
    square: true,
    size: ButtonSize.L,
    children: ">",
    theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const squareXL = Template.bind({});
squareXL.args = {
    square: true,
    size: ButtonSize.XL,
    children: ">",
    theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const outlineM = Template.bind({});
outlineM.args = {
    size: ButtonSize.M,
    children: "Button",
    theme: ButtonTheme.OUTLINE,
};

export const outlineL = Template.bind({});
outlineL.args = {
    size: ButtonSize.L,
    children: "Button",
    theme: ButtonTheme.OUTLINE,
};

export const outlineXL = Template.bind({});
outlineXL.args = {
    size: ButtonSize.XL,
    children: "Button",
    theme: ButtonTheme.OUTLINE,
};
