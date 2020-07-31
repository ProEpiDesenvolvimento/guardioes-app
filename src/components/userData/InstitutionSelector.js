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

class InstitutionSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupCheckbox: false,
            groupList: [],
            selectionIndexes: [],
            rootGroup: null,
            idCodeInputShow: false,
            userGroup: props.userGroup || null,
            userIdCode: props.userIdCode || null,
            selectedGroup: null,
        }
        // User already has a group, then find his group
        if (props.userGroup != null && props.userGroup != undefined) {
            this.getRootGroup(false)
            this.buildPath(props.userGroup)
        } else {
            this.getRootGroup()
        }
    }

    isInputValid() {
        let isThereSelectedGroup = this.state.selectedGroup != null
        let doesTheSelectedGroupRequireID = this.state.selectedGroup.require_id
        let isIdPresentIfNeeded = doesTheSelectedGroupRequireID ? 
            (this.state.userIdCode != null && this.state.userIdCode.length > 0) : true
        return isThereSelectedGroup && isIdPresentIfNeeded
    }
    
    updateParent() {
        if (this.isInputValid()) {
            this.props.setUserInstitutionCallback(this.state.userIdCode, this.state.userGroup)
        }
    }

    getRootGroup(setAlert=true) {   
        if (setAlert) this.props.setAlert(true)
        fetch(`${API_URL}/groups/root`, {
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
                this.setState({ rootGroup: responseJson.group })
                this.getChildren(responseJson.group.id)
                if (setAlert) this.props.setAlert(false)
            })
    }

    // This builds the path of current users group
    buildPath(id) {
        this.props.setAlert(true)
        fetch(`${API_URL}/groups/${id}/get_path`, {
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
            .then(async (responseJson) => {
                const groups = responseJson.groups
                let i = 0
                for (let group of groups) {
                    await this.getChildren(group.id, false)
                    this.state.selectionIndexes[i] = {
                        label: group.description,
                        key: group.id
                    }
                    i++
                }
                this.state.groupCheckbox = true
                
            })
            .then(() => {
                this.props.setAlert(false)
            })
    }

    getChildren(id, setAlert=true) {       
        if (setAlert) this.props.setAlert(true)
        this.state.idCodeInputShow = false
        return fetch(`${API_URL}/groups/${id}/get_children`, {
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
                    this.getGroup(id, setAlert)
                    return
                }
                this.state.selectionIndexes.push({ label: "Selecionar", key: -1 })
                this.state.groupList.push(responseJson)
                if (setAlert) this.props.setAlert(false)
            })
    }

    getGroup(id, setAlert=true) {
        this.state.idCodeInputShow = false
        if (setAlert) this.props.setAlert(true)
        return fetch(`${API_URL}/groups/${id}`, {
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
                if (responseJson.group.require_id) {
                    this.setState({idCodeInputShow: true})
                } else {
                    this.state.userIdCode = null
                    this.updateParent()
                }
                if (setAlert) this.props.setAlert(false)
            })
    }
    
    capitalizeFirstWords(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    groupComponent(group, index) {
        return (
            <View style={styles.selectInput}>
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

    identificationCodeInput() {
        return (
            <View style={styles.selectInput}>
                <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                <TextInput style={styles.formInput50}
                    returnKeyType='done'
                    keyboardType='number-pad'
                    value={this.state.userIdCode}
                    onChangeText={(text) => {
                        this.state.userIdCode = text
                        this.updateParent()
                    }}
                />
            </View>
        )
    }

    rowElements(el1, el2) {
        return (
            <View style={styles.modularRow}>
                <View style={{ flex: 1 }}>
                    {el1}
                </View>
                <View style={{ flex: 1 }}>
                    {el2}
                </View>
            </View>
        )
    }

    groupItemsManager() {
        const elements = this.state.groupList.map((x, i) => this.groupComponent(x, i))
        if (this.state.idCodeInputShow) {
            elements.push(this.identificationCodeInput())
        }
        if (elements.length == 0) {
            return null
        }
        const rowedElements = []
        let pair = null
        for (let el of elements) {
            if (pair == null) {
                pair = el
            } else {
                rowedElements.push(this.rowElements(pair, el))
                pair = null
            }
        }
        if (pair != null) {
            rowedElements.push(this.rowElements(pair, null))
        }
        return rowedElements
    }

    render() {
        return (
            <View style={{ marginBottom: 10, ...styles.modularGrid}}>
                <CheckBox
                    title={"É integrante de alguma instituição de Ensino?"}
                    containerStyle={styles.CheckBoxStyle}
                    size={scale(16)}
                    checked={this.state.groupCheckbox}
                    onPress={() => {
                        if (!this.state.groupCheckbox && this.state.rootGroup == null) {
                            this.getRootGroup()
                        } else if (this.state.groupCheckbox) {
                            this.state.userIdCode = null
                            this.state.userGroup = null
                        }
                        this.setState({ groupCheckbox: !this.state.groupCheckbox })
                    }}
                />
                {this.state.groupCheckbox ?
                    <View style={styles.modularColumn}>
                        {this.groupItemsManager()}
                    </View>
                    : null}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    selectInput: {
        width: "100%",
        height: 65,
        alignItems: 'center',
    },
    modularColumn: {
        flexDirection: 'column',
    },
    modularRow: {
        flexDirection: 'row',
        flex: 1
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
    commomTextView: {
        fontSize: 17,
        fontFamily: 'roboto',
        color: '#465F6C',
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: '10%',
    },
    CheckBoxStyle: {
        width: '90%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.11)',
        backgroundColor: 'transparent',
        alignSelf: "center"
    },
})

export default InstitutionSelector
