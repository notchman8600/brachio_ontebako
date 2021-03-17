import {eventChannel} from 'redux-saga';
import {all, call, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects';
import * as socketActions from '../redux/socket/action';
import socketSlice, {SocketState} from "../redux/socket/socket";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_DATA_SAGA} from "../redux/socket/action";
import messageSlice from "../redux/chat/slice";
import LaneManager from "../LaneManager";

function createSocketConnections() {
    const socketUrl = process.env.REACT_APP_SOCKET_URL || "ws://localhost:8080/ws"
    const socket = new WebSocket(socketUrl)
    return new Promise((resolve, reject) => {
        //WebSocketのエラー処理
        socket.onerror = (ev) => {
            ////console.log("Error")
            // //console.log(ev);
            reject(ev);
        };
        //WebSocket通信が導通したとき
        socket.onopen = (ev) => {
            // //console.log(ev);
            // ////console.log("Opened")
            socket.send(`{"action":"MEIDO_FUN"}`);
            //   socket.send(``)
            resolve(socket);
        };
    });
}

//Todo ここの実装が膨らみそう...
//Todo typescript is 何？になってる
function subscribe(socket: WebSocket) {
    return eventChannel(emit => {
            //WebSocketの受信処理
            socket.onmessage = (ev: MessageEvent) => {
                // //console.log(ev)
                // emit(socketSlice.actions.fetchMeidoStatusMessage("しおかぜ"));
                //console.log("Received")
                const jsonObj = JSON.parse(ev.data)
                //console.log(jsonObj)

                switch (jsonObj.action) {
                    case "LOVE_MESSAGE": {
                        const stringArray: string[] = jsonObj.messages
                        let message = ""
                        stringArray.forEach((str: string, index: number) => {
                            if (index === 0)
                                message += str
                            else
                                message += `<br> + <p>${str}</p>`
                        })
                        console.log("Debug: ", message)
                        console.log("Score: ",jsonObj.score)
                        //console.log(stringArray)
                        //最新データを追加
                        emit(messageSlice.actions.loveMessages(stringArray))
                        emit(messageSlice.actions.loveMessage(""))
                        emit(messageSlice.actions.progressPoint(jsonObj.score))
                        // emit(messageSlice.actions.notifyUpdateMessage(true))
                    }
                        break;
                    case "POST_MESSAGE": {
                        let laneNum = LaneManager.getNextLaneNumber()
                        //console.log("Recieved message!\nNext Lane Num is ", laneNum)

                        switch (laneNum) {
                            case 1:
                                emit(messageSlice.actions.laneMessage1(jsonObj.message))
                                break;
                            case 2:
                                emit(messageSlice.actions.laneMessage2(jsonObj.message))
                                break;
                            case 3:
                                emit(messageSlice.actions.laneMessage3(jsonObj.message))
                                break;
                            case 4:
                                emit(messageSlice.actions.laneMessage4(jsonObj.message))
                                break;
                            case 5:
                                emit(messageSlice.actions.laneMessage5(jsonObj.message))
                                break;
                            case 6:
                                emit(messageSlice.actions.laneMessage6(jsonObj.message))
                                break;
                            case 7:
                                emit(messageSlice.actions.laneMessage7(jsonObj.message))
                                break;
                            case 8:
                                emit(messageSlice.actions.laneMessage8(jsonObj.message))
                                break;
                            default:
                                emit(messageSlice.actions.laneMessage1(jsonObj.message))
                        }
                        // emit(messageSlice.actions.laneMessage1(jsonObj.message))
                    }
                        break;
                    case "ERROR_MESSAGE": {
                        //パース
                        emit(socketSlice.actions.fetchMeidoStatusMessage(jsonObj.status))
                    }
                        break;
                    case "MEIDO_STATUS": {
                        emit(socketSlice.actions.fetchMeidoStatusMessage(jsonObj.status))
                    }
                        break;
                    case "SYSTEM_STATUS": {
                        emit(socketSlice.actions.fetchSystemStatusMessage(jsonObj.status))
                    }
                        break;
                    case "MEIDO_MESSAGE": {
                        //Todo ここだけあと
//                    emit(socketSlice.actions.fetchMeidoMessage(jsonObj.))
                    }
                        break;
                    case "MEIDO_VOTE": {
                        //Todo ここもあと
                    }
                        break;
                    case "POST_DOOR": {
                        emit(socketSlice.actions.fetchDoorStatus(jsonObj.status))
                    }
                        break;
                    case "MEIDO_COUNT": {
                        //Todo ここチェック
                        const num = jsonObj.count as number
                        //console.log(num)
                        emit(socketSlice.actions.fetchConnectUserCount(num))
                    }
                        break;
                    case "MEIDO_FUN": {
                        emit(socketSlice.actions.fetchMeidoMessage(jsonObj.message))
                    }
                        break;

                    default:
                        break;
                }
            };


            //WebSocketの通信を切ったとき
            socket.onclose = (ev) => {
                //console.log("Closed");
                //console.log(ev);
            };

            const unsubscribe = () => {
                // socket.close()
                //console.log("Closing");
                //socket.onmessage = null;
            };

            return unsubscribe;
        }
    )
}

function* writeStatus(socket: WebSocket) {

    // @ts-ignore
    const channel = yield call(subscribe, socket);

    while (true) {
        // @ts-ignore
        const action = yield take(channel);
        yield put(action);
    }

}


function* continueConnection(socket: WebSocket) {
    setInterval(() => {
        socket.send(`{"action":"SYSTEM_STATUS"}`)
        //console.log("Try connecting...")
    }, 15000)

}

function* watchOnSocket() {
    // while (true) {
    try {
        //console.log("Preference for Connecting")
        // @ts-ignore
        const webSocket = yield call(createSocketConnections);
        //イベント待ち
        yield fork(sendRequestRoutine, webSocket)
        yield fork(continueConnection, webSocket)
        yield fork(writeStatus, webSocket);

        // while (true) {
        //     //yield fork(syncStatus, webSocket);
        //
        // }
    } catch (err) {
        //console.log('Socket Error', err);
    }
    // }
}

function* sendRequestRoutine(socket: WebSocket) {
    // const webSocket = yield call(createSocketConnections);
    while (true) {
        // @ts-ignore
        const payload = yield take(FETCH_DATA_SAGA)

        //ペイロードのパースの責務はここでは負わない
        //console.log(payload.payload)

        //Socket通信
        socket.send(payload.payload)
        // socket.send(`{"action":"MEIDO_STATUS"}`)

        ////console.log("hogehogehoge")
    }
}

export default function* rootSaga() {

    yield all([
        fork(watchOnSocket)
    ]);
}

