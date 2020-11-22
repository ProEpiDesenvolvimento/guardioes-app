import React from 'react';

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

export default UserCard;
