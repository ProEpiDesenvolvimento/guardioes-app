import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { imagemUnb, imagemCenteias } from '../../imgs/imageConst';
import { scale } from '../scallingUtils';
import { Redirect, textos } from '../../constUtils';
import translate from "../../../locales/i18n";

class Sobre extends Component {
    static navigationOptions = {
        title: translate("about.title")
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.textView}>
                    <Text style={styles.textTitulo}> {translate("about.textoSobreTitulo")} </Text>
                    <Text style={styles.text}> {translate("about.textoSobre")} </Text>
                </View>

                <View style={styles.imagesView}>
                    <TouchableOpacity
                        onPress={() => Redirect(translate("about.tituloBtnUnb"), translate("about.mensagemBtnUnb"), translate("about.linkBtnUnb"))}
                    >
                        <Image source={imagemUnb} style={styles.imageOne} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Redirect(translate("about.tituloBtnCenteias"), translate("about.mensagemBtnCenteias"), translate("about.linkBtnCenteias"))}
                    >
                        <Image source={imagemCenteias} style={styles.imageTwo} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textView: {
        flex: 3,
        paddingHorizontal: '5%'
    },
    imagesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: scale(30)
    },
    text: {
        fontFamily: 'myriadpro',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'justify'
    },
    textTitulo: {
        fontFamily: 'myriadpro',
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center'
    },
    imageOne: {
        height: scale(100),
        width: scale(100)
    },
    imageTwo: {
        height: scale(100),
        width: scale(100)
    }
})

export default Sobre;
