import {eventChannel} from 'redux-saga';
import {all, call, fork, put, take} from 'redux-saga/effects';
import socketSlice, {CertMessage} from "../ducks/socket/socket";
import {FETCH_DATA_SAGA} from "../ducks/socket/action";
import {ACCEPT_MESSAGE, DENIED_MESSAGE, FURARETA, KUSO} from "../constants";

// import {sagaActions} from "../ducks/socket/action";

function createSocketConnections() {

    const socketUrl = process.env.REACT_APP_SOCKET_URL || "ws://localhost:8080/ws"
    const socket = new WebSocket(socketUrl)
    return new Promise((resolve, reject) => {

        //WebSocketのエラー処理
        socket.onerror = (ev: MessageEvent) => {
            //console.log("Error")
            // console.log(ev);
            reject(ev);
        };
        //WebSocket通信が導通したとき
        socket.onopen = (ev) => {
            // console.log(ev);
            // //console.log("Opened")
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
                // console.log(ev)
                // emit(socketSlice.actions.fetchMeidoStatusMessage("しおかぜ"));
                console.log("Received")
                const jsonObj = JSON.parse(ev.data)
                console.log(jsonObj)

                switch (jsonObj.action) {
                    case "LOVE_MESSAGE": {

                        // const stringArray: string[] = jsonObj.messages
                        // let message = ""
                        // stringArray.forEach((str: string, index: number) => {
                        //     if (index === 0)
                        //         message += str
                        //     else
                        //         message += `<br> + <p>${str}</p>`
                        // })
                        // console.log("Debug: ", message)
                        // console.log(stringArray)
                        //最新データを追加
                        //Cert部分を流用する
                        const certState: string = jsonObj.cert_message
                        const certMessage: CertMessage = {certStatus: jsonObj.cert_message, certUserName: ""}
                        if (certState === "SUCCESS") {
                            emit(socketSlice.actions.fetchAuthStatus(KUSO))
                            emit(socketSlice.actions.fetchCertMessage(certMessage))
                        } else {
                            emit(socketSlice.actions.fetchAuthStatus(FURARETA))
                            emit(socketSlice.actions.fetchCertMessage(certMessage))
                        }
                        emit(socketSlice.actions.sendMessage(jsonObj.send_message))
                        emit(socketSlice.actions.recvMessage(jsonObj.origin_message))
                        emit(socketSlice.actions.messageScore(jsonObj.score))





                        // emit(messageSlice.actions.notifyUpdateMessage(true))
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
                        console.log(num)
                        emit(socketSlice.actions.fetchConnectUserCount(num))
                    }
                        break;

                    case "MEIDO_FUN": {
                        emit(socketSlice.actions.fetchMeidoMessage(jsonObj.message))
                    }
                        break;
                    case "ACCEPT_USER_COUNT": {
                        emit(socketSlice.actions.fetchAcceptUserCount(jsonObj.count))

                    }
                        break;
                    case "DENIED_USER_COUNT": {
                        emit(socketSlice.actions.fetchDeniedUserCount(jsonObj.count))
                    }
                        break;
                    case "INCIDENT_LOG_COUNT": {
                        emit(socketSlice.actions.fetchIncidentLogCount(jsonObj.count))

                    }
                        break;
                    //Todo ここの2つのメッセージを実は統一できたりするんだが...
                    case "POST_ACCEPT_USER": {
                        const certMessage: CertMessage = {certStatus: jsonObj.status, certUserName: jsonObj.name}
                        emit(socketSlice.actions.fetchAuthStatus(ACCEPT_MESSAGE))
                        emit(socketSlice.actions.fetchCertMessage(certMessage))
                    }
                        break;
                    case "POST_DENIED_USER": {
                        const certMessage: CertMessage = {certStatus: jsonObj.status, certUserName: jsonObj.name}
                        //Todo 頭の悪い書き方だと思います
                        emit(socketSlice.actions.fetchAuthStatus(DENIED_MESSAGE))
                        emit(socketSlice.actions.fetchCertMessage(certMessage))
                    }
                        break;
                    case "NOTIFY_CURRENT_STATUS": {
                        emit(socketSlice.actions.fetchAcceptUserCount(jsonObj.accept_count))
                        emit(socketSlice.actions.fetchDeniedUserCount(jsonObj.denied_count))
                        emit(socketSlice.actions.fetchIncidentLogCount(jsonObj.error_count))
                        emit(socketSlice.actions.fetchConnectUserCount(jsonObj.connect_count))
                        emit(socketSlice.actions.apiCount(jsonObj.api_count))
                    }
                        break;
                    default:
                        break;
                }
            };


            //WebSocketの通信を切ったとき
            socket.onclose = (ev) => {
                console.log("Closed");
                console.log(ev);
            };

            const unsubscribe = () => {
                // socket.close()
                console.log("Closing");
                //socket.onmessage = null;
            };

            return unsubscribe;
        }
    )
}

const sleepAsync = async () => {
    console.log('start sleepAsync')
    await new Promise(r => setTimeout(r, 2000))
    console.log('finish sleepAsync')
}

function* writeStatus(socket: WebSocket) {

    const channel = yield call(subscribe, socket);

    while (true) {
        const action = yield take(channel);
        yield put(action);
    }

}

function* continueConnection(socket: WebSocket) {
    setInterval(() => {
        socket.send(`{"action":"SYSTEM_STATUS"}`)
        console.log("Try connecting...")
    }, 15000)
}

function* watchOnSocket() {
    //while (true) {
    if (typeof window !== "undefined") {
        try {
            console.log("Preference for Connecting")
            const webSocket = yield call(createSocketConnections);
            //イベント待ち
            yield fork(sendRequestRoutine, webSocket)
            yield fork(continueConnection, webSocket)
            //          while (true) {
            //yield fork(syncStatus, webSocket);

            yield fork(writeStatus, webSocket);
            //         }
        } catch (err) {
            console.log('Socket Error', err);
        }
        //}
    }
}

function* sendRequestRoutine(socket: WebSocket) {
    // const webSocket = yield call(createSocketConnections);
    while (true) {
        const payload = yield take(FETCH_DATA_SAGA)

        //ペイロードのパースの責務はここでは負わない
        console.log(payload.payload)

        //Socket通信
        socket.send(payload.payload)
        // socket.send(`{"action":"MEIDO_STATUS"}`)

        //console.log("hogehogehoge")
    }
}

export default function* rootSaga() {

    yield all([
        fork(watchOnSocket)
    ]);
}

