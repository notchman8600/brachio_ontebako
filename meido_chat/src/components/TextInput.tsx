import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {dispatch} from "@line/liff/dist/lib/client/bridge";
import messageSlice from "../redux/chat/slice";
import {useDispatch} from "react-redux";


interface OwnProps {
    inputValue: string
    onChangeValue: Function
    onInputEnter: Function
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor:'#fcfcfc',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }),
);
type Props = OwnProps

export const TextInput: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                label="推しへの愛の言葉を入力してね！"
                // style={{marginBottom: "20 20 0 0"}}
                id="outlined-full-width"
                style={{margin: 8}}
                placeholder="Placeholder"
                helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true
                }}
                InputProps={{
                    style: {
                        fontSize: 32
                    },
                }}
                variant="outlined"
                color="secondary"
                value={props.inputValue}

                onChange={e => {
                    props.onChangeValue(e.target.value)
                    dispatch(messageSlice.actions.updateInputMessage(e.target.value))
                }}
                name="title"
                // value={props.inputValue}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        props.onInputEnter(props.inputValue)
                        dispatch(messageSlice.actions.updateInputMessage(""))

                    }
                }}/>
        </div>
    )
}