import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native'
import { scale } from '../../utils/scallingUtils'
import { CheckBox } from 'react-native-elements'
import ModalSelector from 'react-native-modal-selector'
import { API_URL } from 'react-native-dotenv';
//  import Autocomplete from 'react-native-autocomplete-input'

class InstitutionSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupCheckbox: false,
            groupList: [],
            selectionIndexes: [],
            rootGroup: null,
            idenficationCodeInputBox: false,
            userGroup: null,
            userIdCode: null,
            selectedGroup: null,
        }
        this.getRootGroup()
    }
    
    updateParent() {
        let isThereSelectedGroup = this.state.selectedGroup != null
        let doesTheSelectedGroupRequireID = this.state.selectedGroup.require_id
        let ifItDoesIsItGiven = doesTheSelectedGroupRequireID ? (this.userIdCode != '' && this.state.userIdCode != null) : true
        if (isThereSelectedGroup, ifItDoesIsItGiven) {
            console.log("UPDATE PARENT WITH GROUP:", this.state.userGroup, "AND ID CODE:", this.state.userIdCode)
            this.props.setUserInstitutionCallback(this.state.userIdCode, this.state.userGroup)
        }
    }

    getRootGroup() {   
        this.props.setAlert(true) // Set loading popup
        fetch(`${API_URL}/groups/root`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    this.props.setAlert(false)
                    return response.json()
                }
            })
            .then((responseJson) => {
                this.setState({ rootGroup: responseJson.group })
                this.getChildren(responseJson.group.id)
                this.props.setAlert(false)
            })
    }

    getChildren(id) {       
        console.log("GET CHILDREN", id)
        this.props.setAlert(true)
        fetch(`${API_URL}/groups/${id}/get_children`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then((responseJson) => {
                if (responseJson.is_child) {
                    this.state.userGroup = id
                    this.props.setAlert(false)
                    this.getGroup(id)
                    return
                }
                this.state.selectionIndexes.push({ label: "Selecionar", key: -1 })
                console.log("PUSHING TO GROUP LIST", responseJson)
                this.state.groupList.push(responseJson)
                console.log("PUSHED TO GROUP LIST")
                this.props.setAlert(false)
            })
    }

    getGroup(id) {
        console.log("GET GROUP", id)
        this.props.setAlert(true)
        fetch(`${API_URL}/groups/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then((responseJson) => {
                this.state.selectedGroup = responseJson.group
                console.log(responseJson)
                if (responseJson.group.require_id) {
                    console.log("SET ID CODE TRUE")
                    this.state.idenficationCodeInputBox = true
                } else {
                    this.updateParent()
                }
                this.props.setAlert(false)
            })
    }
    
    capitalizeFirstWords(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    groupControl() {
        return this.state.groupList.map((x, i) => this.groupComponent(x, i))
    }

    groupComponent(group, index) {
        return (
            <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{this.capitalizeFirstWords(group.label)}:</Text>
                <ModalSelector
                    initValueTextStyle={{ color: 'black', fontSize: 10 }}
                    style={{ width: '80%', height: '70%' }}
                    data={
                        group.children.map((x) => {
                            return {
                                key: x.id,
                                label: x.description
                            }
                        })
                    }
                    initValue={this.state.selectionIndexes[index].label}
                    onChange={(option) => {
                        this.state.groupList = this.state.groupList.slice(0, index + 1),
                        this.state.selectionIndexes = this.state.selectionIndexes.slice(0, index + 1),
                        this.state.showIdentificationCodeInput = false
                        this.getChildren(option.key)
                        this.state.selectionIndexes[index] = option
                    }}
                />
            </View>
        )
    }

    showIdentificationCodeInput() {
        console.log("SHOW IDENTIFICATION CODE", this.state.idenficationCodeInputBox)
        if (this.state.idenficationCodeInputBox) {
            return (<View style={styles.viewRow}>
                <View style={styles.viewChildSexoRaca}>
                    <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                    <TextInput style={styles.formInput50}
                        returnKeyType='done'
                        keyboardType='number-pad'
                        onChangeText={(text) => {
                            console.log("CHANGE TEXT", text)
                            this.state.userIdCode = text
                            this.updateParent()
                        }}
                    />
                </View>
            </View>)
        }
        return null
    }

    render() {
        return (
            <View style={{ marginBottom: 10 }}>
                <CheckBox
                    title={"É integrante de alguma instituição de Ensino?"}
                    containerStyle={styles.CheckBoxStyle}
                    size={scale(16)}
                    checked={this.state.groupCheckbox}
                    onPress={() => {
                        this.setState({ groupCheckbox: !this.state.groupCheckbox })
                    }}
                />
                {this.state.groupCheckbox ?
                    <View>
                        {this.groupControl()}
                        {this.showIdentificationCodeInput()}

                        {/* // THIS IS A SEARCH BOX WHERE THE USER MAY TYPE HIS GROUP NAME
                            // It's not implemented as of yet in the API

                            <View style={ of yet.viewRow}>
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
