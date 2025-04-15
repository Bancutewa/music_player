import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis"

export const getCurrent = createAsyncThunk(
    'user/getUser',
    async (data, { rejectWithValue }) => {
        const response = await apis.apiGetCurrent();
        console.log("response call api", response);

        if (!response.success) return rejectWithValue(response.error);
        return response.response;
    }
)