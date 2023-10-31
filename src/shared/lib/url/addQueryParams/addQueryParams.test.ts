import { getQueryParams } from "./addQueryParams";

describe("shared/url/addQueryParams", () => {
    test("test with one param", () => {
        const params = getQueryParams({
            test: "value",
        });
        expect(params).toBe("?test=value");
    });
    test("test with two params", () => {
        const params = getQueryParams({
            test: "value",
            second: "value2",
        });
        expect(params).toBe("?test=value&second=value2");
    });
    test("test with one of two undefined", () => {
        const params = getQueryParams({
            test: "value",
            second: undefined,
        });
        expect(params).toBe("?test=value");
    });
});
