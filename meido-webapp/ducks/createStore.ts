import {Store, combineReducers} from "redux";
import logger from 'redux-logger'
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import meidoSlice, {initialState as meidoState} from './meido/slice';
import socketSlice, {initialState as socketState,} from './socket/socket';

import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../saga/root";

const rootReducer = combineReducers({
    statusMessage: meidoSlice.reducer,
    socket: socketSlice.reducer
});


const preLoadedState = () => {
    return {statusMessage: meidoState, socket: socketState}
};

export type  StoreState = ReturnType<typeof preLoadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewareList = [...getDefaultMiddleware(), sagaMiddleware, logger];
    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewareList,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: preLoadedState(),
    })

    sagaMiddleware.run(rootSaga);
    return store;
}

export default createStore;