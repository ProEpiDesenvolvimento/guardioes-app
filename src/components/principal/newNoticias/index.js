import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { API_URL } from 'react-native-dotenv';

import Noticias from './Noticias';

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

export default function newNoticias() {
    const [twitters, setTwitter] = useState([]);
    // const [perPage, setPerPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [twitterOption, setTwitterOption] = useState('appguardioes')

  async function fetchTweets() {
    // const twitterOption = await fetch(`${API_URL}/groups/${id}/get_twitter`)
    await fetch(`${API_URL}/twitter_apis/${twitterOption}`, {})
      .then((response) => {
        return response.json()
    })
    .then((responseJson) => {
        setTwitter(responseJson.twitter_api.tweets.slice(0, 10))
        setLoading(false) 
    })
  }

  useEffect(() => {
    fetchTweets(twitterOption);
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
