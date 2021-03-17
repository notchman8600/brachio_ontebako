import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {adjustValue, evilSpacing} from "../../Constants";

const LimitNum = 8
const SPACING_MIN = 196
const SPACING_MAX = 288

//ユーザーが発破したメッセージ
export type MessageState = {
    userMessage: string;
    loveMessages: string[][];
    loveMessage: string[];
    progressPoint: number;
    inputMessage: string;
    updateFlag: boolean;
    //ここから頭が悪いので要注意
    laneMessage1: string[];
    laneMessage2: string[];
    laneMessage3: string[];
    laneMessage4: string[];
    laneMessage5: string[];
    laneMessage6: string[];
    laneMessage7: string[];
    laneMessage8: string[];
}

const calcRandomSpacing = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);

}

function generateInitState(initMessage: string, num: number): string[] {
    let strArray = Array<string>()

    for (let i = 0; i < num; i++) {
        strArray.push(initMessage)
    }
    return strArray
}


export const initialState: MessageState = {
    userMessage: "Test message",
    inputMessage: "",
    updateFlag: false,
    progressPoint: 0,
    loveMessage: [""],
    loveMessages: [[""]],
    laneMessage1: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),
    laneMessage2: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),
    laneMessage3: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),
    laneMessage4: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),
    laneMessage5: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),
    laneMessage6: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),
    laneMessage7: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),
    laneMessage8: generateInitState("" + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX)), LimitNum),

}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        postMessage: (state, action: PayloadAction<string>) => ({
            ...state, userMessage: action.payload
        }),
        loveMessage: (state, action: PayloadAction<string>) => ({
            ...state, loveMessage: state.loveMessages[0]
        }),
        loveMessages: (state, action: PayloadAction<string[]>) => ({
            ...state,
            loveMessages: [...state.loveMessages.slice(2), action.payload],
        }),
        progressPoint: (state, action: PayloadAction<number>) => ({
            ...state, progressPoint: state.progressPoint + action.payload * adjustValue < 0 ? 0 : state.progressPoint + action.payload * adjustValue
            // ...state, progressPoint: action.payload


        }),
        notifyUpdateMessage: (state, action: PayloadAction<boolean>) => ({
            ...state,
            updateFlag: action.payload
        }),
        deleteLoveMessage: (state, action: PayloadAction<string>) => ({
            ...state,
            loveMessage: state.loveMessage.slice(2)
        }),
        laneMessage1: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage1: state.laneMessage1.length >= LimitNum ? [...state.laneMessage1, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage1, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]
        }),
        laneMessage2: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage2: state.laneMessage2.length >= LimitNum ? [...state.laneMessage2, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage2, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]

        }),
        laneMessage3: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage3: state.laneMessage3.length >= LimitNum ? [...state.laneMessage3, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage3, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]

        }),
        laneMessage4: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage4: state.laneMessage4.length >= LimitNum ? [...state.laneMessage4, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage4, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]

        }),
        laneMessage5: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage5: state.laneMessage5.length >= LimitNum ? [...state.laneMessage5, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage5, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]

        }),
        laneMessage6: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage6: state.laneMessage6.length >= LimitNum ? [...state.laneMessage6, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage6, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]

        }),
        laneMessage7: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage7: state.laneMessage7.length >= LimitNum ? [...state.laneMessage7, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage7, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]

        }),
        laneMessage8: (state, action: PayloadAction<string>) => ({
            ...state,
            laneMessage8: state.laneMessage8.length >= LimitNum ? [...state.laneMessage8, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))].slice(1, LimitNum + 2) : [...state.laneMessage8, action.payload + evilSpacing(calcRandomSpacing(SPACING_MIN, SPACING_MAX))]

        }),

        updateInputMessage: (state, action: PayloadAction<string>) => ({

            ...state, inputMessage: action.payload
        }),
    }
})

export default messageSlice;