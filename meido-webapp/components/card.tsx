import {inspect} from "util";
import styles from "./card.module.scss"
import CSS from 'csstype';

export default function LogCard(
    {
        title,
        message,
        textColorStyle,
        onClickAction,
    }: { textColorStyle: CSS.Properties, title: string, message: string, onClickAction: (event: any) => void }) {
    return (
        <div className={styles.container} onClick={onClickAction}>
            <header className={styles.title}>{title}</header>
            <main style={textColorStyle} className={styles.message}>{message}</main>
        </div>
    )
}
