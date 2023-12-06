import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import AboutPage from "./AboutPage";
import { Theme } from "@/shared/const/theme";

export default {
    title: "pages/AboutPage",
    component: AboutPage,
    // тут можно прокинуть какие-то пропсы для каждой сторис
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
