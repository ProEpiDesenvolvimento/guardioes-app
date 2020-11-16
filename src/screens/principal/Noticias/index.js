import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import translate from '../../../../locales/i18n';
import {API_URL} from 'react-native-dotenv';

import ScreenLoader from '../../../components/ScreenLoader';
import NoticiasComponent from './NoticiasComponent';

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

export default function Noticias() {
  const [twitters, setTwitter] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [twitterOption, setTwitterOption] = useState(null);
  const [appTwitter, setAppTwitter] = useState(null);
  const [groupTwitter, setGroupTwitter] = useState(null);

  // Get group and app twitter from user
  async function userTwitters() {
    const userID = await AsyncStorage.getItem('userID');
    const userToken = await RNSecureStorage.get('userToken');
    var group;
    var option;

    await fetch(`${API_URL}/users/${userID}`, {
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `${userToken}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        group = responseJson.user.group_id;
        option = responseJson.user.app.twitter;
        setAppTwitter(responseJson.user.app.twitter);
      });

    if (group !== null) {
      await fetch(`${API_URL}/groups/${group}/get_twitter`)
        .then(response => response.json())
        .then(responseJson => {
          setGroupTwitter(responseJson.twitter);
          responseJson.twitter === null
            ? setTwitterOption(option)
            : setTwitterOption(responseJson.twitter);
        });
    } else {
      setTwitterOption(option);
    }
  }

  async function fetchTweets() {
    // Get twitters to show
    await fetch(`${API_URL}/twitter_apis/${twitterOption}`)
      .then(response => response.json())
      .then(responseJson => {
        setTwitter(responseJson.twitter_api.tweets.slice(0, 10));
        setLoading(false);
      });
  }

  useEffect(() => {
    userTwitters();
  }, []);

  useEffect(() => {
    fetchTweets();
  }, [twitterOption]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#348EAC'}} />
      <Container>
        <ScrollNoticias>
          <NoticiasTitle>Notícias</NoticiasTitle>
          <FeedTitle>Feed RSS do Guardiões</FeedTitle>
          <TwitterOptionContainer>
            {groupTwitter !== null ? (
              <TwitterOption>
                <OptionLeft
                  onPress={() => {
                    setTwitterOption(appTwitter);
                  }}>
                  <OptionText>{appTwitter}</OptionText>
                </OptionLeft>
                <OptionRight
                  onPress={() => {
                    setTwitterOption(groupTwitter);
                  }}>
                  <OptionText>{groupTwitter}</OptionText>
                </OptionRight>
              </TwitterOption>
            ) : null}
          </TwitterOptionContainer>
          <List
            data={twitters.slice(0, 15)}
            keyExtractor={twitters => String(twitters.id)}
            renderItem={({item}) => <NoticiasComponent data={item} />}
          />
        </ScrollNoticias>
      </Container>
    </>
  );
}

Noticias['navigationOptions'] = () => ({
  title: translate('news.title'),
});
