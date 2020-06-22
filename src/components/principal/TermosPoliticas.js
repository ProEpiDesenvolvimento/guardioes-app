import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { scale } from '../../utils/scallingUtils';
import translate from '../../../locales/i18n';

class TermosPoliticas extends Component {
    static navigationOptions = {
        title: translate("useTerms.title")
    }

    render() {

        return (
            <ScrollView>
                <View style={{ paddingHorizontal: scale(30) }}>
                    <Text>{translate("useTerms.terms.textoTermosTitulo")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_1")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_2")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_3")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_4")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_5")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_6")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_7")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_8")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_9")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_10")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_11")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_12")}</Text>
                    <Text>{translate("useTerms.terms.textoTermos_13")}</Text>
                </View>

            </ScrollView>
        );
    }
}

export default TermosPoliticas;
