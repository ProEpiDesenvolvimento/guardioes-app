import React from 'react'
import { CoolAlert } from '../CoolAlert'

import translate from '../../../locales/i18n'

const LoadingModal = ({ show }) => {
    return (
        <CoolAlert
            show={show}
            showProgress
            title={translate('register.awesomeAlert.loading')}
        />
    )
}

export default LoadingModal
