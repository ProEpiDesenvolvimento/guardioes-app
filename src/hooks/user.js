import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service'
import OneSignal from 'react-native-onesignal'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import SplashScreen from 'react-native-splash-screen'

import { authUser } from '../api/user'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState('')
    const [data, setData] = useState({})
    const [avatar, setAvatar] = useState('')
    const [households, setHouseholds] = useState([{}])
    const [householdAvatars, setHouseholdAvatars] = useState({})
    const [selected, setSelected] = useState({})
    const [surveys, setSurveys] = useState([{}])
    const [score, setScore] = useState(0)
    const [location, setLocation] = useState({})
    const [appID, setAppID] = useState(1)
    const [appTwitter, setAppTwitter] = useState('')
    const [lastReport, setLastReport] = useState('')

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadStoredData()
    }, [])

    const storeUserData = async (user, token) => {
        const households = user.households
        const appID = user.app.id
        const appTwitter = user.app.twitter

        setToken(token)
        setHouseholds(households)
        setAppID(appID)
        setAppTwitter(appTwitter)

        user.households = undefined
        user.app = undefined

        setData(user)

        await AsyncStorage.setItem(
            'userData',
            JSON.stringify(user)
        )
    }

    const loadStoredData = useCallback(async () => {
        const userData = JSON.parse(
            await AsyncStorage.getItem('userData')
        )

        const selectedData = JSON.parse(
            await AsyncStorage.getItem('selectedData')
        )

        if (userData) {
            setData(userData)
        }
        if (selectedData) {
            setSelected(selectedData)
        }

        SplashScreen.hide()
        setIsLoading(false)
    }, [])

    const loadSecondaryData = useCallback(async () => {
        let email = ''
        let password = ''

        RNSecureStorage.get('userEmail').then((data) => {
            email = data
        }).catch((err) => {
            console.log(err)
        })

        RNSecureStorage.get('userPwd').then((data) => {
            password = data
        }).catch((err) => {
            console.log(err)
        })

        const avatar = await AsyncStorage.getItem('userAvatar')
        const score = parseInt(await AsyncStorage.getItem('userScore'))
        const lastReport = await AsyncStorage.getItem('lastReport')

        const householdAvatars = JSON.parse(
            await AsyncStorage.getItem('householdAvatars')
        )

        if (email === '' || password === '') {
            signOut()
        }
        if (avatar) {
            setAvatar(avatar)
        }
        if (score) {
            setScore(score)
        }
        if (lastReport) {
            setLastReport(lastReport)
        }
        if (householdAvatars) {
            setHouseholdAvatars(householdAvatars)
        }

        await signIn({ email, password })
    }, [])

    const signIn = useCallback(async ({ email, password }) => {
        const response = await authUser({
            email,
            password,
        })

        if (response.status === 200) {
            storeUserData(response.body.user, response.token)
        }
        else if (response.status === 401) {
            signOut()
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])

    const signOut = useCallback(() => {
        AsyncStorage.multiRemove([
            'userData',
            //'userScore',
            //'userAvatar',
            'selectedData',
            'householdAvatars',
            //'lastReport',
        ])

        RNSecureStorage.remove('userEmail')
        RNSecureStorage.remove('userPwd')

        //OneSignal.removeExternalUserId()

        setIsLoggedIn(false)
    }, [])

    const selectUser = async (person) => {
        if (person.description) { // Is a household
            person.user = undefined

            setSelected(person)
            await AsyncStorage.setItem(
                'selectedData',
                JSON.stringify(person)
            )
        } else {
            setSelected({})
            await AsyncStorage.removeItem('selectedData')
        }
    }

    const getCurrentUserInfo = () => {
        if (selected.description) { // Is a household
            return {
                ...selected,
                is_household: true,
                name: selected.description,
                description: undefined,
                avatar: householdAvatars[selected.id],
            }
        } else {
            return {
                ...data,
                is_household: false,
                name: data.user_name,
                user_name: undefined,
                avatar: avatar,
            }
        }
    }

    const storeHouseholds = (households) => {
        setHouseholds(households)
    }

    const updateHouseholdAvatars = async (id, source) => {
        const newAvatars = { ...householdAvatars, [id]: source }
        setHouseholdAvatars(newAvatars)

        await AsyncStorage.setItem(
            'householdAvatars',
            JSON.stringify(newAvatars)
        )
    }

    const storeSurveys = (surveys) => {
        setSurveys(surveys)
    }

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: '',
                })
            },
            (error) => {
                setLocation({
                    latitude: 0,
                    longitude: 0,
                    error: error.message,
                })
            },
            {
                enableHighAccuracy: true,
                timeout: 50000,
            }
        )
    }

    return (
        <UserContext.Provider
            value={{
                signIn,
                signOut,
                token,
                data,
                avatar,
                loadSecondaryData,
                selected,
                selectUser,
                getCurrentUserInfo,
                households,
                storeHouseholds,
                householdAvatars,
                updateHouseholdAvatars,
                surveys,
                setSurveys,
                score,
                location,
                getCurrentLocation,
                appID,
                appTwitter,
                lastReport,
                isLoading,
                isLoggedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be used within an UserProvider')
    }

    return context
}
