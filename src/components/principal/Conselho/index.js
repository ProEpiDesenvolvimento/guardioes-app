import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ActivityIndicator, View, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { Container, ScrollViewStyled, TitleWrapper, Title, SubTitle, AdvicesView, AdviceShadow, Advice, AdviceTitle, AdviceIcon } from './styles';
import { Details, DetailsIcon, DetailsTitleWrapper, DetailsTitle, DetailsBodyText, DetailsButton, DetailsButtonLabel } from './styles';

import RNSecureStorage from 'rn-secure-storage';
import { Redirect } from '../../../utils/constUtils';
import { InsectIcon } from '../../../imgs/imageConst';
import { scale } from '../../../utils/scallingUtils';
import translate from '../../../../locales/i18n';
import {API_URL, APP_ID} from 'react-native-dotenv';

Feather.loadFont();

class Conselho extends Component {
    static navigationOptions = {
        title: translate("advices.title")
    }
    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus', payload => {
            //console.log(payload)
            //this.fetchData();
        });
        this.state = {
            modalVisible: false,
            isLoading: true,
            contentData: null
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    fetchData = async () => { //Get user info
        const userToken = await RNSecureStorage.get('userToken');
        this.setState({ userToken });
        this.getContents();
    }

    getContents = () => {
        return fetch(`${API_URL}/contents/`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.contents,
                    isLoading: false,
                })
            })
    }

    getContentIcon = (icon) => {
        if (icon == "insect") {
            return (<InsectIcon height={scale(50)} width={scale(50)} />)
        }
    }

    render() {
        const contentsData = this.state.dataSource;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <Container>
                <ScrollViewStyled>
                    <TitleWrapper>
                        <Title>Dicas</Title>
                        <SubTitle>Mantenha a saúde em dia</SubTitle>
                    </TitleWrapper>

                    <AdvicesView>
                        {/* Farmacias */}
                        <AdviceShadow>
                            <Advice
                                onPress={() => Redirect(textoRedirect.hospitais.texto1, textoRedirect.hospitais.texto2, 'https://www.google.com/maps/search/?api=1&query=farmacias')}
                            >
                                <AdviceTitle>
                                    {translate("advices.buttons.pharmacy")}
                                </AdviceTitle>
                                <AdviceIcon>
                                    <InsectIcon height={scale(50)} width={scale(50)} />
                                </AdviceIcon>
                            </Advice>
                        </AdviceShadow>

                        {contentsData != null ?
                            contentsData.map((content) => {
                                if (content.app.id == APP_ID) {
                                    return (
                                        <AdviceShadow key={content.id}>
                                            <Advice
                                                onPress={() => {
                                                    this.setModalVisible(true)
                                                    this.setState({ contentTitle: content.title, contentBody: content.body, contentSource: content.source_link })
                                                }}
                                            >
                                                    <AdviceTitle>
                                                        {content.title}
                                                    </AdviceTitle>
                                                    <AdviceIcon>
                                                        {/*this.getContentIcon(content.icon)*/}
                                                        <InsectIcon height={scale(50)} width={scale(50)} />
                                                    </AdviceIcon>
                                            </Advice>
                                        </AdviceShadow>
                                    )
                                }
                            })
                        : null}

                        {/* Instituicoes */}
                        <AdviceShadow>
                            <Advice
                                onPress={() => Redirect(textoRedirect.hospitais.texto1, textoRedirect.hospitais.texto2, 'https://www.google.com/maps/search/?api=1&query=hospitais')}
                            >
                                <AdviceTitle>{translate("advices.buttons.healthInst")}</AdviceTitle>
                                <AdviceIcon>
                                    <InsectIcon height={scale(50)} width={scale(50)} />
                                </AdviceIcon>
                            </Advice>
                        </AdviceShadow>
                    </AdvicesView>
                </ScrollViewStyled>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible); //Exit to modal view
                    }}
                >
                    <Details>
                        <DetailsIcon>
                            <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                <Feather name="arrow-left-circle" size={scale(35)} color="#5DD39E" />
                            </TouchableOpacity>
                        </DetailsIcon>

                        <DetailsTitleWrapper>
                            <DetailsTitle>
                                {this.state.contentTitle}
                            </DetailsTitle>
                        </DetailsTitleWrapper>

                        <ScrollView>
                            <DetailsBodyText>
                                {this.state.contentBody}
                            </DetailsBodyText>
                        </ScrollView>

                        <DetailsButton onPress={() => Redirect("Mais Informações", "Deseja ser redirecionado para a fonte do conteúdo?", this.state.contentSource)}>
                            <DetailsButtonLabel>Saiba Mais</DetailsButtonLabel>
                        </DetailsButton>
                    </Details>
                </Modal>
            </Container>
        );
    }
}

const textoRedirect = {
    hospitais: {
        texto1: translate("advices.buttons.messages.title"),
        texto2: translate("advices.buttons.messages.subtitle")
    }
}

//make this component available to the app
export default Conselho;
