import { classNames } from "./classNames";

describe("classNames", () => {
    test("basic", () => {
        expect(classNames("someClass")).toBe("someClass");
    });
    test("mods", () => {
        expect(classNames("someClass", { a: true, b: false })).toBe(
            "someClass a"
        );
    });
    test("mods and additional", () => {
        expect(classNames("someClass", { a: true, b: false }, ["add"])).toBe(
            "someClass a add"
        );
    });
    test("mods and multiple additional", () => {
        expect(
            classNames("someClass", { a: true, b: false, c: true }, [
                "add",
                "add2",
            ])
        ).toBe("someClass a c add add2");
    });
    test("multiple additional only", () => {
        expect(classNames("someClass", {}, ["add", "add2"])).toBe(
            "someClass add add2"
        );
    });
});
