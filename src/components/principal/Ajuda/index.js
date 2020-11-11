import React, { Component } from 'react';

import { Help, Box, Button, IconWrapper, InfoWrapper, Title } from './styles';

import { TermsIcon, TutorialIcon, InfoIcon } from '../../../imgs/imageConst';
import { scale } from '../../../utils/scallingUtils';
import translate from "../../../../locales/i18n";

class Ajuda extends Component {
    static navigationOptions = {
        title: translate("ajuda.title")
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Help>
                <Box>
                    <Button onPress={() => navigate('Tutorial')}>
                        <IconWrapper>
                            <TutorialIcon height={scale(45)} width={scale(45)} />
                        </IconWrapper>
                        <InfoWrapper>
                            <Title>
                                {translate("ajuda.tutorialBtn")}
                            </Title>
                        </InfoWrapper>
                    </Button>
                </Box>

                <Box>
                    <Button onPress={() => navigate('TermosPoliticas')}>
                        <IconWrapper>
                            <TermsIcon height={scale(45)} width={scale(45)} />
                        </IconWrapper>
                        <InfoWrapper>
                            <Title>
                                {translate("ajuda.useTermsBtn")}
                            </Title>
                        </InfoWrapper>
                    </Button>
                </Box>

                <Box>
                    <Button onPress={() => navigate('Sobre')}>
                        <IconWrapper>
                            <InfoIcon height={scale(45)} width={scale(45)} />
                        </IconWrapper>
                        <InfoWrapper>
                            <Title>
                                {translate("ajuda.aboutBtn")}
                            </Title>
                        </InfoWrapper>
                    </Button>
                </Box>
            </Help>
        );
    }
}

export default Ajuda;
