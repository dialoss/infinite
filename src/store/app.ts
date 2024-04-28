import {createSlice} from "@reduxjs/toolkit";

interface IState {
    fetchSize: number
}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        fetchSize: 1000
    } as IState,
    reducers: {
        setSize: (state, {payload: size}) => {
            state.fetchSize = size;
        }
    }
});

export const {actions, reducer} = appSlice;