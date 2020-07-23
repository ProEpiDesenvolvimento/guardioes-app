import React, {useState, useEffect} from 'react';
import { useTwitter } from 'react-native-simple-twitter';
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

  const {twitter} = useTwitter();

  twitter.setConsumerKey(
    'key',
    'key',
  );
  twitter.setAccessToken(
    'key',
    'key',
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
    }

    Twitter();
  }, []);
    
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
