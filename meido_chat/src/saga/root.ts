import {all, fork} from "redux-saga/effects";
import socket from './socket'

export default function* rootSaga() {
    yield all([
        fork(socket)
    ])
}
