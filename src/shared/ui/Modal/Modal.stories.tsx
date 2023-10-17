// @ts-nocheck
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { Modal } from "./Modal";

export default {
    title: "shared/Modal",
    component: Modal,
    // тут можно прокинуть какие-то пропсы для каждой сторис
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const LightModal = Template.bind({});
LightModal.args = {
    children: "lorem ipsum",
    isOpen: true,
};

export const DarkModal = Template.bind({});
DarkModal.args = {
    children: "lorem ipsum",
    isOpen: true,
};
DarkModal.decorators = [ThemeDecorator(Theme.DARK)];
