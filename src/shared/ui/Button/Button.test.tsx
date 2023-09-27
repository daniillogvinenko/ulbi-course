import { render, screen } from "@testing-library/react";
import Button, { ThemeButton } from "./Button";

describe("Button component", () => {
    test("test", () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText("TEST")).toBeInTheDocument();
    });
    test("test 2", () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText("TEST")).toHaveClass("clear");
        screen.debug();
    });
});
