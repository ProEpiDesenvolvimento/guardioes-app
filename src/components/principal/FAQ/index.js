import React, { PureComponent } from 'react';

import { WebView } from 'react-native-webview';
import translate from "../../../../locales/i18n";

class FAQ extends PureComponent {
    static navigationOptions = {
        title: translate("ajuda.title")
    }

    render() {
        return (
            <WebView
                source={{ uri: 'https://proepi.org.br/guardioes-da-saude-faq' }}
            />
        );
    }
}

export default FAQ;
