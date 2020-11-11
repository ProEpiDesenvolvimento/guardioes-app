import React, { Component } from 'react';

import { ScrollViewStyled, Terms } from './styles';

import translate from '../../../../locales/i18n';

class TermosPoliticas extends Component {
    static navigationOptions = {
        title: translate("useTerms.title")
    }

    render() {
        return (
            <ScrollViewStyled>
                <Terms>{translate("useTerms.terms.textoTermosTitulo")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_1")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_2")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_3")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_4")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_5")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_6")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_7")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_8")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_9")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_10")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_11")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_12")}</Terms>
                <Terms>{translate("useTerms.terms.textoTermos_13")}</Terms>
            </ScrollViewStyled>
        );
    }
}

export default TermosPoliticas;
