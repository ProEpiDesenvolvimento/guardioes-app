import React from 'react'
import { useUser } from './hooks/user'

import AuthStack from './navigation/auth/AuthStack'
import AppStack from './navigation/app/AppStack'

const Routes = () => {
    const { isLoggedIn } = useUser()

    return <>{isLoggedIn ? <AppStack /> : <AuthStack />}</>
}

export default Routes
