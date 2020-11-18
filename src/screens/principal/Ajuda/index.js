import React from 'react';

import { Help, Box, Button, IconWrapper, InfoWrapper, Title } from './styles';

import { TermsIcon, TutorialIcon, InfoIcon } from '../../../img/imageConst';
import { scale } from '../../../utils/scallingUtils';
import translate from '../../../../locales/i18n';

const Ajuda = ({ navigation }) => {
  const { navigate } = navigation;

  const BoxItem = ({ title, children, onPress }) => (
    <Box>
      <Button onPress={onPress}>
        <IconWrapper>{children}</IconWrapper>
        <InfoWrapper>
          <Title>{title}</Title>
        </InfoWrapper>
      </Button>
    </Box>
  );

  return (
    <Help>
      <BoxItem
        title={translate('ajuda.tutorialBtn')}
        onPress={() => navigate('Tutorial')}
      >
        <TutorialIcon height={scale(45)} width={scale(45)} />
      </BoxItem>

      <BoxItem
        title={translate('ajuda.useTermsBtn')}
        onPress={() => navigate('TermosPoliticas')}
      >
        <TermsIcon height={scale(45)} width={scale(45)} />
      </BoxItem>

      <BoxItem
        title={translate('ajuda.aboutBtn')}
        onPress={() => navigate('Sobre')}
      >
        <InfoIcon height={scale(45)} width={scale(45)} />
      </BoxItem>
    </Help>
  );
};

Ajuda.navigationOptions = {
  title: translate('ajuda.title'),
};

export default Ajuda;
