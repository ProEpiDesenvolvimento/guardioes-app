import React, {useState, useEffect} from 'react';
import { useTwitter } from 'react-native-simple-twitter';
import Noticias from './Noticias';

import noticeImg from '../../../../doc/twitterImg.jpg'

import { 
    Container, 
    ScrollNoticias, 
    NoticiasTitle, 
    FeedTitle,
    NoticeContainer,
    Header,
    TwitterInfo,
    TwitterName,
    TwitterArroba,
    Data,
    NoticiaText,
    Imagem,
    List,
} from './styles';

const data = [1,2,3,4,5,6]

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
