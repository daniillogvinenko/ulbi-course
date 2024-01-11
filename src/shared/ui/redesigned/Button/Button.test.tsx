import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component", () => {
    test("test", () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText("TEST")).toBeInTheDocument();
    });
    test("test 2", () => {
        render(<Button variant="clear">TEST</Button>);
        expect(screen.getByText("TEST")).toHaveClass("clear");
        screen.debug();
    });
});
