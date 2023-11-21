import { StateSchema } from "@/app/providers/StoreProvider";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "./articleDetails";

describe("getProfileData", () => {
    test("test", () => {
        const data = {
            id: "1",
            title: "title",
            subtitle: "subtitle",
        };
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });
    test("empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });
    // можно написать тесты на остальные селекторы
});
