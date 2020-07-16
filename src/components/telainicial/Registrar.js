import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Keyboard,
    Alert,
    Modal,
    TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import DatePicker from 'react-native-datepicker'
import { scale } from '../../utils/scallingUtils'
import translate from '../../../locales/i18n'
import { API_URL } from 'react-native-dotenv'
import { CheckBox } from 'react-native-elements'
import ModalSelector from 'react-native-modal-selector'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { gender, country, race } from '../../utils/selectorUtils'
import { state, getCity } from '../../utils/brasil'
import InstitutionSelector from '../userData/InstitutionSelector'
import LoadingModal from '../modals/LoadingModal'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

// let today = y + "-" + m + "-" + d
let minDate = d + "-" + m + "-" + (y - 13)
// let tomorrow = y + "-" + m + "-" + (d + 1)

class Registrar extends Component {
    static navigationOptions = {
        title: translate("register.title")
    }
    constructor(props) {
        super(props)
        this.state = {
            school_units: [],
            query: '',
            isProfessional: false,
            residence: null,
            residenceCountryCheckbox: true,
            groupCheckbox: false,
            statusCode: null,
            userName: null,
            userEmail: null,
            userPwd: null,
            userGender: null,
            userCountry: null,
            userState: null,
            userCity: null,
            userRace: null,
            userDob: null,
            userGroup: null,
            userIdCode: null,
            riskGroup: null,
            showAlert: false, //Custom Alerts
            showProgressBar: false, //Custom Progress Bar
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

    setAlert = (alert) => {
        this.setState({
            showAlert: alert
        })
    }

    componentDidMount() {
        //this.setState({ school_units: ShcoolsSheet.school_units }) //Usado para o autocomplete
    }

    findFilm(query) {
        if (query === '') {
            return []
        }

        const { school_units } = this.state
        const regex = new RegExp(`${query.trim()}`, 'i')
        return school_units.filter(school => school.description.search(regex) >= 0)
    }

    setUserInstitutionCallback = (userIdCode, userGroup) => {
        this.setState({
            userIdCode: userIdCode,
            userGroup: userGroup,
        })
    }

    render() {
        const { showAlert } = this.state
        const { query } = this.state
        const school_units = this.findFilm(query)
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()

        return (
            <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={true}>
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
                <View style={styles.scroll}>
                    <View style={{ paddingTop: 10 }}></View>
                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>{translate("register.name")}</Text>
                        <TextInput style={styles.formInput}
                            returnKeyType='next'
                            onChangeText={text => this.setState({ userName: text })}
                        />
                    </View>

                    <View style={styles.viewRow}>
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                            <ModalSelector
                                initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                style={{ width: '80%', height: '70%', fontSize: 10 }}
                                data={gender}
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ userGender: option.key })}
                            />
                        </View>

                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                            <ModalSelector
                                initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                style={{ width: '80%', height: '70%', fontSize: 10 }}
                                data={race}
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ userRace: option.key })}
                            />
                        </View>

                    </View>

                    <View style={styles.viewRow}>
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.birth")}</Text>
                            <DatePicker
                                style={{ width: '80%', height: scale(26), borderRadius: 5, borderWidth: 1, borderColor: 'rgba(0,0,0,0.11)' }}
                                showIcon={false}
                                date={this.state.userDob}
                                androidMode='spinner'
                                locale={'pt-BR'}
                                mode="date"
                                placeholder={translate("birthDetails.format")}
                                format="DD-MM-YYYY"
                                minDate="01-01-1918"
                                maxDate={minDate}
                                confirmBtnText={translate("birthDetails.confirmButton")}
                                cancelBtnText={translate("birthDetails.cancelButton")}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        justifyContent: "center",
                                        fontFamily: 'roboto',
                                        marginBottom: 9,
                                        fontSize: 10,
                                        color: 'black'
                                    },
                                    placeholderText: {
                                        marginBottom: 9,
                                        fontSize: 10,
                                        justifyContent: "center",
                                        fontFamily: 'roboto',
                                        color: '#555'
                                    }
                                }}
                                onDateChange={date => this.setState({ userDob: date })}
                            />
                        </View>

                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>{translate("register.country")}</Text>

                            <ModalSelector
                                initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                style={{ width: '80%', height: '70%', fontSize: 10 }}
                                data={country}
                                initValue={"Selecionar"}
                                onChange={(option) => this.setState({ userCountry: option.key })}
                            />

                        </View>
                    </View>

                    {this.state.userCountry == "Brazil" ?
                        <View style={styles.viewRow}>
                            <View style={styles.viewChildSexoRaca}>
                                <Text style={styles.commomTextView}>Estado:</Text>
                                <ModalSelector
                                    initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                    style={{ width: '80%', height: '70%', fontSize: 10 }}
                                    data={state}
                                    initValue={"Selecionar"}
                                    onChange={(option) => this.setState({ userState: option.key })}
                                />
                            </View>

                            <View style={styles.viewChildSexoRaca}>
                                <Text style={styles.commomTextView}>Município:</Text>
                                <ModalSelector
                                    initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                    style={{ width: '80%', height: '70%', fontSize: 10 }}
                                    data={getCity(this.state.userState)}
                                    initValue={this.state.initValueCity}
                                    onModalClose={(option) => this.setState({ userCity: option.key, initValueCity: option.key })}
                                />
                            </View>
                        </View>
                        : null}
                    {this.state.userCountry != null ?
                        <CheckBox
                            title={this.state.userCountry + translate("register.originCountry")}
                            containerStyle={styles.CheckBoxStyle}
                            size={scale(16)}
                            checked={this.state.residenceCountryCheckbox}
                            onPress={() => {
                                this.setState({ residence: '' })
                                this.setState({ residenceCountryCheckbox: !this.state.residenceCountryCheckbox })
                            }}
                        /> : null}
                    <View>
                        {!this.state.residenceCountryCheckbox ?
                            <View style={styles.viewRowCenter}>
                                <ModalSelector
                                    initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                    style={{ width: '80%', height: '70%', alignSelf: 'center' }}
                                    data={country}
                                    initValue={"Selecionar"}
                                    onChange={(option) => this.setState({ residence: option.key })}
                                />

                            </View>
                            : null
                        }

                        <CheckBox
                            title={"Voce é um profissional da Saude"}
                            checked={this.state.isProfessional}
                            containerStyle={styles.CheckBoxStyle}
                            size={scale(16)}
                            onPress={() => {
                                this.setState({ isProfessional: !this.state.isProfessional })
                            }}
                        />
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
                            <TouchableOpacity style={{marginRight: 15}} onPress={async () => {
                                this.setModalVisible(true);
                            }}>
                                <FontAwesome name="question-circle-o" size={scale(25)} color="rgba(22, 107, 135, 1)" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <InstitutionSelector
                        setUserInstitutionCallback={this.setUserInstitutionCallback}
                        setAlert={this.setAlert} />

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>{translate("register.email")}</Text>
                        <TextInput
                            autoCapitalize='none'
                            style={styles.formInput}
                            keyboardType='email-address'
                            multiline={false}
                            maxLength={100}
                            returnKeyType='next'
                            onChangeText={email => this.setState({ userEmail: email })}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        />
                    </View>

                    <View style={styles.viewCommom}>
                        <Text style={styles.commomText}>{translate("register.password")}</Text>
                        <TextInput style={styles.formInput}
                            autoCapitalize='none'
                            multiline={false}
                            maxLength={100}
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ userPwd: text })}
                            ref={(input) => this.passwordInput = input}
                            onSubmitEditing={() => this.verifyInfos()}
                        />
                        <Text style={{
                            fontSize: 13,
                            fontFamily: 'roboto',
                            color: '#465F6C',
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            paddingLeft: "5%",
                        }}>{translate("register.passwordCondition")}</Text>
                    </View>


                    <View style={styles.buttonView}>
                        <Button
                            title={translate("register.signupButton")}
                            color="#348EAC"
                            onPress={() => this.verifyInfos()}
                        />
                    </View>
                </View>
                <LoadingModal show={showAlert} />
            </KeyboardAwareScrollView>
        )

    }

    avatarSelector = async () => {
        if (this.state.userGender == "Masculino") {
            await this.setState({ picture: "Father" })
        } else if (this.state.userGender == "Feminino") {
            await this.setState({ picture: "Mother" })
        } else if (this.state.userGender == null) {
            await this.setState({ picture: "NullAvatar" })
        }
        this.create()
    }

    verifyInfos = async () => {
        if (this.state.userName == null || this.state.userPwd == null || this.state.userEmail == null) {
            Alert.alert("Campos não podem ficar em branco", "Nome\nEmail\nSenha\n\nPrecisamos dessas informações para completar seu cadastro.")
        } else {
            if (this.state.userCountry == "Brazil" && (this.state.userState == null || this.state.userCity == null)) {
                Alert.alert("Estado e Cidade devem estar preenchidos")
            } else {
                if (this.state.userPwd.length < 8) {
                    Alert.alert("A senha precisa ter no mínimo 8 caracteres")
                } else {
                    if (this.state.groupCheckbox == true && this.state.userGroup == null) {
                        Alert.alert("Instituição deve estar preenchida")
                    } else {
                        if (this.state.userCountry == null) {
                            Alert.alert("Nacionalidade não pode ficar em Branco", "Precisamos da sua Nacionalidade para lhe mostar as informações referentes ao seu país")
                        } else {
                            if (this.state.userCategory == "UNB" && this.state.userIdCode == null) {
                                Alert.alert("Número de Identificação deve estar preenchido")
                            } else {
                                this.avatarSelector()
                            }
                        }
                    }
                }
            }
        }
    }

    create = () => {
        Keyboard.dismiss()
        this.showAlert()
        fetch(API_URL + '/user/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user":
                {
                    residence: this.state.residence,
                    user_name: this.state.userName,
                    email: this.state.userEmail,
                    password: this.state.userPwd,
                    gender: this.state.userGender,
                    country: this.state.userCountry,
                    state: this.state.userState,
                    city: this.state.userCity,
                    race: this.state.userRace,
                    birthdate: this.state.userDob,
                    picture: this.state.picture,
                    identification_code: this.state.userIdCode,
                    school_unit_id: this.state.userGroup,
                    is_professional: this.state.isProfessional,
                    risk_group: this.state.riskGroup
                }
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.loginAfterCreate()
                } else {
                    this.hideAlert()
                    return response.json()
                }
            }).then((responseJson) => {
                Alert.alert("O email " + responseJson.errors[0].detail.email)
            })
    }

    //Login Function 
    loginAfterCreate = () => {
        return fetch(API_URL + '/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:
                {
                    email: this.state.userEmail,
                    password: this.state.userPwd
                }
            })
        })
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ userToken: response.headers.map.authorization })
                    return response.json()
                } else {
                    alert("Algo deu errado")
                    this.hideAlert()
                }
            })
            .then((responseJson) => {
                AsyncStorage.setItem('userID', responseJson.user.id.toString())
                AsyncStorage.setItem('userName', responseJson.user.user_name)
                AsyncStorage.setItem('userAvatar', responseJson.user.picture)
                AsyncStorage.setItem('isProfessional', responseJson.user.is_professional.toString())

                RNSecureStorage.set('userToken', this.state.userToken, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                RNSecureStorage.set('userEmail', this.state.userEmail, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                RNSecureStorage.set('userPwd', this.state.userPwd, { accessible: ACCESSIBLE.WHEN_UNLOCKED })

                this.props.navigation.navigate('Home')
                this.hideAlert()
            })
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        //borderColor: 'red',
        //borderWidth: 3,
    },
    scroll: {
        flex: 1,
        //borderColor: 'green',
        //borderWidth: 3,
        width: '100%',
        justifyContent: 'space-between'
    },
    viewCommom: {
        width: '100%',
        height: 65,
        alignItems: 'center',
    },
    viewRow: {
        zIndex: 1,
        width: '100%',
        height: 65,
        flexDirection: 'row',
    },
    viewRowCenter: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
        justifyContent: "center"
    },
    viewChildSexoRaca: {
        width: "50%",
        height: 65,
        alignItems: 'center',
    },
    viewChildPais: {
        width: "50%",
        height: 65,
        justifyContent: 'center',
        // alignItems: 'center'
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
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
    CheckBoxStyle: {
        width: '90%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.11)',
        backgroundColor: 'transparent',
        //height: scale(32),
        alignSelf: "center"
    },
    AutocompleteStyle: {
        width: '80%',
        height: 35,
        fontSize: 14
    },
    AutocompleteContainer: {
        width: "80%",
        height: 35
    },
    AutocompleteList: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#348EAC'
    },
    AutoCompleteListStyles: {
        borderRadius: 5,
        backgroundColor: "rgba(218,218,218,0.90)",
        maxHeight: 150
    },
    AutocompleteTouchableOpacity: {
        position: "relative",
        zIndex: 2,
        width: '90%',
        alignSelf: "center",
        borderColor: 'rgba(198,198,198,1)',
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 15,
        marginVertical: 5,
        fontFamily: 'roboto',
        color: 'rgba(33,113,245,1)'
    },
    modalComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
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
        fontSize: 17,
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

//make this component available to the app
export default Registrar
