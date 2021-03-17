import styles from "./HeaderText.module.scss"

export default function HeaderText({text}: { text: string }) {
    return (
        <div>
            <p className={styles.HeaderText}>~ Current Status ~</p>
        </div>
    )
}