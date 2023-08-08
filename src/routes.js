import React from 'react'
import { useUser } from './hooks/user'

import AuthStack from './navigation/auth/AuthStack'
import AppStack from './navigation/app/AppStack'
import ProfessionalStack from './navigation/professional/ProfessionalStack'

const Routes = () => {
    const { isLoggedIn, user, isProfessional } = useUser()

    return (
        <>
            {isLoggedIn ? (
                <>
                    {user.is_professional && isProfessional ? (
                        <ProfessionalStack />
                    ) : (
                        <AppStack />
                    )}
                </>
            ) : (
                <AuthStack />
            )}
        </>
    )
}

export default Routes
