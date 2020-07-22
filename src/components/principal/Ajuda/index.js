import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { Help, Box, IconWrapper, InfoContainer, InfoWrapper, Name } from './styles';

import { scale } from '../../../utils/scallingUtils';
import translate from "../../../../locales/i18n";

import Agenda from '../../../imgs/diversos/terms-and-conditions.svg';
import Idea from '../../../imgs/diversos/online-learning.svg';

class Ajuda extends Component {
    static navigationOptions = {
        title: translate("ajuda.title")
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Help>
                <Box>
                    <TouchableOpacity style={{flexDirection: "row", flex: 1}} onPress={() => navigate('TermosPoliticas')}>
                        <IconWrapper>
                            <Agenda height={scale(45)} width={scale(45)} />
                        </IconWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <Name>
                                    {translate("ajuda.useTermsBtn")}
                                </Name>
                            </InfoWrapper>
                        </InfoContainer>
                    </TouchableOpacity>
                </Box>

                <Box>
                    <TouchableOpacity style={{flexDirection: "row", flex: 1}} onPress={() => navigate('Tutorial')}>
                        <IconWrapper>
                            <Idea height={scale(45)} width={scale(45)} />
                        </IconWrapper>
                        <InfoContainer>
                            <InfoWrapper>
                                <Name>
                                    {translate("ajuda.tutorialBtn")}
                                </Name>
                            </InfoWrapper>
                        </InfoContainer>
                    </TouchableOpacity>
                </Box>
            </Help>
        );
    }
}

export default Ajuda;
