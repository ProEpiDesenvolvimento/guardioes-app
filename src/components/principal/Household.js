import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    NetInfo,
    Alert,
    Modal,
    TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import RNSecureStorage from 'rn-secure-storage'
import DatePicker from 'react-native-datepicker'
import AwesomeAlert from 'react-native-awesome-alerts'
import { scale } from '../../utils/scallingUtils'
import translate from '../../../locales/i18n'
import { API_URL } from 'react-native-dotenv'
import ModalSelector from 'react-native-modal-selector'
import { gender, country, race, household } from '../../utils/selectorUtils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import InstitutionSelector from '../userData/InstitutionSelector'
import LoadingModal from '../modals/LoadingModal'
import { CheckBox } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

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
            kinship: null,
            householdName: null,
            householdGender: null,
            householdCountry: null,
            householdRace: null,
            householdDob: null,
            userID: null,
            cca2: 'BR',
            showAlert: false, //Custom Alerts
            showProgressBar: false, //Custom Progress Bar
            groupCheckbox: false,
            userIdCode: null,
            userGroup: null,
            loadingAlert: false,
            riskGroup: false,
            modalVisibleRiskGroup: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisibleRiskGroup: visible })
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

    setLoadingAlert = (alert) => {
        this.setState({
            loadingAlert: alert
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

    setUserInstitutionCallback = (userIdCode, userGroup) => {
        this.setState({
            userIdCode: userIdCode,
            userGroup: userGroup,
        })
    }

    setInstituitionComponentError = (error) => {
        this.state.instituitionComponentError = error
    }

    render() {
        const { showAlert } = this.state

        return (
            <View style={styles.scroll}>
                <Modal //Modal View for Risk Group Message
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisibleRiskGroup}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisibleRiskGroup)
                    }}>
                    <View style={styles.modalComponent}>
                        <View style={styles.modalView}>
                            <View style={styles.modalViewCommom}>
                                <Text style={styles.modalTitle}>
                                    {translate("register.riskGroupTitle")}
                                </Text>
                                <Text style={styles.modalText}>
                                    {translate("register.riskGroupMessage")}
                                </Text>
                            </View>

                            <View style={styles.modalButton}>
                                <Button
                                    title={translate("register.riskGroupButton")}
                                    color="#348EAC"
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisibleRiskGroup)
                                    }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
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
                                initValueTextStyle={{ color: 'black' }}
                                style={{ width: '80%', height: '70%' }}
                                data={gender}
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ householdGender: option.key })}
                            />
                        </View>

                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                            <ModalSelector
                                initValueTextStyle={{ color: 'black' }}
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
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ householdCountry: option.key })}
                            />
                        </View>
                    </View>
                    <View style={styles.riskGroupView}>
                        <CheckBox
                            title={"Faz parte do Grupo de Risco?"}
                            checked={this.state.riskGroup}
                            containerStyle={styles.riskGroupCheckBoxStyle}
                            size={scale(16)}
                            onPress={() => {
                                this.setState({ riskGroup: !this.state.riskGroup })
                            }}
                        />
                        <TouchableOpacity style={{ marginRight: 15 }} onPress={async () => {
                            this.setModalVisible(true);
                        }}>
                            <FontAwesome name="question-circle-o" size={scale(25)} color="rgba(22, 107, 135, 1)" />
                        </TouchableOpacity>
                    </View>

                    <InstitutionSelector
                        setUserInstitutionCallback={this.setUserInstitutionCallback}
                        setAlert={this.setLoadingAlert}
                        setErrorCallback={this.setInstituitionComponentError}/>

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>Parentesco:</Text>
                        <ModalSelector
                            initValueTextStyle={{ color: 'black' }}
                            style={{ width: '90%', height: '70%' }}
                            data={household}
                            initValue={'Selecionar'}
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
                </KeyboardAwareScrollView>
                <LoadingModal show={this.state.loadingAlert} />
            </View>
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

    isHouseholdDataValid = () => {
        let error = false
        if (this.state.householdName == null || this.state.householdName == '' || this.state.householdDob == null) {
            Alert.alert("O nome e data de nascimento devem estar preenchidos\n")
            error = true
        } else if (this.state.householdGender == null || this.state.householdRace == null) {
            Alert.alert("A raça e genero devem estar preenchidos")
            error = true
        } else if (this.state.kinship == null) {
            Alert.alert("O parentesco deve estar preenchido")
            error = true
        } else if (this.state.instituitionComponentError != null &&
            this.state.instituitionComponentError != undefined &&
            this.state.instituitionComponentError.length > 0) {
            Alert.alert(this.state.instituitionComponentError)
            error = true
        } else if (this.state.householdCountry == null) {
            Alert.alert("Nacionalidade não pode ficar em Branco", "Precisamos da sua Nacionalidade para lhe mostar as informações referentes ao seu país")
            error = true
        }
        return !error
    }

    create = () => {
        if (!this.isHouseholdDataValid()) {
            return
        }
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
                    risk_group: this.state.riskGroup,
                    kinship: this.state.kinship,
                    picture: this.state.picture,
                    identification_code: this.state.userIdCode,
                    group_id: this.state.userGroup
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
    modalComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    modalView: {
        height: "35%",
        alignSelf: "center",
        justifyContent: "center",
        width: "93%",
        marginTop: "15%",
        marginBottom: "15%",
        borderRadius: 20,
        backgroundColor: "white",
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 15,
    },
    modalViewCommom: {
        marginTop: "30%",
        marginBottom: "5%",
    },
    modalTitle: {
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'justify',
        paddingLeft: "5%",
        paddingRight: "5%",
        fontWeight: "bold",
        paddingBottom: 5
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'justify',
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    modalButton: {
        width: "50%",
        alignSelf: 'center',
    },
    riskGroupCheckBoxStyle: {
        width: '80%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.11)',
        backgroundColor: 'transparent',
        alignSelf: "center",
    },
    riskGroupView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default Registrar
