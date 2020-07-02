import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
} from 'react-native'
import { scale } from '../../utils/scallingUtils'
import { CheckBox } from 'react-native-elements'
import ModalSelector from 'react-native-modal-selector'
import { schoolCategory, schoolLocation, educationLevel } from '../../utils/selectorUtils'
import Autocomplete from 'react-native-autocomplete-input'
import AwesomeAlert from 'react-native-awesome-alerts';
import { API_URL } from 'react-native-dotenv';

class InstitutionSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupCheckbox: false,
            initValueCity: "Selecionar",
            initValueGroup: "Selecionar",
            initValueCategory: "Selecionar",
            initValueSchoolLocation: "Selecionar",
            initValueEducationLevel: "Selecionar",
            ValueCity: null,
            ValueGroup: null,
            ValueCategory: null,
            ValueSchoolLocation: null,
            ValueEducationLevel: null,
        }
    }

    updateParent() {
        this.props.setUserInstitutionCallback(this.state.userIdCode, this.state.userGroup)
    }

    loadingSchools(Category, Level, City) {
        const groups = []
        this.showAlert()
        fetch(`${API_URL}/school_units_list/`, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "filter":
                {
                    category: Category,
                    level: Level,
                    city: City,
                }
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.hideAlert();
                    return response.json()
                }
            })
            .then((responseJson) => {
                //console.warn(responseJson)
                
                responseJson.school_units.map(group => {
                    groups.push({ key: group.id, label: group.description })
                })
                this.setState({ groups })
                this.hideAlert();
            })
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
    };


    render() {
        const { showAlert } = this.state;
        return (
            <View style={{ marginBottom: 10 }}>
                <CheckBox
                    title={"É integrante de alguma instituição de Ensino?"}
                    containerStyle={styles.CheckBoxStyle}
                    size={scale(16)}
                    checked={this.state.groupCheckbox}
                    onPress={() => this.setState({ groupCheckbox: !this.state.groupCheckbox })}
                />
                {this.state.groupCheckbox ?
                    <View>
                        <View style={styles.viewRow}>
                            <View style={styles.viewChildSexoRaca}>
                                <Text style={styles.commomTextView}>Categoria:</Text>
                                <ModalSelector
                                    initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                    style={{ width: '80%', height: '70%' }}
                                    data={schoolCategory}
                                    initValue={this.state.initValueCategory}
                                    onChange={(option) => { if (option.key == "UNB") { this.loadingSchools(option.key) } this.setState({ userCategory: option.key, initValueCategory: option.label, userEducationLevel: null }) }}
                                />
                            </View>
                            {this.state.userCategory == "UNB" ?
                                <View style={styles.viewChildSexoRaca}>
                                    <Text style={styles.commomTextView}>Faculdade:</Text>
                                    <ModalSelector
                                        initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                        style={{ width: '80%', height: '70%' }}
                                        data={this.state.groups}
                                        initValue={this.state.initValueGroup}
                                        onChange={async (option) => {
                                            await this.setState({ userGroup: option.key, initValueGroup: option.label })
                                            this.updateParent()
                                        }}
                                    />
                                </View>
                                : this.state.userCategory == "SES-DF" ?
                                    <View style={styles.viewChildSexoRaca}>
                                        <Text style={styles.commomTextView}>Nivel de Ensino:</Text>
                                        <ModalSelector
                                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                            style={{ width: '80%', height: '70%' }}
                                            data={educationLevel}
                                            initValue={this.state.initValueEducationLevel}
                                            onChange={(option) => this.setState({ userEducationLevel: option.key, initValueEducationLevel: option.label })}
                                        />
                                    </View>
                                    : null}
                        </View>
                        {this.state.userEducationLevel != null ?
                            <View style={styles.viewRow}>
                                <View style={styles.viewChildSexoRaca}>
                                    <Text style={styles.commomTextView}>Região:</Text>
                                    <ModalSelector
                                        initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                        style={{ width: '80%', height: '70%' }}
                                        data={schoolLocation}
                                        initValue={this.state.initValueSchoolLocation}
                                        onChange={(option) => { this.loadingSchools(this.state.userCategory, this.state.userEducationLevel, option.key), this.setState({ userSchoolLocation: option.key, initValueSchoolLocation: option.label }) }}
                                    />
                                </View>
                                {this.state.userSchoolLocation != null ?
                                    <View style={styles.viewChildSexoRaca}>
                                        <Text style={styles.commomTextView}>Unidade:</Text>
                                        <ModalSelector
                                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                            style={{ width: '80%', height: '70%' }}
                                            data={this.state.groups}
                                            initValue={this.state.initValueGroup}
                                            onChange={async (option) => {
                                                await this.setState({ userGroup: option.key, initValueGroup: option.label })
                                                this.updateParent()
                                            }}
                                        />
                                    </View>
                                    : null}
                            </View>
                            : this.state.userGroup != null && this.state.userCategory == "UNB" ?
                                <View style={styles.viewRow}>
                                    <View style={styles.viewChildSexoRaca}>
                                        <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                                        <TextInput style={styles.formInput50}
                                            returnKeyType='done'
                                            keyboardType='number-pad'
                                            onChangeText={async (text) => {
                                                await this.setState({ userIdCode: text })
                                                this.updateParent()
                                            }}
                                        />
                                    </View>
                                </View>
                                : null}

                        {/*<View style={styles.viewRow}>
                            <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Instituição:</Text>
                            <ModalSelector
                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                            style={{ width: '80%', height: '70%' }}
                            data={getGroups()}
                            initValue={this.state.initValueGroup}
                            onChange={(option) => this.setState({ userGroup: option.key, initValueGroup: option.label })}
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
                        </View>*/}
                    </View>
                    : null}
                <AwesomeAlert
                    show={showAlert}
                    showProgress={this.state.showProgressBar ? true : false}
                    title={this.state.showProgressBar ? "Carregando" : null}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={this.state.showProgressBar ? false : true}
                />
            </View>
        )

    }
}


// define your styles
const styles = StyleSheet.create({
    viewRow: {
        zIndex: 1,
        width: '100%',
        height: 65,
        flexDirection: 'row',
    },
    viewChildSexoRaca: {
        width: "50%",
        height: 65,
        alignItems: 'center',
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
})

//make this component available to the app
export default InstitutionSelector
