import React from 'react';
import PropTypes from 'prop-types';

import { FormTitleWrapper, FormTitle, CheckBoxStyled } from '../styles';
import translate from '../../../../../locales/i18n';

const SymptomsCheck = ({ checked, onPress, symptomsData }) => (
  <>
    <FormTitleWrapper>
      <FormTitle>{translate('badReport.symptoms')}</FormTitle>
    </FormTitleWrapper>
    {!!symptomsData &&
      symptomsData?.map((symptom, index) => (
        <CheckBoxStyled
          key={symptom.code}
          title={symptom.description}
          checked={checked(symptom.code)}
          onPress={() => onPress(symptom.code, index)}
        />
      ))}
  </>
);

SymptomsCheck.propTypes = {
  checked: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  symptomsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SymptomsCheck;
