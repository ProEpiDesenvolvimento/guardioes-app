import styled from 'styled-components'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export const KeyboardScrollView = styled(KeyboardAwareScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
    },
})``
