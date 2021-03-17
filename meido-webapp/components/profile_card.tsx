import styles from "./profile_card.module.scss"
import {Grid} from "@material-ui/core";
import CSS from 'csstype';

export default function ProfileCard(
    {
        name,
        date,
        header,
        textColorStyle,
    }: { header: string, date: string, name: string, textColorStyle: CSS.Properties }) {

    return (
        <div className={styles.container}>
            <header className={styles.title}>{header}</header>
            {/*<div className={styles.subContainer}>*/}
            <Grid
                container
                direction="row"
                alignItems="flex-start"
            >
                {/*<Grid item xs={3}>*/}
                {/*    <img*/}
                {/*        src="/images/profile_test.jpg"*/}
                {/*        className={`${styles.profileHomeImage} ${utilStyles.borderCircle}`}*/}
                {/*        alt={name}*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid item xs={8}>
                    <p className={styles.katagaki}>メッセージ</p>
                    <main style={textColorStyle} className={styles.name}>{name} </main>
                </Grid>
            </Grid>

            <p className={styles.date}>{date}</p>

        </div>
    )
}
