import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React from "react";
import {useDispatch} from "react-redux";
import './HappyGauge.scss'

interface OwnProps {
    inputValue: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: '10pt',
            // backgroundColor: '#fcfcfc',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
        box: {
            margin: 'auto',
            height: '10pt',
            width: "100%",
            backgroundColor: '#f00',
            position: "absolute",
        },
        box2: {
            margin: 'auto',
            height: '10pt',
            width: "100%",
            backgroundColor: '#f00',
            position: "relative",
        }
    }),
);

type Props = OwnProps

export const HappyGauge: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <progress max={100} value={props.inputValue} id={"progress"}/>

    )
}