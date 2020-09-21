import React, { PureComponent } from 'react';

import { WebView } from 'react-native-webview';
import translate from "../../../../locales/i18n";

class FAQ extends PureComponent {
    static navigationOptions = {
        title: translate("faq.title")
    }

    render() {
        return (
            <WebView
                source={{ uri: 'https://proepi.org.br/faq-gds/' }}
                startInLoadingState={true}
            />
        );
    }
}

export default FAQ;
