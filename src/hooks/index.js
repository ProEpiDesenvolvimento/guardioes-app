import React from 'react'

import { UserProvider } from './user'

const AppProvider = ({ children }) => {
    return <UserProvider>{children}</UserProvider>
}

export default AppProvider
