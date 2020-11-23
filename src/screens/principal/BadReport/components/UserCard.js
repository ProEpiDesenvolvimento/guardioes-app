import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from 'react-native-elements';
import { User, IconWrapper, InfoWrapper, Name } from '../styles';
import { scale } from '../../../../utils/scallingUtils';

const UserCard = ({ avatarSelected, nameInitials, avatarSize, nameParts }) => (
  <User>
    <IconWrapper>
      <Avatar
        size={scale(avatarSize)}
        source={avatarSelected}
        title={nameInitials}
        rounded
      />
    </IconWrapper>
    <InfoWrapper>
      <Name>{nameParts}</Name>
    </InfoWrapper>
  </User>
);

UserCard.propTypes = {
  avatarSelected: PropTypes.string,
  nameInitials: PropTypes.string.isRequired,
  avatarSize: PropTypes.number.isRequired,
  nameParts: PropTypes.string.isRequired,
};

UserCard.defaultProps = {
  avatarSelected: null,
};

export default UserCard;
