import { classNames } from "./classNames";

describe("classNames", () => {
  test("test", () => {
    expect(classNames("someClass")).toBe("someClass");
  });
  test("test", () => {
    expect(classNames("someClass", { a: true, b: false })).toBe("someClass a");
  });
  test("test", () => {
    expect(classNames("someClass", { a: true, b: false }, ["add"])).toBe(
      "someClass a add"
    );
  });
  test("test", () => {
    expect(
      classNames("someClass", { a: true, b: false, c: true }, ["add", "add2"])
    ).toBe("someClass a c add add2");
  });
  test("test", () => {
    expect(classNames("someClass", {}, ["add", "add2"])).toBe(
      "someClass add add2"
    );
  });
});
