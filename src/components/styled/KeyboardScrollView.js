import styled from 'styled-components';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default styled(KeyboardAwareScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})``;