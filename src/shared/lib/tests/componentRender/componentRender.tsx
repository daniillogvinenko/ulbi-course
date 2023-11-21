import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18nForTests from "@/shared/config/i18n/i18nForTests";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
}

export function componentRender(
    component: ReactNode,
    // этот синтиаксис - значение по умолчанию
    options: componentRenderOptions = {}
) {
    // этот синтиаксис - значение по умолчанию
    const { route = "/", initialState } = options;

    // всё это нужно для нормального тестирования, чтобы тестировать компоненты в условиях реального приложения со всеми обертками
    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState as StateSchema}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}
