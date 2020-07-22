import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Modal, Button, TextInput } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import * as Imagem from '../../../imgs/imageConst';
import { Avatar, CheckBox } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import { scale, percentage } from '../../../utils/scallingUtils';
import DatePicker from 'react-native-datepicker';
import {API_URL} from 'react-native-dotenv';
import translate from '../../../../locales/i18n';
import ModalSelector from 'react-native-modal-selector';
import { gender, country, race, household, getGroups, getGroupName, schoolCategory, educationLevel, schoolLocation } from '../../../utils/selectorUtils';
import { state, getCity } from '../../../utils/brasil';

let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

let today = d + "-" + m + "-" + y

class EditarPerfil extends Component {
    static navigationOptions = {
        title: "Editar Perfil"
    }
    constructor(props) {
        super(props)
        this.state = {
            modalVisibleHousehold: false,
            modalVisibleUser: false,
        }
        this.fetchData()
    }

    fetchData = () => {
        const { params } = this.props.navigation.state;
        console.log(params)
    }

    confirmDelete = () => {
        Alert.alert(
            "Deletar Usuário",
            "Deseja deletar esse usuário?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.deleteHousehold() },
            ],
            { cancelable: false },
        )
    }

    deleteHousehold = () => {
        return fetch(`${API_URL}/users/${this.state.userID}/households/${this.state.householdID}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        }).then((response) => {
            console.warn(response.status)
            this.getHouseholds()
        })
    }

    editHousehold = () => {
        if (!this.state.groupCheckbox) {
            this.setState({
                householdIdCode: null,
                householdGroup: null
            })
        }
        fetch(`${API_URL}/users/${this.state.userID}/households/${this.state.householdID}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify(
                {
                    description: this.state.householdName,
                    birthdate: this.state.householdDob,
                    country: this.state.householdCountry,
                    gender: this.state.householdGender,
                    race: this.state.householdRace,
                    kinship: this.state.kinship,
                    picture: this.state.picture,
                    school_unit_id: this.state.householdGroup,
                    identification_code: this.state.householdIdCode
                }
            )
        })
            .then((response) => {
                if (response.status == 200) {
                    console.warn(response.status)
                    this.getHouseholds()
                } else {
                    console.warn(response.status)
                }
            })
    }

    editUser = () => {
        fetch(`${API_URL}/users/${this.state.userID}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify(
                {
                    user_name: this.state.userName,
                    birthdate: this.state.userDob,
                    gender: this.state.userGender,
                    race: this.state.userRace,
                    school_unit_id: this.state.userGroup,
                    identification_code: this.state.userIdCode,
                    is_professional: this.state.isProfessional,
                    risk_group: this.state.riskGroup,
                    state: this.state.userState,
                    city: this.state.userCity
                }
            )
        })
            .then((response) => {
                if (response.status == 200) {
                    console.warn(response.status)
                    //this.getHouseholds()
                } else {
                    console.warn(response.status)
                }
            })
    }

    render() {
        return (
            <ScrollView>
                <Modal //Modal View for household
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisibleHousehold}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisibleHousehold) //Exit to modal view
                    }}>
                    <View style={styles.modalView}>
                        <View style={{ paddingTop: 10 }}></View>
                        <View style={styles.viewCommom}>
                            <Text style={styles.commomText}>{translate("register.name")}</Text>
                            <TextInput style={styles.formInput}
                                value={this.state.householdName}
                                onChangeText={text => this.setState({ householdName: text })}
                            />
                        </View>

                        <View style={styles.viewRow}>
                            <View style={styles.viewChildSexoRaca}>
                                <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                                <ModalSelector
                                    initValueTextStyle={{ color: 'black' }}
                                    style={{ width: '80%', height: '70%' }}
                                    data={gender}
                                    initValue={this.state.householdGender}
                                    onChange={(option) => this.setState({ householdGender: option.key })}
                                />
                            </View>

                            <View style={styles.viewChildSexoRaca}>
                                <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                                <ModalSelector
                                    initValueTextStyle={{ color: 'black' }}
                                    style={{ width: '80%', height: '70%' }}
                                    data={race}
                                    initValue={this.state.householdRace}
                                    onChange={(option) => this.setState({ householdRace: option.key })}
                                />
                            </View>

                        </View>

                        <View style={styles.viewRow}>
                            <View style={styles.viewChildSexoRaca}>
                                <Text style={styles.commomTextView}>Nascimento:</Text>
                                <DatePicker
                                    style={{ width: '80%', height: scale(32), borderRadius: 5, borderWidth: 1, borderColor: 'rgba(0,0,0,0.11)' }}
                                    showIcon={false}
                                    date={this.state.householdDob}
                                    androidMode='spinner'
                                    locale={'pt-BR'}
                                    mode="date"
                                    placeholder={translate("birthDetails.format")}
                                    format="DD-MM-YYYY"
                                    minDate="01-01-1918"
                                    maxDate={today}
                                    confirmBtnText={translate("birthDetails.confirmButton")}
                                    cancelBtnText={translate("birthDetails.cancelButton")}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0
                                        },
                                        dateText: {
                                            justifyContent: "center",
                                            fontFamily: 'roboto',
                                            fontSize: 17
                                        },
                                        placeholderText: {
                                            justifyContent: "center",
                                            fontFamily: 'roboto',
                                            fontSize: 15,
                                            color: 'black'
                                        }
                                    }}
                                    onDateChange={date => this.setState({ householdDob: date })}
                                />
                            </View>

                            <View style={styles.viewChildSexoRaca}>
                                <Text style={styles.commomTextView}>{translate("register.country")}</Text>
                                <ModalSelector
                                    initValueTextStyle={{ color: 'black' }}
                                    style={{ width: '80%', height: '70%' }}
                                    data={country}
                                    initValue={this.state.householdCountry}
                                    onChange={(option) => this.setState({ householdCountry: option.key })}
                                />
                            </View>
                        </View>

                        <View style={styles.viewCommom}>
                            <Text style={styles.commomText}>Parentesco:</Text>
                            <ModalSelector
                                initValueTextStyle={{ color: 'black' }}
                                style={{ width: '90%', height: '70%' }}
                                data={household}
                                initValue={this.state.kinship}
                                onChange={(option) => this.setState({ kinship: option.key })}
                            />
                        </View>

                        <View style={{ paddingTop: 15 }}>
                            <CheckBox
                                title={"É integrante de alguma instituição de Ensino?"}
                                containerStyle={styles.CheckBoxStyle}
                                size={scale(16)}
                                checked={this.state.groupCheckbox}
                                onPress={() => { this.setState({ groupCheckbox: !this.state.groupCheckbox }) }}
                            />
                        </View>
                        {this.state.groupCheckbox && this.state.householdNewInst?
                            <View>
                                <View style={styles.viewRow}>
                                        <View style={styles.viewChildSexoRaca}>
                                                <Text style={styles.commomTextView}>Categoria:</Text>
                                                <ModalSelector
                                                        initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                                        style={{ width: '80%', height: '70%' }}
                                                        data={schoolCategory}
                                                        initValue={this.state.initValueCategory}
                                                        onChange={(option) => this.setState({ householdCategory: option.key, initValueCategory: option.label, householdEducationLevel: null })}
                                                        />
                                        </View>
                                        {this.state.householdCategory == "UNB" ?
                                                <View style={styles.viewChildSexoRaca}>
                                                        <Text style={styles.commomTextView}>Faculdade:</Text>
                                                        <ModalSelector
                                                                initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                                                style={{ width: '80%', height: '70%' }}
                                                                data={getGroups("UNB", "", "")}
                                                                initValue={this.state.initValueGroup}
                                                                onChange={async (option) => {
                                                                        await this.setState({ householdGroup: option.key, initValueGroup: option.label })
                                                                }}
                                                                />
                                                </View>
                                                : this.state.householdCategory == "SES-DF" ?
                                                <View style={styles.viewChildSexoRaca}>
                                                    <Text style={styles.commomTextView}>Nivel de Ensino:</Text>
                                                    <ModalSelector
                                                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                                            style={{ width: '80%', height: '70%' }}
                                                            data={educationLevel}
                                                            initValue={this.state.initValueEducationLevel}
                                                            onChange={(option) => this.setState({ householdEducationLevel: option.key, initValueEducationLevel: option.label })}
                                                            />
                                                </View>
                                                : null}
                                </View>
                                {this.state.householdEducationLevel != null ?
                                    <View style={styles.viewRow}>
                                        <View style={styles.viewChildSexoRaca}>
                                            <Text style={styles.commomTextView}>Região:</Text>
                                                <ModalSelector
                                                    initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                                    style={{ width: '80%', height: '70%' }}
                                                    data={schoolLocation}
                                                    initValue={this.state.initValueSchoolLocation}
                                                    onChange={(option) => this.setState({ householdSchoolLocation: option.key, initValueSchoolLocation: option.label })}
                                                />
                                        </View>
                                        {this.state.householdSchoolLocation != null ?
                                            <View style={styles.viewChildSexoRaca}>
                                                <Text style={styles.commomTextView}>Unidade:</Text>
                                                    <ModalSelector
                                                        initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                                        style={{ width: '80%', height: '70%' }}
                                                        data={getGroups("SES-DF", this.state.householdEducationLevel, this.state.householdSchoolLocation)}
                                                        initValue={this.state.initValueGroup}
                                                        onChange={async (option) => {
                                                            await this.setState({ householdGroup: option.key, initValueGroup: option.label })
                                                        }}
                                                    />
                                            </View>
                                            : null}
                                    </View>
                                    : this.state.householdGroup != null && this.state.householdCategory == "UNB"?
                                    <View style={styles.viewRow}>
                                        <View style={styles.viewChildSexoRaca}>
                                            <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                                            <TextInput style={styles.formInput50}
                                                returnKeyType='done'
                                                keyboardType='number-pad'
                                                value={this.state.householdIdCode}
                                                onChangeText={async (text) => {
                                                    await this.setState({ householdIdCode: text })
                                                }}
                                            />
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        : null}
                            {this.state.groupCheckbox && !this.state.householdNewInst ?
                                <View style={styles.viewRow}>
                                    <View style={styles.viewChildSexoRaca}>
                                        <Text style={styles.commomTextView}>Instituição:</Text>
                                        <ModalSelector
                                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                            style={{ width: '80%', height: '70%' }}
                                            data={[{key: this.state.householdGroup, label: this.state.householdGroupName}]}
                                            initValue={this.state.householdGroupName}
                                            onChange={(option) => this.setState({ householdGroup: option.key, householdGroupName: option.label })}
                                        />
                                    </View>
                                    {this.state.householdIdCode ?
                                    <View style={styles.viewChildSexoRaca}>
                                        <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                                        <TextInput style={styles.formInput50}
                                            returnKeyType='done'
                                            keyboardType='number-pad'
                                            value={this.state.householdIdCode}
                                            onChangeText={text => this.setState({ householdIdCode: text })}
                                        />
                                    </View>
                                    : null}
                                </View>
                            : null}

                        <View style={styles.buttonView}>
                            <Button
                                title="Salvar"
                                color="#348EAC"
                                onPress={() => {
                                    this.avatarHouseholdSelector()
                                    this.setModalVisible(!this.state.modalVisibleHousehold)
                                }} />
                            <View style={{ margin: 5 }}></View>
                            <Button
                                title="Cancelar"
                                color="#348EAC"
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisibleHousehold)
                                }} />
                            {this.state.groupCheckbox && !this.state.householdNewInst ?
                            <View>
                            <View style={{ margin: 5 }}></View>
                            <Button
                                title="Editar instituição"
                                color="#348EAC"
                                onPress={() => {
                                    this.setState({
                                        householdNewInst: true,
                                        householdIdCode: null
                                    })
                                }}
                            />
                            </View>
                            : null}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Avatar: {
        borderColor: '#ffffff',
        borderWidth: 3
    },
    modalView: {
        paddingTop: 30,
        paddingBottom: 30,
        alignSelf: 'center',
        width: '93%',
        //height: '60%',
        //padding: 15,
        marginTop: '15%',
        marginBottom: '15%',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 15,
    },
    viewCommom: {
        width: '100%',
        height: 65,
        alignItems: 'center',
    },
    viewRow: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
    },
    viewChildSexoRaca: {
        width: "50%",
        height: 65,
        alignItems: 'center',
    },
    viewChildPais: {
        width: "50%",
        height: 65,
        //flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    viewChildData: {
        width: "50%",
        height: 65,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: '5%',
    },
    selectSexoRaca: {
        width: "80%",
    },
    formInput: {
        width: "90%",
        height: 35,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#348EAC',
        paddingBottom: 0,
        paddingTop: 2,
    },
    formInput50: {
        width: "80%",
        height: 35,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#348EAC',
        paddingBottom: 0,
        paddingTop: 2,
    },
    commomText: {
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: "5%",
    },
    commomTextView: {
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: '10%',
    },
    buttonView: {
        width: "60%",
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    textCountry: {
        fontSize: 15,
        fontFamily: 'roboto',
    },
    textBornCountry: {
        width: '80%',
        height: '60%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 17,
        color: 'gray'
    }
})


export default EditarPerfil