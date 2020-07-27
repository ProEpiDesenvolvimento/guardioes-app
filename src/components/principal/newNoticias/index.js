import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
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
    const [twitterOption, setTwitterOption] = useState('guardioesunb')

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
        count: '10',
        exclude_replies: true,
      },
    );

    setTwitter(response);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true)
    Twitter(twitterOption);
  }, [twitterOption]);
    
  function loadingTwitters(loading, twitters){
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
