import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import liff from "@line/liff";
import {dummyIcon, myLiffId} from "./Constants";
import "./createStore";
import {Provider} from "react-redux";
import createStore from "./createStore";

type LiffInfoContextValue = {
    loggedIn: boolean;
    name: string;
    image: string;
}

const LiffInfoContext = createContext<LiffInfoContextValue>({
    loggedIn: false,
    name: '',
    image: dummyIcon,
});

export const LiffInfoProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(liff.isLoggedIn());
    const [name, setName] = useState('Unknown User');
    const [image, setImage] = useState(dummyIcon);
    useEffect(() => {
        console.log("Try login")
        if (loggedIn) {
            setLoggedIn(liff.isLoggedIn());
            liff.getProfile().then((prof) => {
                setName(prof.displayName);
                setImage(prof.pictureUrl ?? dummyIcon);
            });
        } else if (process.env.NODE_ENV !== 'development') {
            liff.login();
            setLoggedIn(liff.isLoggedIn());
        }
    }, [loggedIn]);

    return (
        <LiffInfoContext.Provider value={{loggedIn, name, image}}>
            {children}
        </LiffInfoContext.Provider>
    )
};

liff.init({liffId: myLiffId}).then(() => {
    if (!liff.isLoggedIn()) {
        liff.login();
    }
    ReactDOM.render(
        <LiffInfoProvider>
            <Provider store={createStore()}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </Provider>
        </LiffInfoProvider>
        ,
        document.getElementById('root')
    )
    ;

}).catch(console.error);


export const useLiffInfo = (): LiffInfoContextValue => {
    return useContext(LiffInfoContext)
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
