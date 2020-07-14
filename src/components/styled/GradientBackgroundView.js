import styled from 'styled-components';

import LinearGradient from 'react-native-linear-gradient';

export default styled(LinearGradient).attrs({
    colors: ['#5DD39E', '#348EAC'],
})`
    flex: 1;
    align-items: center;
    justify-content: center;
`;