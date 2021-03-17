import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SocketState = {
    socketTestMessage: string;
    serverMessage: string;
    meidoMessage: string;
    authStatus: string;
    acceptUserCount: number;
    deniedUserCount: number;
    incidentLogCount: number;
    systemStatusMessage: string;
    doorStatus: string;
    meidoStatus: string;
    connectingUserCount: number;
    requestUpdateMessage: string;
    certStatus: string;
    certUserName: string;
    sendMessage: string;
    recvMessage: string;
    messageScore: number;
    updateFlag: boolean;
    apiCount: number;
}

export const initialState: SocketState = {
    socketTestMessage: "Meido",
    serverMessage: "Disconnect",
    meidoMessage: "おはよう！",
    authStatus: "DENIED",
    acceptUserCount: 0,
    deniedUserCount: 0,
    incidentLogCount: 0,
    systemStatusMessage: "Available",
    doorStatus: "メンテ中",
    meidoStatus: "元気だよ",
    connectingUserCount: 0,
    requestUpdateMessage: "",
    certStatus: "No Value",
    certUserName: "Hello World",
    updateFlag: false,
    sendMessage: "送信者メッセージ",
    recvMessage: "メイドメッセージ",
    messageScore: 100,
    apiCount: 0,

}

// 型バリデーション用のJSONのフォーマットの定義
export type CertMessage = {
    certUserName: string
    certStatus: string
}

// 型のフォーマットからPerson型を導出
// （ここが一番のポイント！）
// type Person = TsType<typeof personFormat>;


const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        postMessage: (state, action: PayloadAction<string>) => ({
            ...state, userMessage: action.payload
        }),
        sendMessage: (state, action: PayloadAction<string>) => ({
            ...state, sendMessage: action.payload
        }),

        recvMessage: (state, action: PayloadAction<string>) => ({
            ...state, recvMessage: action.payload
        }),
        apiCount: (state, action: PayloadAction<number>) => ({
            ...state, apiCount: action.payload
        }),
        messageScore: (state, action: PayloadAction<number>) => ({
            ...state, messageScore: action.payload
        }),
        notifyUpdateMessage: (state, action: PayloadAction<boolean>) => ({
            ...state,
            updateFlag: action.payload
        }),
        fetchMeidoStatusMessage: (state, action: PayloadAction<string>) => ({
            ...state,
            socketTestMessage: action.payload
        }),
        fetchServerMessage: (state, action: PayloadAction<string>) => ({
            ...state,
            serverMessage: action.payload
        }),
        fetchMeidoMessage: (state, action: PayloadAction<string>) => ({
            ...state,
            meidoMessage: action.payload
        }),
        fetchAuthStatus: (state, action: PayloadAction<string>) => ({
            ...state,
            authStatus: action.payload
        }),
        fetchAcceptUserCount: (state, action: PayloadAction<number>) => ({
            ...state,
            acceptUserCount: action.payload
        }),
        fetchDeniedUserCount: (state, action: PayloadAction<number>) => ({
            ...state,
            deniedUserCount: action.payload
        }),
        fetchIncidentLogCount: (state, action: PayloadAction<number>) => ({
            ...state,
            incidentLogCount: action.payload
        }),
        fetchSystemStatusMessage: (state, action: PayloadAction<string>) => ({
            ...state,
            systemStatusMessage: action.payload
        }),
        fetchDoorStatus: (state, action: PayloadAction<string>) => ({
            ...state, doorStatus: action.payload
        }),
        fetchMeidoStatus: (state, action: PayloadAction<string>) => ({
            ...state, meidoStatus: action.payload
        }),
        fetchConnectUserCount: (state, action: PayloadAction<number>) => ({
            ...state, connectingUserCount: action.payload
        }),
        fetchUpdateMessage: (state, action: PayloadAction<string>) => ({
            ...state, requestUpdateMessage: action.payload
        }),
        fetchCertMessage: (state, action: PayloadAction<CertMessage>) => ({
            ...state,
            certStatus: action.payload.certStatus,
            certUserName: action.payload.certUserName
        }),
        // requestUpdateStatusMessage: (state, action: PayloadAction<string>) => ({
        //     ...state,
        //     requestUpdateMessage: `{"action":"SYSTEM_STATUS"}`,
        // })
    }
})
export default socketSlice

// export const socketReducer = (state = initialState, action) => {
//     console.log(action)
//     switch (action.type) {
//         case socketActions.SYNC_MEIDO_STATUS: {
//             console.log("SYNC_MEIDO_STATUS")
//             return Object.assign({}, state, {
//                 socketTestMessage: action.payload
//             });
//         }
//             break;
//         default: {
//             return Object.assign({}, state, {
//                 socketTestMessage: "Test"
//             })
//             // return state
//         }
//             break;
//     }
//
// }