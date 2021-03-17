import Head from 'next/head';
import {AppProps} from "next/app";
import '../styles/global.scss'
import React from "react";
import {Provider} from "react-redux";
import createStore from "../ducks/createStore";




export default function App({Component, pageProps}: AppProps) {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <Provider store={createStore()}>
            <Component {...pageProps} />
        </Provider>
    )
    // return
}