import React, { PureComponent } from 'react'
import { CoolAlert } from '../CoolAlert'

class LoadingModal extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <CoolAlert
                show={this.props.show}
                showProgress={true}
                title={"Carregando"}
            />
        )
    }
}

export default LoadingModal
