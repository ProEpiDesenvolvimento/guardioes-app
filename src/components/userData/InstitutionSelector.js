import React, { Component } from 'react'

import { FormInlineCheck, FormGroup, FormGroupChild, FormLabel, NormalInput, Selector, CheckBoxStyled } from '../principal/Household/styles'

import { API_URL } from 'react-native-dotenv'
import translate from '../../../locales/i18n'

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
            currentError: '',
            lightTheme: props.lightTheme || false,
        }
        this.props.setErrorCallback('')
        // User already has a group, then find his group
        if (props.userGroup != null && props.userGroup != undefined) {
            this.getRootGroup(false)
            this.buildPath(props.userGroup)
        } else {
            this.getRootGroup()
        }
    }

    isInputValid() {
        if (this.state.groupCheckbox == false) {
            return true
        }
        if (this.state.selectedGroup == null || this.state.selectedGroup == undefined) {
            this.state.currentError = 'Você deve selecionar o grupo'
            return false
        }
        let isThereSelectedGroup = this.state.selectedGroup != null
        if (!isThereSelectedGroup) {
            this.state.currentError = 'Você deve selecionar o grupo'
        }
        let doesTheSelectedGroupRequireID = this.state.selectedGroup.require_id
        let isIdPresentIfNeeded = doesTheSelectedGroupRequireID ? 
            (this.state.userIdCode != null && this.state.userIdCode.length > 0) : true
        if (!isIdPresentIfNeeded) {
            this.state.currentError = 'Você deve colocar o codigo de identificação'
        }
        let isIdRightLength = true
        if (doesTheSelectedGroupRequireID && isIdPresentIfNeeded) {
            isIdRightLength = this.state.userIdCode.length == this.state.selectedGroup.id_code_length
            if (!isIdRightLength) {
                this.state.currentError = 'O código deve conter exatamente ' + this.state.selectedGroup.id_code_length.toString() + ' digitos'
            }
        }
        let codeIsNumber = true
        if (doesTheSelectedGroupRequireID && isIdPresentIfNeeded && isIdRightLength) {
            codeIsNumber = !isNaN(this.state.userIdCode)
            if (!codeIsNumber) {
                this.state.currentError = 'O código deve conter apenas digitos'
            }
        }
        if (isThereSelectedGroup && isIdPresentIfNeeded && isIdRightLength && codeIsNumber) {
            this.state.currentError = ''
        }
        return isThereSelectedGroup && isIdPresentIfNeeded && isIdRightLength && codeIsNumber
    }
    
    updateParent() {
        if (!this.state.groupCheckbox || this.isInputValid()) {
            const idCode = this.state.groupCheckbox ? this.state.userIdCode : null
            const group = this.state.groupCheckbox ? this.state.userGroup : null
            this.props.setUserInstitutionCallback(idCode, group)
            this.props.setErrorCallback('')
        } else {
            this.props.setErrorCallback(this.state.currentError)
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
                this.updateParent()
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
                this.state.selectionIndexes.push({ label: translate("selector.label"), key: -1 })
                this.state.groupList.push(responseJson)
                if (setAlert) this.props.setAlert(false)
                this.updateParent()
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
                }
                if (setAlert) this.props.setAlert(false)
                this.updateParent()
            })
    }
    
    capitalizeFirstWords(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    groupComponent(group, index) {
        return (
            <FormGroupChild>
                <FormLabel light={this.state.lightTheme}>
                    {this.capitalizeFirstWords(group.label)}:
                </FormLabel>
                <Selector
                    data={
                        group.children.map((x) => {
                            return {
                                key: x.id,
                                label: x.description
                            }
                        })
                    }
                    initValue={this.state.selectionIndexes[index].label}
                    cancelText={translate("selector.cancelButton")}
                    onChange={(option) => {
                        this.state.groupList = this.state.groupList.slice(0, index + 1)
                        this.state.selectionIndexes = this.state.selectionIndexes.slice(0, index + 1)
                        this.state.showIdentificationCodeInput = false
                        this.getChildren(option.key)
                        this.state.selectionIndexes[index] = option
                        if (!group.is_child) {
                            this.state.userGroup = null
                            this.state.selectedGroup = null
                            this.state.userIdCode = null
                            this.updateParent()
                        }
                    }}
                />
            </FormGroupChild>
        )
    }

    identificationCodeInput() {
        return (
            <FormGroupChild>
                <FormLabel light={this.state.lightTheme}>
                    Nº de Identificação:
                </FormLabel>
                <NormalInput
                    returnKeyType='done'
                    keyboardType='number-pad'
                    value={this.state.userIdCode}
                    onChangeText={async (text) => {
                        await this.setState({
                            userIdCode: text
                        })
                        this.updateParent()
                    }}
                />
            </FormGroupChild>
        )
    }

    rowElements(el1, el2) {
        return (
            <FormGroup>
                {el1}
                {el2}
            </FormGroup>
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
            <>
                <FormInlineCheck>
                    <CheckBoxStyled
                        title={"É integrante de alguma instituição de Ensino?"}
                        checked={this.state.groupCheckbox}
                        onPress={async () => {
                            if (!this.state.groupCheckbox && this.state.rootGroup == null) {
                                this.getRootGroup()
                            }
                            await this.setState({ groupCheckbox: !this.state.groupCheckbox })
                            this.updateParent()
                        }}
                    />
                </FormInlineCheck>
                {this.state.groupCheckbox ?
                    this.groupItemsManager()
                : null}
            </>
        )
    }
}

export default InstitutionSelector
