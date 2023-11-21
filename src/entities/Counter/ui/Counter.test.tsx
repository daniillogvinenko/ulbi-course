// eslint-disable-next-line
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { screen } from "@testing-library/react";
import { userEvent } from "@storybook/testing-library";
import { Counter } from "./Counter";

describe("Counter", () => {
    test("test 1", () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        });
        expect(screen.getByTestId("value-title")).toHaveTextContent("10");
    });
    test("increment", () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        });
        // userEvent в данном случае импортируем из storybook/testing-library!!! это ошибка Ульби, но работает, поэтому пусть будет
        userEvent.click(screen.getByTestId("increment-btn"));
        expect(screen.getByTestId("value-title")).toHaveTextContent("11");
    });
    test("decrement", () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        });
        // userEvent в данном случае импортируем из storybook/testing-library!!! это ошибка Ульби, но работает, поэтому пусть будет
        userEvent.click(screen.getByTestId("decrement-btn"));
        expect(screen.getByTestId("value-title")).toHaveTextContent("9");
    });
});
