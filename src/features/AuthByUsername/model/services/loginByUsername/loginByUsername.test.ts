import { Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import axios from "axios";
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/testAsyncThunk";
import { loginByUsername } from "./loginByUsername";

// 36 урок, ничего не понял

jest.mock("axios");

const mockedAxios = jest.mocked(axios, true);

describe("loginByUsername", () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test("success", async () => {
        const userValue = { username: "123", id: "1" };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({
            username: "123",
            password: "123",
        });

        expect(mockedAxios.post).toBeCalled();
        expect(result.meta.requestStatus).toEqual("fulfilled");
        expect((await result).payload).toEqual(userValue);
    });
    test("error", async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({
            username: "123",
            password: "123",
        });

        expect(mockedAxios.post).toBeCalled();
        expect(result.meta.requestStatus).toEqual("rejected");
    });
});
