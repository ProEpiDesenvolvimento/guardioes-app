import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Picker,
    AsyncStorage,
    NetInfo,
    Alert
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import DatePicker from 'react-native-datepicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { scale } from '../scallingUtils';
import translate from '../../../locales/i18n';
import { API_URL } from '../../constUtils';
import ModalSelector from 'react-native-modal-selector';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;

class Registrar extends Component {
    static navigationOptions = {
        title: translate("home.addProfile")
    }
    constructor(props) {
        super(props);
        this.getInfos();
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
            showProgressBar: false //Custom Progress Bar
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
            showProgressBar: true
        });
    };

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
        });
    }

    getInfos = async () => {
        let userID = await AsyncStorage.getItem('userID');
        let userToken = await AsyncStorage.getItem('userToken');
        this.setState({ userID, userToken });
    }

    render() {
        const { showAlert } = this.state;

        const gender = [
            { key: 'Masculino', label: translate("genderChoices.male") },
            { key: 'Femenino', label: translate("genderChoices.female") },
        ];

        const race = [
            { key: 'Blanco', label: translate("raceChoices.white") },
            { key: 'Indígena', label: translate("raceChoices.indian") },
            { key: 'Mestizo', label: translate("raceChoices.mix") },
            { key: 'Negro, mulato o afrodescendiente', label: translate("raceChoices.black") },
            { key: 'Palenquero', label: translate("raceChoices.palenquero") },
            { key: 'Raizal', label: translate("raceChoices.raizal") },
            { key: 'Rom-Gitano', label: translate("raceChoices.romGitano") }
        ];

        const household = [
            { key: 'Pai', label: "Pai" },
            { key: 'Mãe', label: "Mãe" },
            { key: 'Filhos', label: "Filhos" },
            { key: 'Irmaãos', label: "Irmãos" },
            { key: 'Avós', label: "Avós" },
            { key: 'Outros', label: "Outros" }
        ];

        return (
            <View style={styles.container}>
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
                            style={{ width: '80%', height: '70%' }}
                            data={gender}
                            initValue={translate("genderChoices.male")}
                            onChange={(option) => this.setState({ householdGender: option.key })}
                        />
                    </View>

                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                        <ModalSelector
                            style={{ width: '80%', height: '70%' }}
                            data={race}
                            initValue={translate("raceChoices.white")}
                            onChange={(option) => this.setState({ householdRace: option.key })}
                        />
                    </View>

                </View>

                <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>{translate("register.birth")}</Text>
                        <DatePicker
                            style={{ width: '80%', height: scale(25), backgroundColor: 'rgba(135, 150, 151, 0.55)', borderRadius: 20, marginTop: 5 }}
                            showIcon={false}
                            date={this.state.householdDob}
                            androidMode='spinner'
                            mode="date"
                            placeholder={translate("birthDetails.format")}
                            format="YYYY-MM-DD"
                            minDate="1918-01-01"
                            maxDate={today}
                            confirmBtnText={translate("birthDetails.confirmButton")}
                            cancelBtnText={translate("birthDetails.cancelButton")}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                dateText: {
                                    marginBottom: 10,
                                    fontFamily: 'roboto',
                                    fontSize: 17
                                },
                                placeholderText: {
                                    marginBottom: 15,
                                    fontFamily: 'roboto',
                                    fontSize: 15,
                                    color: 'black'
                                }
                            }}
                            onDateChange={date => this.setState({ householdDob: date })}
                        />
                    </View>

                    <View style={styles.viewChildPais}>
                        <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>{translate("register.country")}</Text></View>
                        <View>
                            <CountryPicker
                                onChange={value => {
                                    this.setState({ cca2: value.cca2, householdCountry: value.name })
                                }}
                                cca2={this.state.cca2}
                                translation="eng"
                            />
                            <Text style={styles.textCountry}>{this.state.householdCountry}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.viewCommom}>
                    <Text style={styles.commomText}>Parentesco:</Text>
                    <ModalSelector
                        style={{ width: '95%', height: '70%' }}
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
        );

    }

    avatarSelector = async () => {
        if (this.state.householdGender == "Masculino") {
            switch (this.state.kinship) {
                case "Pai":
                    await this.setState({ picture: "Father" });
                    break;
                case "Mãe":
                    await this.setState({ picture: "Mother" });
                    break;
                case "conjuge":
                    await this.setState({ picture: "Father" });
                    break;
                case "Avós":
                    await this.setState({ picture: "Grandfather" });
                    break;
                case "Filhos":
                    await this.setState({ picture: "Son" });
                    break;
                case "Irmãos":
                    await this.setState({ picture: "Brother" });
                    break;
            }
        } else {
            switch (this.state.kinship) {
                case "Mãe":
                    await this.setState({ picture: "Mother" });
                    break;
                case "Pai":
                    await this.setState({ picture: "Father" });
                    break;
                case "conjuge":
                    await this.setState({ picture: "Mother" });
                    break;
                case "Avós":
                    await this.setState({ picture: "Grandmother" });
                    break;
                case "Filhos":
                    await this.setState({ picture: "Daughter" });
                    break;
                case "Irmãos":
                    await this.setState({ picture: "Sister" });
                    break;
            }
        }

        this.create();
    }

    create = () => {
        console.warn(this.state.picture)
        this.showAlert();
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
                }
            )
        })
            .then((response) => {
                this.setState({ statusCode: response.status })
                if (this.state.statusCode == 201) {
                    console.warn("CRIADO");
                    this.hideAlert();
                    this.props.navigation.navigate('Home');
                } else {
                    this.hideAlert();
                    console.warn("Algo deu errado");
                }
            })
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 550
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
    }
});

//make this component available to the app
export default Registrar;
