import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { scale } from '../scallingUtils';
import { Redirect, textos } from '../../constUtils';
import { imagemFundo, imagemUnb, imagemCenteias } from '../../imgs/imageConst';

export const ConselhoContent = props => {
    return (
        <ImageBackground style={styles.container} source={imagemFundo} imageStyle={{ resizeMode: 'center', marginLeft: '5%', marginRight: '5%' }}>

            <ScrollView contentContainerStyle={styles.scrollViewStyle}>

                <Text>
                    {props.incomePages}
                </Text>

                <View style={styles.imagesView}>
                    <TouchableOpacity
                        onPress={() => Redirect(textos[1].tituloBtnUnb, textos[1].mensagemBtnUnb, textos[1].linkBtnUnb)}
                    >
                        <Image source={imagemUnb} style={styles.imageOne} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Redirect(textos[2].tituloBtnCenteias, textos[2].mensagemBtnCenteias, textos[2].linkBtnCenteias)}
                    >
                        <Image source={imagemCenteias} style={styles.imageTwo} />
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </ImageBackground>
    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewStyle: {
        marginHorizontal: 25,
        paddingTop: 15,
    },
    imagesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
    },
    text: {
        fontFamily: 'myriadpro',
        fontSize: 18,
        fontWeight: '300'
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
