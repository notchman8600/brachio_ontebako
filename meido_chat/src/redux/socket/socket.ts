import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type SocketState = {
    serverMessage: string;
    meidoMessage: string;
    authStatus: string;
    systemStatusMessage: string;
    doorStatus: string;
    meidoStatus: string;
    requestUpdateMessage: string;
}

export const initialState: SocketState = {
    serverMessage: "Disconnect",
    meidoMessage: "おはよう！",
    authStatus: "DENIED",
    systemStatusMessage: "Available",
    doorStatus: "CLOSED",
    meidoStatus: "Fine",
    requestUpdateMessage: "",
}

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
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
        fetchDoorStatus: (state, action: PayloadAction<string>) => ({
            ...state, doorStatus: action.payload
        }),
        fetchSystemStatusMessage: (state, action: PayloadAction<string>) => ({
            ...state,
            systemStatusMessage: action.payload
        }),
        fetchMeidoStatus: (state, action: PayloadAction<string>) => ({
            ...state, meidoStatus: action.payload
        }),
        fetchConnectUserCount: (state, action: PayloadAction<number>) => ({
            ...state, connectingUserCount: action.payload
        }),
        fetchUpdateMessage: (state, action: PayloadAction<string>) => ({
            ...state, requestUpdateMessage: action.payload
        })
        // requestUpdateStatusMessage: (state, action: PayloadAction<string>) => ({
        //     ...state,
        //     requestUpdateMessage: `{"action":"SYSTEM_STATUS"}`,
        // })
    }
})
export default socketSlice
