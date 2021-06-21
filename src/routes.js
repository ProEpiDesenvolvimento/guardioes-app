import React from 'react'
import { useUser } from './hooks/user'

import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'

const Routes = () => {
    const { isLoggedIn } = useUser()

    return <>{isLoggedIn ? <AppStack /> : <AuthStack />}</>
}

export default Routes
