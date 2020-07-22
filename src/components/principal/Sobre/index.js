import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { logoAzUnB, logoAzProEpi } from '../../../imgs/imageConst';
import { scale } from '../../../utils/scallingUtils';
import { Redirect } from '../../../utils/constUtils';
import translate from "../../../../locales/i18n";

class Sobre extends Component {
    static navigationOptions = {
        title: translate("about.title")
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textView}>
                    <Text style={styles.textTitulo}>{translate("about.textoSobreTitulo")}</Text>
                    <Text style={styles.text}>{translate("about.textoSobre")}</Text>
                </View>

                <View style={styles.imagesView}>
                    <TouchableOpacity
                        onPress={() => Redirect(translate("about.tituloBtnProEpi"), translate("about.mensagemBtnProEpi"), translate("about.linkBtnProEPi"))}
                    >
                        <Image source={logoAzProEpi} style={styles.imageLogo} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Redirect(translate("about.tituloBtnUnb"), translate("about.mensagemBtnUnb"), translate("about.linkBtnUnb"))}
                    >
                        <Image source={logoAzUnB} style={styles.imageLogo} />
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
        paddingHorizontal: '7%'
    },
    imagesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: scale(25),
        marginBottom: scale(20)
    },
    textTitulo: {
        fontFamily: 'ArgentumSans-SemiBold',
        fontSize: 30,
        color: '#32323B',
        //backgroundColor: '#ffffff',
    },
    text: {
        fontFamily: 'ArgentumSans',
        fontSize: 16,
        textAlign: 'justify',
        color: '#2b3d51'
    },
    imageLogo: {
        height: scale(100),
        width: scale(100)
    }
})

export default Sobre;