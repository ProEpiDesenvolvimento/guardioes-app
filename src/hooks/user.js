import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from 'react'
import { Alert, PermissionsAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service'
import NetInfo from '@react-native-community/netinfo'
import OneSignal from 'react-native-onesignal'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import SplashScreen from 'react-native-splash-screen'

import translate from '../../locales/i18n'
import { authUser } from '../api/user'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [credentials, setCredentials] = useState({})
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    const [avatar, setAvatar] = useState('')
    const [households, setHouseholds] = useState([])
    const [householdAvatars, setHouseholdAvatars] = useState({})
    const [selected, setSelected] = useState({})
    const [surveys, setSurveys] = useState([])
    const [location, setLocation] = useState({})
    const [group, setGroup] = useState({})
    const [app, setApp] = useState({})
    const [appTips, setAppTips] = useState({ loading: true })
    const [lastReport, setLastReport] = useState('')
    const [lastForm, setLastForm] = useState('')

    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isOffline, setIsOffline] = useState(false)
    const [needSignIn, setNeedSignIn] = useState(true)

    useEffect(() => {
        loadStoredData()

        const internetInfo = NetInfo.addEventListener((state) => {
            verifyInternetState(state)
        })

        return () => {
            internetInfo()
        }
    }, [])

    const loadStoredData = useCallback(async () => {
        // Loads only essencial data stored
        let email = ''
        let password = ''
        let token = ''

        await RNSecureStorage.get('userEmail')
            .then((data) => {
                email = data
            })
            .catch((err) => {
                console.log(err)
            })

        await RNSecureStorage.get('userPwd')
            .then((data) => {
                password = data
            })
            .catch((err) => {
                console.log(err)
            })

        await RNSecureStorage.get('userToken')
            .then((data) => {
                token = data
            })
            .catch((err) => {
                console.log(err)
            })

        const userData = JSON.parse(await AsyncStorage.getItem('userData'))
        const selectedData = JSON.parse(
            await AsyncStorage.getItem('selectedData')
        )

        if (email !== '' && password !== '') {
            setCredentials({
                email,
                password,
            })
        } else {
            await signOut()
        }
        if (token !== '') {
            setToken(token)
        }
        if (userData) {
            setUser(userData)
        }
        if (selectedData) {
            setSelected(selectedData)
        }

        SplashScreen.hide()
        setIsLoading(false)
    }, [])

    const loadSecondaryData = async () => {
        // Loads secondary data and verify user credentials
        const avatar = await AsyncStorage.getItem('userAvatar')
        const appTips = JSON.parse(await AsyncStorage.getItem('appTips'))
        const lastReport = await AsyncStorage.getItem('lastReport')
        const lastForm = await AsyncStorage.getItem('lastForm')
        const householdsData = JSON.parse(
            await AsyncStorage.getItem('householdsData')
        )
        const householdAvatars = JSON.parse(
            await AsyncStorage.getItem('householdAvatars')
        )

        if (avatar) {
            setAvatar(avatar)
        }
        if (appTips) {
            setAppTips(appTips)
        } else {
            setAppTips({})
        }
        if (lastReport) {
            setLastReport(lastReport)
        }
        if (lastForm) {
            setLastForm(lastForm)
        }
        if (householdsData) {
            setHouseholds(householdsData)
        }
        if (householdAvatars) {
            setHouseholdAvatars(householdAvatars)
        }
        if (needSignIn) {
            await signIn(credentials)
        }
    }

    const verifyInternetState = (state) => {
        if (!state.isConnected) {
            setIsOffline(true)
        } else if (
            state.isInternetReachable === null ||
            state.isInternetReachable
        ) {
            setIsOffline(false)
        } else {
            setIsOffline(true)
        }
    }

    const storeUser = async (user, token = null, credentials = null) => {
        if (user) {
            const { households } = user
            const { app } = user

            if (households) {
                storeHouseholds(households)
                user.households = undefined
            }
            if (app) {
                setApp(app)
                user.app = undefined
            }

            setUser(user)
            await AsyncStorage.setItem('userData', JSON.stringify(user))
        }
        if (token) {
            setToken(token)

            await RNSecureStorage.set('userToken', token, {
                accessible: ACCESSIBLE,
            })
        }
        if (credentials) {
            await RNSecureStorage.set('userEmail', credentials.email, {
                accessible: ACCESSIBLE,
            })

            await RNSecureStorage.set('userPwd', credentials.password, {
                accessible: ACCESSIBLE,
            })
        }
    }

    const sendUserTagsToOneSignal = (user) => {
        const userGroup = user.group ? user.group.split('/')[3] : null

        OneSignal.setExternalUserId(user.id.toString())
        OneSignal.sendTags({
            city: user.city,
            group: userGroup,
        })
    }

    const signIn = async ({ email, password }) => {
        const response = await authUser({ user: { email, password } })

        if (response.status === 200) {
            storeUser(response.data.user, response.headers.authorization)
            sendUserTagsToOneSignal(response.data.user)
            setNeedSignIn(false)
        } else if (response.status === 401) {
            signOut()
        }
    }

    const removeUserTagsfromOneSignal = () => {
        OneSignal.removeExternalUserId()
        OneSignal.deleteTag('city')
        OneSignal.deleteTag('group')
        OneSignal.deleteTag('school_unit_id') // Remove on next release
        OneSignal.deleteTag('score')
        OneSignal.deleteTag('doses')
    }

    const signOut = async () => {
        // Delete user credentials and cache data stored
        await AsyncStorage.multiRemove([
            'userData',
            'userAvatar',
            'householdsData',
            'householdAvatars',
            'selectedData',
            'appTips',
            'lastReport',
            'surveysData',
            'contentsData',
        ])

        RNSecureStorage.exists('userEmail').then((exists) =>
            exists ? RNSecureStorage.remove('userEmail') : null
        )

        RNSecureStorage.exists('userPwd').then((exists) =>
            exists ? RNSecureStorage.remove('userPwd') : null
        )

        RNSecureStorage.exists('userToken').then((exists) =>
            exists ? RNSecureStorage.remove('userToken') : null
        )

        removeUserTagsfromOneSignal()
        setIsLoggedIn(false)
    }

    const selectUser = async (person) => {
        if (person.description) {
            // Is a household
            person.user = undefined

            setSelected(person)
            await AsyncStorage.setItem('selectedData', JSON.stringify(person))
        } else {
            setSelected({})
            await AsyncStorage.removeItem('selectedData')
        }
    }

    const getCurrentUserInfo = () => {
        if (selected.description) {
            // Is a household
            return {
                ...selected,
                is_household: true,
                name: selected.description ? selected.description : '',
                description: undefined,
                avatar: householdAvatars[selected.id],
            }
        }
        return {
            ...user,
            is_household: false,
            name: user.user_name ? user.user_name : '',
            user_name: undefined,
            avatar,
        }
    }

    const updateUserAvatar = async (source) => {
        if (source) {
            setAvatar(source)
            await AsyncStorage.setItem('userAvatar', source)
        } else {
            setAvatar('')
            await AsyncStorage.removeItem('userAvatar')
        }
    }

    const storeHouseholds = async (households) => {
        households.sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        )
        setHouseholds(households)

        await AsyncStorage.setItem('householdsData', JSON.stringify(households))
    }

    const updateHouseholdAvatars = async (id, source) => {
        const newAvatars = { ...householdAvatars, [id]: source }
        setHouseholdAvatars(newAvatars)

        await AsyncStorage.setItem(
            'householdAvatars',
            JSON.stringify(newAvatars)
        )
    }

    const storeSurveys = async (surveys) => {
        setSurveys(surveys)
        await AsyncStorage.setItem('surveysData', JSON.stringify(surveys))
    }

    const getCurrentLocation = async () => {
        try {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: translate('locationRequest.permissionTitle'),
                        message:
                            translate('locationRequest.permissionMessage') +
                            translate('locationRequest.permissionMessage2'),
                        buttonNegative: translate('locationRequest.cancelText'),
                        buttonPositive: translate('locationRequest.okText'),
                    }
                )
            }
        } catch (err) {
            console.warn(err)
        }

        return new Promise((resolve) =>
            Geolocation.getCurrentPosition(
                (position) => {
                    const local = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.06,
                        longitudeDelta: 0.06,
                        error: 0,
                    }
                    setLocation(local)
                    resolve(local)
                },
                (error) => {
                    Alert.alert(
                        translate('locationRequest.errorTitle'),
                        translate('locationRequest.errorMessage')
                    )
                    const local = {
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0.06,
                        longitudeDelta: 0.06,
                        error: error.code,
                    }
                    setLocation(local)
                    resolve(local)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 30000,
                }
            )
        )
    }

    const getAppTip = (tip) => {
        if (appTips.loading) {
            return false
        }
        return !appTips[tip]
    }

    const hideAppTip = async (tip) => {
        const newTips = { ...appTips, [tip]: true }
        setAppTips(newTips)

        await AsyncStorage.setItem('appTips', JSON.stringify(newTips))
    }

    const storeLastReport = async (score) => {
        const todayDate = new Date()

        switch (score) {
            case 0:
                console.warn('Did not report the day before')
                break
            case 1:
                setLastReport(todayDate.toISOString())
                console.warn('First day reporting')
                break
            default:
                setLastReport(todayDate.toISOString())
                console.warn('Reported the day before')
        }

        await AsyncStorage.setItem('lastReport', todayDate.toISOString())
        console.warn(`User streak: ${score}`)
    }

    const storeLastForm = async (lastFormDate) => {
        const newLastForm = lastFormDate.toISOString()
        setLastForm(newLastForm)
        await AsyncStorage.setItem('lastForm', newLastForm)
    }

    const storeCacheData = async (key, data) => {
        // Keep in mind that AsyncStorage space is only 6 MB on Android
        if (typeof data === 'string') {
            await AsyncStorage.setItem(key, data)
        } else {
            await AsyncStorage.setItem(key, JSON.stringify(data))
        }
    }

    const getCacheData = async (key, string = true) => {
        // This could be slow depending on size of data stored
        if (string) {
            return AsyncStorage.getItem(key)
        }
        return JSON.parse(await AsyncStorage.getItem(key))
    }

    return (
        <UserContext.Provider
            value={{
                token,
                user,
                loadSecondaryData,
                storeUser,
                selectUser,
                signOut,
                getCurrentUserInfo,
                avatar,
                updateUserAvatar,
                households,
                storeHouseholds,
                householdAvatars,
                updateHouseholdAvatars,
                surveys,
                storeSurveys,
                location,
                getCurrentLocation,
                group,
                setGroup,
                app,
                getAppTip,
                hideAppTip,
                lastReport,
                storeLastReport,
                lastForm,
                storeLastForm,
                storeCacheData,
                getCacheData,
                isLoading,
                isLoggedIn,
                setIsLoggedIn,
                isOffline,
                needSignIn,
                setNeedSignIn,
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
