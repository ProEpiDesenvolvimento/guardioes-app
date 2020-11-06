import React, {Component} from 'react';
import {SafeAreaView, TouchableOpacity, ScrollView, Modal} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ScreenLoader from '../../userData/ScreenLoader';
import {
  Container,
  ScrollViewStyled,
  TitleWrapper,
  Title,
  SubTitle,
  AdvicesView,
  Touch,
  Advice,
  AdviceTitle,
  AdviceIcon,
  Details,
  DetailsIcon,
  DetailsTitleWrapper,
  DetailsTitle,
  DetailsBodyText,
  DetailsButton,
  DetailsButtonLabel,
} from './styles';

import RNSecureStorage from 'rn-secure-storage';
import {Redirect} from '../../../utils/constUtils';
import {
  BedIcon,
  DoctorIcon,
  GermIcon,
  HelplineIcon,
  HomeworkIcon,
  HospitalIcon,
  InsectIcon,
  MaskIcon,
} from '../../../imgs/imageConst';
import {
  NoFlightIcon,
  ProtectionIcon,
  SickIcon,
  TentIcon,
  ThermometerIcon,
  VaccineIcon,
  VirusIcon,
  WashIcon,
} from '../../../imgs/imageConst';
import {scale} from '../../../utils/scallingUtils';
import translate from '../../../../locales/i18n';
import {API_URL, APP_ID} from 'react-native-dotenv';

Feather.loadFont();

class Dicas extends Component {
  static navigationOptions = {
    title: translate('advices.title'),
  };
  constructor(props) {
    super(props);
    this.props.navigation.addListener('willFocus', payload => {
      this.fetchData();
    });
    this.state = {
      modalVisible: false,
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  fetchData = async () => {
    //Get user info
    const userToken = await RNSecureStorage.get('userToken');
    this.setState({userToken});
    this.getContents();
  };

  getContents = () => {
    return fetch(`${API_URL}/contents/`, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        const sortedContents = this.sortContents(responseJson.contents);

        if (sortedContents) {
          this.setState({dataSource: sortedContents});
        }

        this.setState({isLoading: false});
      });
  };

  sortContents = (contents = []) => {
    contents.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    console.log(contents, 'ORDENADO');
    return contents;
  };

  getContentIcon = icon => {
    const size = scale(50);

    switch (icon) {
      case 'bed':
        return <BedIcon height={size} width={size} />;
      case 'doctor':
        return <DoctorIcon height={size} width={size} />;
      case 'germ':
        return <GermIcon height={size} width={size} />;
      case 'helpline':
        return <HelplineIcon height={size} width={size} />;
      case 'homework':
        return <HomeworkIcon height={size} width={size} />;
      case 'hospital':
        return <HospitalIcon height={size} width={size} />;
      case 'insect':
        return <InsectIcon height={size} width={size} />;
      case 'mask':
        return <MaskIcon height={size} width={size} />;
      case 'no-flight':
        return <NoFlightIcon height={size} width={size} />;
      case 'protection':
        return <ProtectionIcon height={size} width={size} />;
      case 'sick':
        return <SickIcon height={size} width={size} />;
      case 'tent':
        return <TentIcon height={size} width={size} />;
      case 'thermometer':
        return <ThermometerIcon height={size} width={size} />;
      case 'vaccine':
        return <VaccineIcon height={size} width={size} />;
      case 'virus':
        return <VirusIcon height={size} width={size} />;
      case 'wash':
        return <WashIcon height={size} width={size} />;
    }

    return <SickIcon height={size} width={size} />;
  };

  render() {
    const contentsData = this.state.dataSource;

    if (this.state.isLoading) {
      return <ScreenLoader />;
    }

    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: '#348EAC'}} />
        <Container>
          <ScrollViewStyled>
            <TitleWrapper>
              <Title>{translate('advices.title')}</Title>
              <SubTitle>{translate('advices.subtitle')}</SubTitle>
            </TitleWrapper>

            <AdvicesView>
              {contentsData != null
                ? contentsData.map(content => {
                    if (content.app.id == APP_ID) {
                      return (
                        <Touch
                          key={content.id}
                          onPress={() => {
                            if (content.content_type === 'redirect') {
                              Redirect(
                                advicesText.redirect.title,
                                advicesText.redirect.text,
                                content.source_link,
                              );
                            } else {
                              this.setModalVisible(true);
                              this.setState({
                                contentTitle: content.title,
                                contentBody: content.body,
                                contentSource: content.source_link,
                              });
                            }
                          }}>
                          <Advice>
                            <AdviceTitle numberOfLines={3}>
                              {content.title}
                            </AdviceTitle>
                            <AdviceIcon>
                              {this.getContentIcon(content.icon)}
                            </AdviceIcon>
                          </Advice>
                        </Touch>
                      );
                    }
                  })
                : null}
            </AdvicesView>
          </ScrollViewStyled>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={
              () => this.setModalVisible(!this.state.modalVisible) //Exit to modal view
            }>
            <SafeAreaView style={{flex: 1}}>
              <Details>
                <DetailsIcon>
                  <TouchableOpacity
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Feather
                      name="arrow-left-circle"
                      size={scale(35)}
                      color="#5DD39E"
                    />
                  </TouchableOpacity>
                </DetailsIcon>

                <DetailsTitleWrapper>
                  <DetailsTitle>{this.state.contentTitle}</DetailsTitle>
                </DetailsTitleWrapper>

                <ScrollView>
                  <DetailsBodyText>{this.state.contentBody}</DetailsBodyText>
                </ScrollView>

                <DetailsButton
                  onPress={() =>
                    Redirect(
                      'Mais Informações',
                      'Deseja ser redirecionado para a fonte do conteúdo?',
                      this.state.contentSource,
                    )
                  }>
                  <DetailsButtonLabel>Saiba Mais</DetailsButtonLabel>
                </DetailsButton>
              </Details>
            </SafeAreaView>
          </Modal>
        </Container>
      </>
    );
  }
}

const advicesText = {
  redirect: {
    title: translate('advices.buttons.messages.title'),
    text: translate('advices.buttons.messages.subtitle'),
  },
};

//make this component available to the app
export default Dicas;
