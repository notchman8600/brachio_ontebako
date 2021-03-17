import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type MeidoState = {
    statusMessage: string;
}


export const initialState: MeidoState = {
    statusMessage: "FINE"
}

const meidoSlice = createSlice({
    name: "meido",
    initialState,
    reducers: {
        changeMessage: (state, action: PayloadAction<string>) => ({
            ...state, statusMessage: action.payload
        })
    }
})

export default meidoSlice

