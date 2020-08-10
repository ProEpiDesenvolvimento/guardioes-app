import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { useTwitter } from 'react-native-simple-twitter';
import { 
  ENV_URL
} from 'react-native-dotenv'

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
    const [perPage, setPerPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [twitterOption, setTwitterOption] = useState('Proepi_')

  async function fetchTweets(twitterOption) {
    await fetch(`${ENV_URL}/twitter_apis/${twitterOption}`, {})
      .then((response) => {
        return response.json()
    })
    .then((responseJson) => {
        setTwitter(responseJson.twitter_api.tweets.slice(perPage, perPage + 10)) // SALVA OS 200 AQUI twitters
        setLoading(false) 
    })
  }

  useEffect(() => {
    fetchTweets(twitterOption);
    setPerPage(0);
    setLoading(true);
  }, [twitterOption]);

  function loadingTwitters(loading){
    if (loading) {
      return (
          <View style={{ flex: 1, padding: 20 }}>
              <ActivityIndicator />
          </View>
      )
    }
  }
    return (
        <Container>
            <ScrollNoticias>
                <NoticiasTitle>
                    Notícias
                </NoticiasTitle>
                <FeedTitle>
                    Feed RSS do Guardiões
                </FeedTitle>
                <TwitterOptionContainer>
                  <TwitterOption>
                    <OptionLeft onPress={() => {setTwitterOption('unb_oficial')}} >
                      <OptionText>@unb_oficial</OptionText>
                    </OptionLeft>
                    <OptionRight onPress={() => {setTwitterOption('guardioesunb')}}>
                      <OptionText>@guardioesunb</OptionText>
                    </OptionRight>
                  </TwitterOption>
                </TwitterOptionContainer>
                {loadingTwitters(loading)}
                <List 
                    data={twitters.slice(0,15)}
                    keyExtractor={twitters => String(twitters.id)}
                    renderItem={({item}) => <Noticias data={item}/>}
                />
            </ScrollNoticias>
        </Container>
  );
}
