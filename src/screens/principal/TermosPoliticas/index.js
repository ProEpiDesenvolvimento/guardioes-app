import React from 'react'

import { Container } from '../../../components/NormalForms'
import { ScrollViewStyled } from '../../../components/PageItems'
import { Terms } from './styles'

import translate from '../../../../locales/i18n'

const TermosPoliticas = () => {
    return (
        <Container>
            <ScrollViewStyled>
                <Terms>{translate('useTerms.terms.tituloTermos')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_1')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_2')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_3')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_4')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_5')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_6')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_7')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_8')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_9')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_10')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_11')}</Terms>
                <Terms>{translate('useTerms.terms.textoTermos_12')}</Terms>

                <Terms>{translate('useTerms.terms.tituloPoliticas')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_1')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_2')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_3')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_4')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_5')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_6')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_7')}</Terms>
                <Terms>{translate('useTerms.terms.textoPoliticas_8')}</Terms>
            </ScrollViewStyled>
        </Container>
    )
}

export default TermosPoliticas
