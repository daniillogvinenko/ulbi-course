import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18nForTests from "shared/config/i18n/i18nForTests";
import { MemoryRouter } from "react-router-dom";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { DeepPartial } from "@reduxjs/toolkit";

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
        <StoreProvider initialState={initialState as StateSchema}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>
    );
}
