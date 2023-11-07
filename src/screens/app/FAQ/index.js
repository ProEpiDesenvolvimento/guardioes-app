import React from 'react'
import { WebView } from 'react-native-webview'

const FAQ = () => {
    return (
        <WebView
            source={{ uri: 'https://proepi.org.br/faq-gds/' }}
            startInLoadingState
        />
    )
}

export default FAQ
