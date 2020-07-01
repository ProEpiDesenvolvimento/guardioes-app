import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Picker,
    NetInfo,
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import RNSecureStorage from 'rn-secure-storage'
import DatePicker from 'react-native-datepicker'
import AwesomeAlert from 'react-native-awesome-alerts'
import { scale } from '../../utils/scallingUtils'
import translate from '../../../locales/i18n'
import {API_URL} from 'react-native-dotenv'
import ModalSelector from 'react-native-modal-selector'
import { gender, country, race, household, getGroups } from '../../utils/selectorUtils'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

let today = d + "-" + m + "-" + y

class Registrar extends Component {
    static navigationOptions = {
        title: translate("home.addProfile")
    }
    constructor(props) {
        super(props)
        this.getInfo()
        this.state = {
            statusCode: null,
            kinship: 'Pai',
            householdName: null,
            householdGender: 'Masculino',
            householdCountry: 'Brazil',
            householdRace: 'Blanco',
            householdDob: null,
            userID: null,
            cca2: 'BR',
            showAlert: false, //Custom Alerts
            showProgressBar: false, //Custom Progress Bar
            groupCheckbox: false,
            userGroup: null,
            groupValue: 'Selecionar',
            userIdCode: null,
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
            showProgressBar: true
        })
    }

    hideAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    _isconnected = () => {
        let validation = false
        this.state.householdName && this.state.householdDob ? validation = true : validation = false
        NetInfo.isConnected.fetch().then(isConnected => {
            isConnected ? validation ? this.avatarSelector() : Alert.alert(translate("register.errorMessages.error"), translate("register.errorMessages.allFieldsAreFilled")) : Alert.alert(
                translate("register.noInternet.noInternet"),
                translate("register.noInternet.ohNo"),
                [
                    { text: translate("register.alertAllRightMessage"), onPress: () => null }
                ]
            )
        })
    }

    getInfo = async () => {
        const userID = await AsyncStorage.getItem('userID')
        const userToken = await RNSecureStorage.get('userToken')
        this.setState({ userID, userToken })
    }

    render() {
        const { showAlert } = this.state

        return (
            <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                <View style={styles.scroll}>
                    <View style={{ paddingTop: 10 }}></View>
                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>{translate("register.name")}</Text>
                        <TextInput style={styles.formInput}
                            onChangeText={text => this.setState({ householdName: text })}
                        />
                    </View>

                    <View style={styles.viewRow}>
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                            <ModalSelector
                                initValueTextStyle = {{color: 'black'}}
                                style={{ width: '80%', height: '70%' }}
                                data={gender}
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ householdGender: option.key })}
                            />
                        </View>

                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                            <ModalSelector
                                initValueTextStyle = {{color: 'black'}}
                                style={{ width: '80%', height: '70%' }}
                                data={race}
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ householdRace: option.key })}
                            />
                        </View>

                    </View>

                    <View style={styles.viewRow}>
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.birth")}</Text>
                            <DatePicker
                                style={{ width: '80%', height: scale(32), borderRadius: 5, borderWidth: 1, borderColor: 'rgba(0,0,0,0.11)'}}
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
                                        initValueTextStyle = {{color: 'black'}}
                                        style={{width: '80%', height: '70%'}}
                                        data={country}
                                        initValue={"Seleceionar"}
                                        onChange={(option) => this.setState({ householdCountry: option.key })}
                                    />
                                
                        </View>
                    </View>

                    <View>
                        <CheckBox
                                title={"É integrante de alguma instituição de Ensino?"}
                                containerStyle={styles.CheckBoxStyle}
                                size={scale(16)}
                                checked={this.state.groupCheckbox}
                                onPress={() => { this.setState({ groupCheckbox: !this.state.groupCheckbox}) }}
                            />
                            {this.state.groupCheckbox ?
                                <View style={styles.viewRow}>
                                    <View style={styles.viewChildSexoRaca}>
                                        <Text style={styles.commomTextView}>Instituição:</Text>
                                        <ModalSelector
                                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                            style={{ width: '80%', height: '70%' }}
                                            data={getGroups()}
                                            initValue={this.state.groupValue}
                                            onChange={(option) => this.setState({ userGroup: option.key, groupValue: option.label })}
                                        />
                                    </View>
                                    <View style={styles.viewChildSexoRaca}>
                                        <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                                        <TextInput style={styles.formInput50}
                                            returnKeyType='done'
                                            keyboardType='number-pad'
                                            onChangeText={text => this.setState({ userIdCode: text })}
                                        />
                                    </View>
                                </View>
                                : null}
                    </View>

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Parentesco:</Text>
                        <ModalSelector
                            initValueTextStyle = {{color: 'black'}}
                            style={{ width: '90%', height: '70%' }}
                            data={household}
                            initValue={this.state.kinship}
                            onChange={(option) => this.setState({ kinship: option.key })}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <Button
                            title="criar"
                            color="#348EAC"
                            //onPress={this._isconnected}
                            onPress={() => this.avatarSelector()} />
                    </View>


                    <AwesomeAlert
                        show={showAlert}
                        showProgress={this.state.showProgressBar ? true : false}
                        title={this.state.showProgressBar ? translate("register.awesomeAlert.registeringMessage") : null}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={this.state.showProgressBar ? false : true}
                    />
                </View>
            </KeyboardAwareScrollView>
        )

    }

    avatarSelector = async () => {
        if (this.state.householdGender == "Masculino") {
            switch (this.state.kinship) {
                case "Pai":
                    await this.setState({ picture: "Father" })
                    break
                case "Mãe":
                    await this.setState({ picture: "Mother" })
                    break
                case "conjuge":
                    await this.setState({ picture: "Father" })
                    break
                case "Avós":
                    await this.setState({ picture: "Grandfather" })
                    break
                case "Filhos":
                    await this.setState({ picture: "Son" })
                    break
                case "Irmãos":
                    await this.setState({ picture: "Brother" })
                    break
            }
        } else {
            switch (this.state.kinship) {
                case "Mãe":
                    await this.setState({ picture: "Mother" })
                    break
                case "Pai":
                    await this.setState({ picture: "Father" })
                    break
                case "conjuge":
                    await this.setState({ picture: "Mother" })
                    break
                case "Avós":
                    await this.setState({ picture: "Grandmother" })
                    break
                case "Filhos":
                    await this.setState({ picture: "Daughter" })
                    break
                case "Irmãos":
                    await this.setState({ picture: "Sister" })
                    break
            }
        }

        this.create()
    }

    create = () => {
        this.showAlert()
        fetch(`${API_URL}/users/${this.state.userID}/households`, {
            method: 'POST',
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
                    school_unit_id: this.state.userGroup,
                    identification_code: this.state.userIdCode,
                }
            )
        })
            .then((response) => {
                this.setState({ statusCode: response.status })
                if (this.state.statusCode == 201) {
                    console.warn("Criado")
                    this.hideAlert()
                    this.props.navigation.navigate('Home')
                } else {
                    console.warn("Algo deu errado, response:", response)
                    this.hideAlert()
                }
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between'
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
    CheckBoxStyle: {
        width: '90%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.11)',
        backgroundColor: 'transparent',
        alignSelf: "center"
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
})

export default Registrar
