import { addDecorator } from "@storybook/react";
// eslint-disable-next-line max-len
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator";
// eslint-disable-next-line max-len
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
// eslint-disable-next-line max-len
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import { Theme } from "../../src/app/providers/ThemeProvider";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

// Глобально навесить декораторы
addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
