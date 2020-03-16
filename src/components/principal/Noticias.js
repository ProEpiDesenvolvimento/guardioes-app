import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';
import translate from '../../../locales/i18n';

// create a component
class Noticias extends Component {
    static navigationOptions = {
        title: translate("news.title"),
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{ uri: 'https://twitter.com/Proepi_' }}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default Noticias;
