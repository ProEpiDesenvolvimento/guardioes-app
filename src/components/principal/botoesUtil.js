import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default botoes = props => (
    <TouchableOpacity 
        style={styles.selector}
        onPress={() => props.onPress}
    >
        <Text style={styles.textoSelector}>
            {props.nome}
        </Text>
        {props.IconNome}
    </TouchableOpacity>
)