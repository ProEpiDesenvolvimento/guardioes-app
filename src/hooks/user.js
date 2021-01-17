import AsyncStorage from "@react-native-community/async-storage";
import Geolocation from 'react-native-geolocation-service';
import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from "react";
import RNSecureStorage from 'rn-secure-storage';
import SplashScreen from 'react-native-splash-screen';

import { authUser } from "../api/user";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const [selected, setSelected] = useState(0);
    const [household, setHousehold] = useState([{}]);
    const [householdAvatars, setHouseholdAvatars] = useState({});
    const [surveys, setSurveys] = useState([{}]);
    const [score, setScore] = useState(0);
    const [location, setLocation] = useState({});
    const [appID, setAppID] = useState(1);
    const [groupTwitter, setGroupTwitter] = useState("");
    const [lastReport, setLastReport] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    const initUserData = (user, token) => {
        console.warn("Deu certo");
        const household = user.households;
        const appID = user.app.id;
        const groupTwitter = user.app.twitter;

        setToken(token);
        setHousehold(household);
        setAppID(appID);
        setGroupTwitter(groupTwitter);

        user.households = undefined;
        user.app = undefined;

        setData(user);
    }

    const loadStorageData = useCallback(async () => {
        const email = await RNSecureStorage.get('userEmail');
        const password = await RNSecureStorage.get('userPwd');

        const response = await authUser({
            email,
            password,
        });

        const selected = parseInt(
            await AsyncStorage.getItem('userSelected')
        );

        const householdAvatars = JSON.parse(
            await AsyncStorage.getItem('householdAvatars')
        );

        if (selected) {
            setSelected(selected);
        }

        if (householdAvatars) {
            setHouseholdAvatars(householdAvatars);
        }

        if (!response.body.error && response.status === 200) {
            initUserData(response.body.user, response.token);
            SplashScreen.hide();
        }

        setIsLoading(false);
    }, []);

    const loadSecondaryStorageData = useCallback(async () => {
        const score = parseInt(
            await AsyncStorage.getItem('userScore')
        );

        const lastReport = await AsyncStorage.getItem('lastReport');

        if (score) {
            setScore(score);
        }

        if (lastReport) {
            setLastReport(lastReport);
        }
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await authUser({
            email,
            password,
        });

        if (!response.body.error && response.status === 200) {
            initUserData(response.body.user, response.token);
        }
    }, []);

    const signOut = useCallback(() => {
        AsyncStorage.multiRemove([
            "userSelected",
            "userScore",
            "householdAvatars",
            "lastReport",
        ]);

        RNSecureStorage.remove('userEmail');
        RNSecureStorage.remove('userPwd');
    }, []);

    const selectUser = async (id, isHousehold = false) => {
        if (isHousehold) {
            setSelected(id);
            await AsyncStorage.setItem('userSelected', String(id));
        }
        else {
            setSelected(null);
            await AsyncStorage.setItem('userSelected', String(null));
        }
    }

    const updateHouseholdAvatars = async (id, source) => {
        const newAvatars = { ...householdAvatars, [id]: source };
        setHouseholdAvatars(newAvatars);

        await AsyncStorage.setItem(
            'householdAvatars',
            JSON.stringify(newAvatars),
        );
    }

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            position => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: "",
                });
            },
            error => {
                setLocation({
                    latitude: 0,
                    longitude: 0,
                    error: error.message,
                });
            },
            {
                enableHighAccuracy: true, 
                timeout: 50000
            },
        );
    }

    return (
        <UserContext.Provider
            value={{
                signIn,
                signOut,
                token,
                data,
                loadSecondaryStorageData,
                selected,
                selectUser,
                household,
                householdAvatars,
                updateHouseholdAvatars,
                surveys,
                score,
                location,
                getCurrentLocation,
                appID,
                groupTwitter,
                lastReport,
                isLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }

    return context;
}
