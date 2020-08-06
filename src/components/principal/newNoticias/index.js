import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { useTwitter } from 'react-native-simple-twitter';
import { 
  TWITTER_CONSUMERKEY1, 
  TWITTER_CONSUMERKEY2, 
  TWITTER_ACCESS1, 
  TWITTER_ACCESS2, 
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
    const [loading, setLoading] = useState(true);
    const [twitterOption, setTwitterOption] = useState('@Proepi_')

  const { twitter } = useTwitter();

  twitter.setConsumerKey(
    TWITTER_CONSUMERKEY1,
    TWITTER_CONSUMERKEY2,
  );
  twitter.setAccessToken(
    TWITTER_ACCESS1,
    TWITTER_ACCESS2,
  );

  async function Twitter(twitterOption) {
    const response = await twitter.api(
      'GET',
      '/statuses/user_timeline.json',
      {
        screen_name: twitterOption,
        count: 2,
        tweet_mode: 'extended',
        include_rts: 1,
        exclude_replies: false,
      },
    );

    var tweets = [];

    response.map(response => {
        let twitterImage = null
        if(response.hasOwnProperty('extended_entities')){
          twitterImage = response.extended_entities.media[0].media_url;
        } 

        data = {
          id: response.id,
          id_str: response.id_str,
          name: response.user.name,
          screen_name: response.user.screen_name,
          created_at: response.created_at,
          full_text: response.full_text,
          image: twitterImage,
        }
        tweets.push(data)
    })
    setTwitter(tweets)
    setLoading(false);
    AsyncStorage.setItem('twitter', JSON.stringify(tweets));
    displayData();
  }

  displayData = async () => {
    try {
      let tweet = await AsyncStorage.getItem('twitter');
      console.log('AsyncStorage =>', JSON.parse(tweet));
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    Twitter(twitterOption);
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
                    data={twitters}
                    keyExtractor={twitters => String(twitters.id)}
                    renderItem={({item}) => <Noticias data={item}/>}
                />
            </ScrollNoticias>
        </Container>
  );
}
