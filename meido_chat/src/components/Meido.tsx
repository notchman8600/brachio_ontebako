import React from "react";
import "./Meido.scss"
import MeidoImage from './meido_chan1.png'

interface OwnProps {
    score:number
}

type Props = OwnProps

export class Meido extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                {/*<img src={MeidoImage} className={"Meido"}></img>*/}

            </React.Fragment>
        )
    }
}