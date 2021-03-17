import {createAsyncThunk} from "@reduxjs/toolkit";

export const SYNC_MEIDO_STATUS = Symbol(
    'MEIDO_STATUS'
);

export const messageMeidoUpdate = (payload: any) => ({
    type: SYNC_MEIDO_STATUS,
    payload
});

// export const sagaActions = {
//     FETCH_DATA_SAGA: "FETCH_DATA_SAGA"
// };

export const FETCH_DATA_SAGA = Symbol(
    'FETCH_DATA_SAGA'
)


export const sendMessage = (payload: any) => ({
    type: FETCH_DATA_SAGA,
    payload: payload
})