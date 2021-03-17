import React from 'react';
import './App.css';
import {TextInput} from "./components/TextInput";
import styles from "./components/layout.module.scss"
import {useLiffInfo} from "./index";
import utilStyles from "./styles/util.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "./redux/socket/action";
import {MessageState} from "./redux/chat/slice";
import {PopupMenu} from "./components/PopupMenu";
import {HappyGauge} from "./components/HappyGauge";
import {AnimationText} from "./components/AnimationText";
import {Meido} from "./components/Meido";
import image1 from "./background_with_1.png";
import image2 from "./background_with_2.png";
import image3 from "./background_with_3.png";

const randomNum = (Math.floor(Math.random() * 100+1)) % 3;

const style1 = {
    backgroundImage: 'url(' + image1 + ')',
    backgroundSize: "cover",

}
const style2 = {
    backgroundImage: 'url(' + image2 + ')',
    backgroundSize: "cover",
}
const style3 = {
    backgroundImage: 'url(' + image3 + ')',
    backgroundSize: "cover",

}


function App() {
    console.log(randomNum)
    const {name, image} = useLiffInfo();
    const dispatch = useDispatch();
    const messageState = useSelector((state: { messageState: MessageState }) => state).messageState
    // randomNum = Math.random() * 100 % 3;
    return (
        randomNum === 0 ?
            <div className="App" style={style1}>
                <div>
                    <header className={styles.header}>
                        <img
                            src={image}
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.headingLg}>{name}</h1>
                    </header>
                    <HappyGauge inputValue={messageState.progressPoint}/>
                </div>

                <div className="MeidoContainer">
                    <Meido score={0}/>
                    <PopupMenu loveMessage={[]} flag={messageState.updateFlag}></PopupMenu>

                </div>
                {/*<h1>{messageState.progressPoint}</h1>*/}
                {(() => {
                    return messageState.progressPoint >= 100 ?
                        <AnimationText textArray={["たくさんプレイしてくれてありがとう！！ I Love you! by あなたの推しのメイドちゃんより"]}/> :
                        <div></div>

                })()}


                <TextInput inputValue={messageState.inputMessage}
                           onInputEnter={(message: string) => {

                               //console.log("Lane num: ", laneNum)
                               dispatch(sendMessage(`{"action":"LOVE_MESSAGE2","message":"${messageState.inputMessage}"}`))

                           }}
                           onChangeValue={() => {
                           }}
                />
            </div>
            : randomNum === 1 ?
            <div className="App" style={style2}>
                <div>
                    <header className={styles.header}>
                        <img
                            src={image}
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.headingLg}>{name}</h1>
                    </header>
                    <HappyGauge inputValue={messageState.progressPoint}/>
                </div>

                <div className="MeidoContainer">
                    <Meido score={0}/>
                    <PopupMenu loveMessage={[]} flag={messageState.updateFlag}></PopupMenu>

                </div>
                {/*<h1>{messageState.progressPoint}</h1>*/}
                {(() => {
                    return messageState.progressPoint >= 100 ?
                        <AnimationText textArray={["たくさんプレイしてくれてありがとう！！ I Love you! by あなたの推しのメイドちゃんより"]}/> :
                        <div></div>

                })()}


                <TextInput inputValue={messageState.inputMessage}
                           onInputEnter={(message: string) => {

                               //console.log("Lane num: ", laneNum)
                               dispatch(sendMessage(`{"action":"LOVE_MESSAGE","message":"${messageState.inputMessage}"}`))

                           }}
                           onChangeValue={() => {
                           }}
                />


            </div>
            :
            <div className="App" style={style3}>
                <div>
                    <header className={styles.header}>
                        <img
                            src={image}
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.headingLg}>{name}</h1>
                    </header>
                    <HappyGauge inputValue={messageState.progressPoint}/>
                </div>

                <div className="MeidoContainer">
                    <Meido score={0}/>
                    <PopupMenu loveMessage={[]} flag={messageState.updateFlag}></PopupMenu>

                </div>
                {/*<h1>{messageState.progressPoint}</h1>*/}
                {(() => {
                    return messageState.progressPoint >= 100 ?
                        <AnimationText textArray={["たくさんプレイしてくれてありがとう！！ I Love you! by あなたの推しのメイドちゃんより"]}/> :
                        <div></div>

                })()}


                <TextInput inputValue={messageState.inputMessage}
                           onInputEnter={(message: string) => {

                               //console.log("Lane num: ", laneNum)
                               dispatch(sendMessage(`{"action":"LOVE_MESSAGE","message":"${messageState.inputMessage}"}`))

                           }}
                           onChangeValue={() => {
                           }}
                />


            </div>
    );
}

export default App;
