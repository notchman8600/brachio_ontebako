// PopupMenu.js
import './PopupMenu.scss'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import messageSlice, {MessageState} from "../redux/chat/slice";

interface OwnProps {
    loveMessage: string[][],
    flag: boolean
}

type Props = OwnProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PopupMenu: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const messageState = useSelector((state: { messageState: MessageState }) => state).messageState
    //アニメーションフラグを折る
    let showFlag = false
    if (props.flag) {
        showFlag = true
        window.setTimeout(function () {
            dispatch(messageSlice.actions.notifyUpdateMessage(false))
        }, 5000)
    } else {
        showFlag = false
        window.setTimeout(function () {
            dispatch(messageSlice.actions.notifyUpdateMessage(true))
        }, 5000)
    }

    //フラグが折れているときは先頭データを取得してアクションをDispatch
    // else {
    //     dispatch(messageSlice.actions.deleteLoveMessage())
    //     dispatch(messageSlice.actions.notifyUpdateMessage(true))
    // }

    // if (props.flag && messageState.loveMessage.length !== 0) {
    //     // dispatch(messageSlice.actions.notifyUpdateMessage(false))
    //
    //     // window.setTimeout(function () {
    //     //     dispatch(messageSlice.actions.notifyUpdateMessage(false))
    //     //
    //     // }, 5000)
    // }
    // if (messageState.loveMessage[0][0].length > 0 && messageState.loveMessage.length > 1) {

    return (
        <div className="popup-menu-container">
            <div
                className={`popup-menu ${showFlag && messageState.loveMessage[0].length > 0 ? 'shown' : ''}`}>
                {
                    messageState.loveMessage.map((str, index) => {
                        return <div>{str}</div>
                    })
                }
            </div>
        </div>)


// } else return (
//     <div className="popup-menu-container">
//
//     </div>
//
// )
}


