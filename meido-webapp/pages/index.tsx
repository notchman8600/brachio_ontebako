import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from "../styles/util.module.scss"
import LogCard from "../components/card";
import {v4 as uuidv4} from 'uuid';
import {SocketState} from "../ducks/socket/socket";

import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../ducks/socket/action";
import ProfileCard from "../components/profile_card";
import {defaultTextStyle, greenTextStyle, redTextStyle} from "../styles/style";
import HeaderText from "../components/HeaderText";
import {Grid} from "@material-ui/core";
import {CERT_STATUS} from "../constants";
import {getRandomUserName} from "../util/utils";

export default function Home({}) {
    // const status = useSelector((state: { statusMessage: MeidoState }) => state).statusMessage;
    const dispatch = useDispatch();
    const socket = useSelector((state: { socket: SocketState }) => state).socket;

    return (
        <Layout home>
            <Head>
                <title>Meido</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <HeaderText text={"Current Status"}/>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                {/*<h2 className={utilStyles.headingMd}>Meido</h2>*/}
                {/*<Link href="/logs/log"><a>this page!</a></Link>*/}
                <div className={`${utilStyles.mainContainer}`}>

                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <LogCard textColorStyle={greenTextStyle} title={"Meido Status"}
                                     message={socket.meidoStatus}
                                     onClickAction={(event: any) => {
                                         console.log("clicked7")
                                         dispatch(sendMessage(`{"action":"MEIDO_STAUTS"}`))

                                     }}
                            />

                            {(() => {
                                return socket.certStatus !== CERT_STATUS ?
                                    <LogCard textColorStyle={greenTextStyle} title={"Auth Status"}
                                             message={socket.authStatus}
                                             onClickAction={(event: any) => {
                                                 console.log("clicked2")
                                             }}
                                    />
                                    : <LogCard textColorStyle={redTextStyle} title={"Auth Status"}
                                               message={socket.authStatus}
                                               onClickAction={(event: any) => {
                                                   console.log("clicked2")
                                               }}

                                    />;
                            })()}


                            {(() => {
                                return socket.systemStatusMessage === "Available" ?
                                    <LogCard
                                        textColorStyle={greenTextStyle}
                                        title={"System Status"}
                                        message={socket.systemStatusMessage}
                                        onClickAction={(event: any) => {
                                            console.log("clicked3")
                                            dispatch(sendMessage(`{"action":"SYSTEM_STATUS"}`))
                                        }}
                                    />

                                    : <LogCard

                                        textColorStyle={redTextStyle}
                                        title={"System Status"}
                                        message={socket.systemStatusMessage}
                                        onClickAction={(event: any) => {
                                            console.log("clicked3")
                                            dispatch(sendMessage(`{"action":"SYSTEM_STATUS"}`))
                                        }}
                                    />;
                            })()}
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <LogCard textColorStyle={greenTextStyle} title={"????????????????????????"}
                                     message={socket.acceptUserCount.toString()}

                                     onClickAction={(event: any) => {
                                         console.log("clicked4")
                                         //
                                         dispatch(sendMessage(`{ "action": "POST_ACCEPT_USER","uuid": "${uuidv4()}","name": "${getRandomUserName()}"}`))


                                     }}

                            />
                            <LogCard textColorStyle={redTextStyle} title={"?????????????????????"}
                                     message={`${socket.deniedUserCount}`}

                                     onClickAction={(event: any) => {
                                         console.log("clicked5")
                                         dispatch(sendMessage(`{ "action": "POST_DENIED_USER","uuid": "${uuidv4()}","name": "${getRandomUserName()}"}`))

                                     }}

                            />
                            <LogCard textColorStyle={redTextStyle} title={"API???????????????"}
                                     message={`${socket.apiCount}`}
                                     onClickAction={(event: any) => {
                                         console.log("clicked6")
                                     }}
                            />

                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <LogCard textColorStyle={defaultTextStyle} title={"API???????????????"}
                                     message={socket.doorStatus}
                                     onClickAction={(event: any) => {
                                         console.log("clicked1")
                                         //  dispatch(sendMessage(`{"action": "MEIDO_STATUS"}`))
                                     }}
                            />

                            <LogCard textColorStyle={defaultTextStyle} title={"?????????"}
                                     message={`${socket.connectingUserCount}`}
                                     onClickAction={(event: any) => {
                                         console.log("clicked8")
                                         dispatch(sendMessage(`{"action":"MEIDO_COUNT"}`))

                                     }}
                            />
                            <LogCard textColorStyle={defaultTextStyle} title={"?????????"} message={socket.messageScore.toString()}
                                     onClickAction={(event: any) => {
                                         console.log("clicked9")
                                         // dispatch(sendMessage(`{"action":"MEIDO_SCORE"}`))
                                     }}
                            />
                        </Grid>

                    </Grid>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}
                    >
                        {(() => {
                            return socket.certStatus !== "SUCCESS" ?
                                <ProfileCard date={new Date().toLocaleString()} name={socket.sendMessage}
                                             header={"????????????????????????"}
                                             textColorStyle={greenTextStyle}/>
                                : <ProfileCard date={new Date().toLocaleString()} name={socket.sendMessage}
                                               header={"????????????????????????"}
                                               textColorStyle={redTextStyle}/>
                        })()}

                        {(() => {
                            return socket.certStatus !== "SUCCESS" ?
                                <ProfileCard date={new Date().toLocaleString()} name={socket.recvMessage}
                                             header={"????????????????????????"}
                                             textColorStyle={greenTextStyle}/>
                                : <ProfileCard date={new Date().toLocaleString()} name={socket.recvMessage}
                                               header={"????????????????????????"}
                                               textColorStyle={redTextStyle}/>
                        })()}
                    </div>
                </div>

            </section>
        </Layout>
    )
}

