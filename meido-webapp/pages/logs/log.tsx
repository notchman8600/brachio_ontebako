import Head from 'next/head'
import Layout, {siteTitle} from '../../components/layout'
import utilStyles from "../../styles/util.module.scss"

import Link from 'next/link'
import Date from '../../components/date'
import {GetStaticProps} from "next";

export default function Home({}) {
    return (
        <Layout home>
            <Head>
                <title>Logs</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>This is the sample page</p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingMd}>Meido</h2>
            </section>
            <Link href="/"><a>Back to home</a></Link>


        </Layout>
    )
}