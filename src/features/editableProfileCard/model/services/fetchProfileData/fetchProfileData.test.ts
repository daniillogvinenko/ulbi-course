import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchProfileData } from "./fetchProfileData";

const data = {
    username: "admin",
    age: 22,
    country: Country.Belarus,
    lastname: "Logvinenko",
    fisrt: "Daniil",
    city: "asdgas",
    currency: Currency.RUB,
};

describe("fetchProfileData", () => {
    test("success", async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk("1");

        // ожидаем, что вызвался get запрос
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(data);
    });
    test("error", async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk("1");

        expect(result.meta.requestStatus).toBe("rejected");
    });
});
