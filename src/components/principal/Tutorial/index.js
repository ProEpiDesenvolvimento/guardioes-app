import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { ScrollViewStyled, Title, Subtitle, BodyText } from './styles';

import translate from '../../../../locales/i18n';

class Tutorial extends Component {
    static navigationOptions = {
        title: translate("tutorial.title")
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <ScrollViewStyled>
                <Title>
                    {translate("tutorial.tutorial")}
                </Title>

                {/* Como Usar */}
                <BodyText>{translate("tutorial.howToUse")}</BodyText>

                {/* Continuacao de como usar */}
                <BodyText>{translate("tutorial.howToUse2")}</BodyText>

                {/* Mudando para Noticias, titulo */}
                <TouchableOpacity onPress={() => navigate('Noticias')}>
                    <Subtitle>
                        {translate("tutorial.news")}
                    </Subtitle>
                </TouchableOpacity>
                <BodyText>
                    {translate("tutorial.newsCont")}
                </BodyText>
                
                <BodyText style={{ fontWeight: 'bold' }}>
                    {translate("tutorial.newsPs")}
                </BodyText>

                {/* Conselhos de Saude */}
                <TouchableOpacity onPress={() => navigate('Conselho')}>
                    <Subtitle>
                        {translate("tutorial.advices")}
                    </Subtitle>
                </TouchableOpacity>
                <BodyText>
                    {translate("tutorial.advicesCont")}
                </BodyText>

                {/* Diario */}
                <TouchableOpacity onPress={() => navigate('Diario')}>
                    <Subtitle>
                        {translate("tutorial.diary")}
                    </Subtitle>
                </TouchableOpacity>
                <BodyText>
                    {translate("tutorial.diaryCont")}
                </BodyText>

                {/* Mapa da Saude */}
                <TouchableOpacity onPress={() => navigate('Mapa')}>
                    <Subtitle>
                        {translate("tutorial.healthMap")}
                    </Subtitle>
                </TouchableOpacity>
                <BodyText>
                    {translate("tutorial.healthMapCont")}
                </BodyText>
            </ScrollViewStyled>
        )
    }
}

export { Tutorial };
