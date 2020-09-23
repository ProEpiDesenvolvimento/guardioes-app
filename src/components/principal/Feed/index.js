import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';

import Noticias from './Noticias';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import translate from '../../../../locales/i18n';
import { API_URL } from 'react-native-dotenv';

import { 
    Container, 
    ScrollNoticias, 
    NoticiasTitle, 
    FeedTitle,
    List,
    TwitterOptionContainer,
    TwitterOption,
    OptionLeft,
    OptionRight,
    OptionText,
} from './styles';

export default function Feed() {
    const [twitters, setTwitter] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [groupId, setGroupId] = useState(null);
    // const [perPage, setPerPage] = useState(0);
    // const [twitterOption, setTwitterOption] = useState('appguardioes')

    async function fetchTweets() {
        const userID = await AsyncStorage.getItem('userID');
        const userToken = await RNSecureStorage.get('userToken');
        var group; 
        var twitterHandle = 'appguardioes';
        
        // Get the user group_id 
        await fetch(`${API_URL}/users/${userID}`, {
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `${userToken}`
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
                group = responseJson.user.group_id
            }
        )

        // Check if the user has an group_id, and get group twitter
        if(group !== null) {
            await fetch(`${API_URL}/groups/${group}/get_twitter`,)
                .then((response) => response.json())
                .then((responseJson) => {
                    twitterHandle = responseJson.twitter
            })
        } 

        // Get twitters to show
        await fetch(`${API_URL}/twitter_apis/${twitterHandle}`, {})
            .then((response) => response.json())
            .then((responseJson) => {
                setTwitter(responseJson.twitter_api.tweets.slice(0, 10))
                setLoading(false) 
            }
        )
    }

    useEffect(() => {
        fetchTweets();
        setLoading(true);
    }, []);

    function loadingTwitters(){
        if (loading) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
            </View>
        )
        }
    }
        return (
        <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#348EAC'}} />
            <Container>
                <ScrollNoticias>
                    <NoticiasTitle>
                        Notícias
                    </NoticiasTitle>
                    <FeedTitle>
                        Feed RSS do Guardiões
                    </FeedTitle>
                    {/* <TwitterOptionContainer>
                    <TwitterOption>
                        <OptionLeft onPress={() => {setTwitterOption('unb_oficial')}} >
                        <OptionText>@unb_oficial</OptionText>
                        </OptionLeft>
                        <OptionRight onPress={() => {setTwitterOption('guardioesunb')}}>
                        <OptionText>@guardioesunb</OptionText>
                        </OptionRight>
                    </TwitterOption>
                    </TwitterOptionContainer> */}
                    {loadingTwitters(loading)}
                    <List 
                        data={twitters.slice(0,15)}
                        keyExtractor={twitters => String(twitters.id)}
                        renderItem={({item}) => <Noticias data={item}/>}
                    />
                </ScrollNoticias>
            </Container>
        </>
    );
}

Feed['navigationOptions'] = screenProps => ({
    title: translate("news.title")
})