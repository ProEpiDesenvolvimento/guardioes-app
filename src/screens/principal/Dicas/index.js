import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import RNSecureStorage from 'rn-secure-storage';
import { APP_ID } from 'react-native-dotenv';

import { getTips } from '../../../services/TipService';
import AdviceItem from './components/AdviceItem';
import ModalContent from './components/ModalContent';
import Colors from '../../../styles/colors';
import ScreenLoader from '../../../components/ScreenLoader';
import {
  Container,
  ScrollViewStyled,
  TitleWrapper,
  Title,
  SubTitle,
  AdvicesView,
  Touch,
} from './styles';
import { Redirect } from '../../../utils/constUtils';
import translate from '../../../../locales/i18n';

const advicesText = {
  redirect: {
    title: translate('advices.buttons.messages.title'),
    text: translate('advices.buttons.messages.subtitle'),
  },
};
class Dicas extends Component {
  static navigationOptions = {
    title: translate('advices.title'),
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;

    navigation.addListener('willFocus', () => {
      this.fetchData();
    });

    this.state = {
      modalVisible: false,
      isLoading: true,
      dataSource: [],
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  fetchData = async () => {
    // Get user info
    const userToken = await RNSecureStorage.get('userToken');
    this.setState({ userToken });
    this.getContents();
  };

  getContents = async () => {
    const { userToken } = this.state;
    await getTips(userToken).then((responseJson) => {
      const sortedContents = this.sortContents(responseJson.contents);
      this.setState({ dataSource: sortedContents || [] });
      this.setState({ isLoading: false });
    });
  };

  sortContents = (contents = []) => {
    contents.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return contents;
  };

  render() {
    const {
      dataSource,
      isLoading,
      modalVisible,
      contentTitle,
      contentBody,
      contentSource,
    } = this.state;

    if (isLoading) {
      return <ScreenLoader />;
    }

    const onTipPress = (content) => {
      if (content.content_type === 'redirect') {
        Redirect(
          advicesText.redirect.title,
          advicesText.redirect.text,
          content.source_link
        );
      } else {
        this.setModalVisible(true);
        this.setState({
          contentTitle: content.title,
          contentBody: content.body,
          contentSource: content.source_link,
        });
      }
    };

    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primary }} />
        <Container>
          <ScrollViewStyled>
            <TitleWrapper>
              <Title>{translate('advices.title')}</Title>
              <SubTitle>{translate('advices.subtitle')}</SubTitle>
            </TitleWrapper>

            <AdvicesView>
              {dataSource?.map(
                (content) =>
                  content.app.id === +APP_ID && (
                    <Touch key={content.id} onPress={() => onTipPress(content)}>
                      <AdviceItem title={content.title} icon={content.icon} />
                    </Touch>
                  )
              )}
            </AdvicesView>
          </ScrollViewStyled>
          <ModalContent
            visible={modalVisible}
            onRequestClose={
              () => this.setModalVisible(!modalVisible) // Exit to modal view
            }
            title={contentTitle}
            body={contentBody}
            source={contentSource}
            modalVisible={modalVisible}
          />
        </Container>
      </>
    );
  }
}

// make this component available to the app
export default Dicas;
