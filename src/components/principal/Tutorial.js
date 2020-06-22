import React, { Component } from 'react';
import { Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { scale } from '../../utils/scallingUtils';
import translate from '../../../locales/i18n';


onPress = (rota, navigation) => {
    navigation.navigate(`${rota}`)
}

class Tutorial extends Component {
    static navigationOptions = {
        title: translate("tutorial.title")
    }
    render() {
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: scale(30) }}>
                    {/* Titulo */}
                    <Text style={{ fontSize: scale(20), fontWeight: 'bold' }}>{translate("tutorial.tutorial")}</Text>

                    {/* Como Usar */}
                    <Text>{translate("tutorial.howToUse")}</Text>

                    {/* Continuacao de como usar */}
                    <Text>{translate("tutorial.howToUse2")}</Text>

                    {/* Mudando para Noticias, titulo */}
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Noticias', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>
                            {translate("tutorial.news")}
                        </Text>
                        
                    </TouchableOpacity>

                    {/* Conteudo de noticias */}
                    <Text>{translate("tutorial.newsCont")}</Text>
                    {/* Ps em noticias e um emoji piscando */}
                    <Text style={{ fontWeight: 'bold' }}>{translate("tutorial.newsPs")}</Text>

                    {/* Conselhos de Saude */}
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Conselho', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>
                            {translate("tutorial.advices")}
                        </Text>
                        
                    </TouchableOpacity>
                    <Text>{translate("tutorial.advicesCont")}</Text>

                    {/* Diario */}
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Diario', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>
                            {translate("tutorial.diary")}
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        {translate("tutorial.diaryCont")}
                    </Text>

                    {/* Mapa da Saude */}
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => onPress('Mapa', this.props.navigation)}
                    >
                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', paddingVertical: scale(10), textDecorationLine: 'underline' }}>
                            {translate("tutorial.healthMap")}
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        {translate("tutorial.healthMapCont")}
                    </Text>
                </View>
            </ScrollView>
        )
    }
}

export { Tutorial };
