import React from 'react';
import Emoji from 'react-native-emoji';

import { scale } from '../../../../utils/scallingUtils';

const Emojis = [
  <Emoji // Emoji heart up
    name='heart'
    style={{ fontSize: scale(15) }}
  />,
  <Emoji // Emoji tada up
    name='heavy_check_mark'
    style={{ fontSize: scale(15) }}
  />,
];

export default Emojis;
