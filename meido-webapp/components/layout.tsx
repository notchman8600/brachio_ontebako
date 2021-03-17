import Head from 'next/head'
// @ts-ignore
import styles from "./layout.module.scss"
// @ts-ignore
import utilStyles from "../styles/util.module.scss"
import Link from 'next/link'

const name = 'メイドちゃん管理コンソール'
export const siteTitle = 'メイドさん'

export default function Layout({children, home}: { children: React.ReactNode, home?: boolean }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href={"/favicon.ico"}/>
                {/*メタタグ付けるならここから*/}
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        {/*<img*/}
                        {/*    src="/images/profile5.jpg"*/}
                        {/*    className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}*/}
                        {/*    alt={name}*/}
                        {/*/>*/}
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <img
                                    src="/images/profile.jpg"
                                    className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}

