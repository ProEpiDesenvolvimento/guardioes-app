import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { ScrollViewStyled, Title, ImageContainer, BodyText } from './styles';

import { logoAzUnB, logoAzProEpi } from '../../../imgs/imageConst';
import { scale } from '../../../utils/scallingUtils';
import { Redirect } from '../../../utils/constUtils';
import translate from "../../../../locales/i18n";

class Sobre extends Component {
    static navigationOptions = {
        title: translate("about.title")
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <ScrollViewStyled>
                <Title>
                    {translate("about.textoSobreTitulo")}
                </Title>
                
                <ImageContainer>
                    <TouchableOpacity
                        onPress={() => Redirect(translate("about.tituloBtnProEpi"), translate("about.mensagemBtnProEpi"), translate("about.linkBtnProEPi"))}
                    >
                        <Image source={logoAzProEpi} style={{ height: scale(60), width: scale(60) }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Redirect(translate("about.tituloBtnUnb"), translate("about.mensagemBtnUnb"), translate("about.linkBtnUnb"))}
                    >
                        <Image source={logoAzUnB} style={{ height: scale(60), width: scale(60) }} />
                    </TouchableOpacity>
                </ImageContainer>

                <BodyText>
                    {translate("about.textoSobre")}
                </BodyText>
            </ScrollViewStyled>
        );
    }
}

export default Sobre;