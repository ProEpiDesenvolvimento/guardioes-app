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
} from './styles';

export default function newNoticias() {
    const [twitters, setTwitter] = useState([]);
    const [loading, setLoading] = useState(true);

  const { twitter } = useTwitter();

  twitter.setConsumerKey(
    TWITTER_CONSUMERKEY1,
    TWITTER_CONSUMERKEY2,
  );
  twitter.setAccessToken(
    TWITTER_ACCESS1,
    TWITTER_ACCESS2,
  );

  useEffect(() => {
    async function Twitter() {
      const response = await twitter.api(
        'GET',
        '/statuses/user_timeline.json',
        {
          screen_name: 'guardioesunb',
          count: '30',
          exclude_replies: true,
        },
      );

      setTwitter(response);
      setLoading(false);
    }

    Twitter();
  }, []);
    
  if (loading) {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
        </View>
    )
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
                <List 
                    data={twitters}
                    keyExtractor={item => String(twitters.id)}
                    renderItem={({item}) => <Noticias data={item}/>}
                />
            </ScrollNoticias>
        </Container>
  );
}
