import React, { Component } from 'react'
import { Alert } from 'react-native'

import {
    FormInlineCheck,
    FormGroup,
    FormGroupChild,
    FormLabel,
    NormalInput,
    Selector,
    CheckBoxStyled,
} from '../NormalForms'

import translate from '../../../locales/i18n'
import {
    getAppRootGroup,
    getAppGroup,
    getAppGroupChildren,
    getUserGroupPath,
} from '../../api/groups'

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
            lightTheme: props.lightTheme || false
        }
        this.props.setErrorCallback('')
        // User already has a group, then find his group
        if (props.userGroup !== null && props.userGroup !== undefined) {
            this.getRootGroup(false)
            this.buildPath(props.userGroup)
        }
    }

    isInputValid() {
        if (this.state.groupCheckbox === false) {
            return true
        }
        if (
            this.state.selectedGroup === null ||
            this.state.selectedGroup === undefined
        ) {
            this.state.currentError = translate('selector.groupError')
            return false
        }
        const isThereSelectedGroup = this.state.selectedGroup !== null
        if (!isThereSelectedGroup) {
            this.state.currentError = translate('selector.groupError')
        }
        const doesTheSelectedGroupRequireID = this.state.selectedGroup
            .require_id
        const isIdPresentIfNeeded = doesTheSelectedGroupRequireID
            ? this.state.userIdCode !== null && this.state.userIdCode.length > 0
            : true
        if (!isIdPresentIfNeeded) {
            this.state.currentError = translate('selector.codeError')
        }
        const isIdRightLength = true

        // This checks if the id length of code is correct, as of know, this will not be implemented

        // if (doesTheSelectedGroupRequireID && isIdPresentIfNeeded) {
        //     isIdRightLength = this.state.userIdCode.length === this.state.selectedGroup.id_code_length
        //     if (!isIdRightLength) {
        //         this.state.currentError = 'O código deve conter exatamente ' + this.state.selectedGroup.id_code_length.toString() + ' digitos'
        //     }
        // }

        let codeIsNumber = true
        if (
            doesTheSelectedGroupRequireID &&
            isIdPresentIfNeeded &&
            isIdRightLength
        ) {
            codeIsNumber = !isNaN(this.state.userIdCode)
            if (!codeIsNumber) {
                this.state.currentError = translate('selector.codeFormatError')
            }
        }
        if (
            isThereSelectedGroup &&
            isIdPresentIfNeeded &&
            isIdRightLength &&
            codeIsNumber
        ) {
            this.state.currentError = ''
        }
        return (
            isThereSelectedGroup &&
            isIdPresentIfNeeded &&
            isIdRightLength &&
            codeIsNumber
        )
    }

    updateParent() {
        if (!this.state.groupCheckbox || this.isInputValid()) {
            const idCode = this.state.groupCheckbox
                ? this.state.userIdCode
                : null
            const group = this.state.groupCheckbox ? this.state.userGroup : null
            this.props.setUserInstitutionCallback(idCode, group)
            this.props.setErrorCallback('')
        } else {
            this.props.setErrorCallback(this.state.currentError)
        }
    }

    async getRootGroup(setAlert = true) {
        if (setAlert) this.props.setAlert(true)

        getAppRootGroup()
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ rootGroup: response.body.group })
                    this.getChildren(response.body.group.id)
                }
            })
            .then(() => {
                if (setAlert) this.props.setAlert(false)
            })
    }

    async getGroup(id, setAlert = true) {
        if (setAlert) this.props.setAlert(true)
        this.setState({ idCodeInputShow: false })

        getAppGroup(id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ selectedGroup: response.body.group })

                    if (response.body.group.require_id) {
                        this.setState({ idCodeInputShow: true })
                    } else {
                        this.setState({ userIdCode: null })
                    }
                }
            })
            .then(() => {
                this.updateParent()
                if (setAlert) this.props.setAlert(false)
            })
    }

    async getChildren(id, setAlert = true) {
        if (setAlert) this.props.setAlert(true)
        this.setState({ idCodeInputShow: false })

        getAppGroupChildren(id)
            .then((response) => {
                if (response.status === 200) {
                    if (response.body.is_child) {
                        this.setState({ userGroup: id })
                        this.getGroup(id, setAlert)
                        return
                    }

                    const selectionIndexes = this.state.selectionIndexes.slice()
                    selectionIndexes.push({
                        label: translate('selector.label'),
                        key: -1,
                    })

                    const groupList = this.state.groupList.slice()
                    groupList.push(response.body)

                    this.setState({ selectionIndexes })
                    this.setState({ groupList })
                }
            })
            .then(() => {
                this.updateParent()
                setTimeout(() => {
                    if (setAlert) this.props.setAlert(false)
                }, 1000)
            })
    }

    // This builds the path of current users group
    async buildPath(id) {
        this.props.setAlert(true)

        getUserGroupPath(id)
            .then(async (response) => {
                if (response.status === 200) {
                    const { groups } = response.body
                    const selectionIndexes = []

                    groups.map(async (group) => {
                        await this.getChildren(group.id, false)

                        selectionIndexes.push({
                            label: group.description,
                            key: group.id,
                        })
                    })

                    this.setState({ selectionIndexes })
                    this.setState({ groupCheckbox: true })
                }
            })
            .then(() => {
                this.updateParent()
                this.props.setAlert(false)
            })
    }

    capitalizeFirstWords(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    groupComponent(group, index) {
        if(group.children.length > 0){
            return (
                <FormGroupChild key={index}>
                    <FormLabel light={this.state.lightTheme}>
                        {this.capitalizeFirstWords(group.label)}:
                    </FormLabel>
                    <Selector
                        data={group.children.map((x) => {
                            return {
                                key: x.id,
                                label: x.description,
                            }
                        })}
                        initValue={this.state.selectionIndexes[index].label}
                        cancelText={translate('selector.cancelButton')}
                        onChange={(option) => {
                            this.state.groupList = this.state.groupList.slice(
                                0,
                                index + 1
                            )
                            this.state.selectionIndexes = this.state.selectionIndexes.slice(
                                0,
                                index + 1
                            )
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
        } else {
            Alert.alert(
                "Não possuimos instituições cadastradas nesse município",
                "Mostre o aplicativo para sua instituição e faça parte dessa iniciaiva."
            )
        }
    }

    identificationCodeInput(index) {
        return (
            <FormGroupChild key={index}>
                <FormLabel light={this.state.lightTheme}>
                    Nº de Identificação:
                </FormLabel>
                <NormalInput
                    returnKeyType='done'
                    keyboardType='number-pad'
                    value={this.state.userIdCode}
                    onChangeText={async (text) => {
                        await this.setState({
                            userIdCode: text,
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
        const elements = this.state.groupList.map((x, i) =>
            this.groupComponent(x, i)
        )

        if (this.state.idCodeInputShow) {
            elements.push(this.identificationCodeInput(elements.length))
        }
        if (elements.length === 0) {
            return null
        }

        const rowedElements = []
        let pair = null
        for (const el of elements) {
            if (pair === null) {
                pair = el
            } else {
                rowedElements.push(this.rowElements(pair, el))
                pair = null
            }
        }

        if (pair !== null) {
            rowedElements.push(this.rowElements(pair, null))
        }

        return rowedElements
    }

    render() {
        return (
            <>
                <FormInlineCheck>
                    <CheckBoxStyled
                        title={translate('register.educationalInstitution')}
                        checked={this.state.groupCheckbox}
                        onPress={async () => {
                            if (
                                !this.state.groupCheckbox &&
                                this.state.rootGroup === null
                            ) {
                                this.getRootGroup()
                            }
                            await this.setState({
                                groupCheckbox: !this.state.groupCheckbox,
                            })
                            this.updateParent()
                        }}
                    />
                </FormInlineCheck>
                {this.state.groupCheckbox ? this.groupItemsManager() : null}
            </>
        )
    }
}

export default InstitutionSelector
