import {combineReducers, Store} from "redux";
import messageSlice, {initialState as initialMessageState} from "./redux/chat/slice";

import createSagaMiddleware from "@redux-saga/core";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import logger from "redux-logger";
import socketSlice from "./redux/socket/socket";
import {initialState as initialSocketState} from "./redux/socket/socket"
import rootSaga from "./saga/root";

const rootReducer = combineReducers({
    messageState: messageSlice.reducer,
    socket: socketSlice.reducer,
});


const preLoadedState = () => {
    return {messageState: initialMessageState, socket: initialSocketState}
};

export type StoreState = ReturnType<typeof preLoadedState>;
export type ReduxStore = Store<StoreState>;

const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();


    const middlewareList = [...getDefaultMiddleware(), sagaMiddleware, logger]
    // sagaMiddleware.run(rootSaga)
    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewareList,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: preLoadedState(),
    })
    sagaMiddleware.run(rootSaga)
    return store;
}

export default createStore


