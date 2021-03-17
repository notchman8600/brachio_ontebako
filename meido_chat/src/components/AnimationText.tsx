import React from "react";
import './AnimationText.css'

interface OwnProps {
    textArray: string[]
}

type Props = OwnProps

export class AnimationText extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                <div className={"sample02"}>
                    <ul>

                            {!(this.props && this.props.textArray) ?
                                <li>Uninitialized</li> : this.props.textArray.length < 1 ? (
                                    <p>求ム！ 皆の推しへの愛の叫びを！！</p>
                                ) : (
                                    this.props.textArray.map(item => <li>{item}</li>)
                                )}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}