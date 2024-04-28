import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as appReducer} from "./app";

const reducers = combineReducers({
    app: appReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: reducers,
        devTools: true,
    });
}

export default setupStore();