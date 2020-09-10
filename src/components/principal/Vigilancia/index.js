import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { ScrollViewStyled, Title, BodyText } from './styles';
import { 
    FormGroup,
    FormGroupChild,
    FormLabel,
    Selector,
    NormalInput,
    SendContainer,
    SendText,
    Button
} from '../../styled/NormalForms'
import translate from "../../../../locales/i18n";

function Vigilancia() {    
    const [vigilance, setVigilance] = useState('Não')
    const [phone, setPhone] = useState('')
    const [showPhone, setShowPhone] = useState(false)

    async function submitVigilance(value){
        if(value){
            setVigilance('Sim')
            setShowPhone(true)
        } else {
            setVigilance('Não')
            setShowPhone(false)
        }
    }

    return(
        <SafeAreaView style={{flex: 0, backgroundColor: '#F8F8F8'}}>
            <ScrollViewStyled>
                <Title>
                    O que é?
                </Title>
                <BodyText>
                    {translate("about.textoVigilancia")}
                </BodyText>
                <Title>
                    Seu status de participação
                </Title>
                <FormGroup>
                    <FormGroupChild>
                        <FormLabel>Participando?</FormLabel>
                        <Selector
                            data={[
                                { key: true, label: 'Sim' },
                                { key: false, label: 'Não' }
                            ]}
                            initValue={vigilance}
                            cancelText={translate("selector.cancelButton")}
                            onChange={async (option) => {
                                await submitVigilance(option.key)

                            }}
                        />
                    </FormGroupChild>
                    {showPhone ? 
                        <FormGroupChild>
                            <FormLabel>
                                Telefone:
                            </FormLabel>
                            <NormalInput
                                returnKeyType='done'
                                keyboardType='number-pad'
                                onChangeText={async (text) => {
                                    await setPhone(text)
                                }}
                            />
                        </FormGroupChild>
                    : null
                    }
                    
                </FormGroup>

                <Button onPress={async () => await this.handleEdit()}>
                    <SendContainer>
                        <SendText>Salvar</SendText>
                    </SendContainer>
                </Button>
            </ScrollViewStyled>
        </SafeAreaView>
    )
}

Vigilancia.navigationOptions = {
    title: "Vigilância Ativa"
}

export default Vigilancia;
