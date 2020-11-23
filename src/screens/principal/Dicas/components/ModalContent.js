import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import translate from '../../../../../locales/i18n';
import Colors from '../../../../styles/colors';
import { Redirect } from '../../../../utils/constUtils';
import { scale } from '../../../../utils/scallingUtils';
import {
  Details,
  DetailsIcon,
  DetailsTitleWrapper,
  DetailsTitle,
  DetailsBodyText,
  DetailsButton,
  DetailsButtonLabel,
} from '../styles';

Feather.loadFont();

const ModalContent = ({
  onRequestClose,
  title,
  body,
  source,
  modalVisible,
}) => (
  <Modal
    animationType='fade'
    transparent
    visible={modalVisible}
    onRequestClose={
      onRequestClose // Exit to modal view
    }
  >
    <SafeAreaView style={{ flex: 1 }}>
      <Details>
        <DetailsIcon>
          <TouchableOpacity onPress={onRequestClose}>
            <Feather
              name='arrow-left-circle'
              size={scale(35)}
              color={Colors.accent}
            />
          </TouchableOpacity>
        </DetailsIcon>

        <DetailsTitleWrapper>
          <DetailsTitle>{title}</DetailsTitle>
        </DetailsTitleWrapper>

        <ScrollView>
          <DetailsBodyText>{body}</DetailsBodyText>
        </ScrollView>

        <DetailsButton
          onPress={() =>
            Redirect(
              translate('advices.moreInformations'),
              translate('advices.redirectPermission'),
              source
            )
          }
        >
          <DetailsButtonLabel>{translate('advices.more')}</DetailsButtonLabel>
        </DetailsButton>
      </Details>
    </SafeAreaView>
  </Modal>
);

ModalContent.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  source: PropTypes.string,
  modalVisible: PropTypes.bool.isRequired,
};

ModalContent.defaultProps = {
  source: null,
  title: null,
  body: null,
};

export default ModalContent;
