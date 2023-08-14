import React, { Component } from 'react'
import { Alert } from 'react-native'

import {
    FormInlineCheck,
    FormGroup,
    FormGroupChild,
    FormLabel,
    NormalInput,
    CheckBoxStyled,
} from '../NormalForms'
import Autocomplete from '../Autocomplete'

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
            hasGroup: false,
            showIdCodeInput: false,
            selectionGroups: [],
            selectionIndexes: [],
            rootGroup: null,
            selectedGroup: null,
            userGroupId: props.userGroupId || null,
            userIdCode: props.userIdCode || null,
            currentError: '',
            lightTheme: props.lightTheme || false,
        }
        this.props.setErrorCallback('')
        // User already has a group, then find his group
        if (props.userGroupId) {
            this.buildPath(props.userGroupId)
        }
    }

    // eslint-disable-next-line react/sort-comp
    isInputValid() {
        if (this.state.hasGroup === false) {
            return true
        }
        if (!this.state.selectedGroup) {
            this.setState({ currentError: translate('selector.groupError') })
            return false
        }

        const doesTheSelectedGroupRequireID = 
            this.state.selectedGroup.group_manager ? this.state.selectedGroup.group_manager.require_id !== null : false

        const isIdPresentIfNeeded = doesTheSelectedGroupRequireID
            ? this.state.userIdCode !== null && this.state.userIdCode.length > 0
            : true
        if (!isIdPresentIfNeeded) {
            this.setState({ currentError: translate('selector.codeError') })
        }

        const isIdRightLength = true
        /*
        if (doesTheSelectedGroupRequireID && isIdPresentIfNeeded) {
            isIdRightLength =
                this.state.userIdCode.length ===
                this.state.selectedGroup.id_code_length
            if (!isIdRightLength) {
                this.setState({
                    currentError:
                        translate('selector.codeLengthError') +
                        this.state.selectedGroup.id_code_length.toString() +
                        translate('selector.codeLengthError2'),
                })
            }
        }
        */

        const codeIsNumber = true
        /*
        if (
            doesTheSelectedGroupRequireID &&
            isIdPresentIfNeeded &&
            isIdRightLength
        ) {
            codeIsNumber = !Number.isNaN(this.state.userIdCode)
            if (!codeIsNumber) {
                this.setState({
                    currentError: translate('selector.codeFormatError'),
                })
            }
        }
        */

        if (isIdPresentIfNeeded && isIdRightLength && codeIsNumber) {
            this.setState({ currentError: '' })
        }
        return isIdPresentIfNeeded && isIdRightLength && codeIsNumber
    }

    updateParent() {
        if (!this.state.hasGroup || this.isInputValid()) {
            const idCode = this.state.hasGroup ? this.state.userIdCode : null
            const group = this.state.hasGroup ? this.state.userGroupId : null

            this.props.setUserInstitutionCallback(idCode, group)
            this.props.setErrorCallback('')
        } else {
            this.props.setErrorCallback(this.state.currentError)
        }
    }

    insertToGroupList(group) {
        const { selectionGroups } = this.state

        const sortedChildren = group.children.sort((a, b) =>
            a.description.localeCompare(b.description)
        )

        const newGroup = {
            ...group,
            children: sortedChildren,
        }
        selectionGroups.push(newGroup)
        this.setState({ selectionGroups })
    }

    async getRootGroup(setAlert = true) {
        if (setAlert) this.props.setAlert(true)

        getAppRootGroup()
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ rootGroup: response.data.group })
                    this.getChildren(response.data.group.id)
                }
            })
            .then(() => {
                if (setAlert) this.props.setAlert(false)
            })
    }

    async getGroup(id, setAlert = true) {
        if (setAlert) this.props.setAlert(true)
        this.setState({ showIdCodeInput: false })

        getAppGroup(id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ selectedGroup: response.data.group })

                    if (
                        response.data.group.group_manager &&
                        response.data.group.group_manager.require_id != null
                    ) {
                        this.setState({ showIdCodeInput: true })
                    } else {
                        this.setState({ userIdCode: null })
                    }
                }
            })
            .then(() => {
                this.updateParent()
                setTimeout(() => {
                    if (setAlert) this.props.setAlert(false)
                }, 1000)
            })
    }

    async getChildren(id, setAlert = true) {
        if (setAlert) this.props.setAlert(true)
        this.setState({ showIdCodeInput: false })

        getAppGroupChildren(id)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.is_child) {
                        this.setState({ userGroupId: id })
                        this.getGroup(id, setAlert)
                        return
                    }

                    this.insertToGroupList(response.data)

                    const { selectionIndexes } = this.state
                    selectionIndexes.push({
                        label: translate('selector.label'),
                        key: -1,
                    })
                    this.setState({ selectionIndexes })
                }
            })
            .then(() => {
                this.updateParent()
                setTimeout(() => {
                    if (setAlert) this.props.setAlert(false)
                }, 1000)
            })
    }

    async getGroupPath(id) {
        this.props.setAlert(true)

        getUserGroupPath(id)
            .then(async (response) => {
                if (response.status === 200) {
                    const { groups } = response.data

                    const selectionIndexes = []
                    // eslint-disable-next-line no-restricted-syntax
                    for (const group of groups) {
                        await this.getChildren(group.id, false)

                        selectionIndexes.push({
                            label: group.description,
                            key: group.id,
                        })
                    }
                    this.setState({ selectionIndexes })

                    this.setState({ hasGroup: true })
                }
            })
            .then(() => {
                this.updateParent()
                this.props.setAlert(false)
            })
    }

    // This builds the path of current user group
    async buildPath(userGroupId) {
        await this.getRootGroup(false)
        await this.getGroupPath(userGroupId)
    }

    capitalizeFirstWords = (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    rowElements = (el1, el2, index) => {
        const key = index + 100000
        return (
            <FormGroup key={key}>
                {el1}
                {el2}
            </FormGroup>
        )
    }

    groupComponent(group, index) {
        if (group.children.length === 0) {
            Alert.alert(
                translate('register.noInstitutionFound'),
                translate('register.noInstitutionFoundDesc')
            )
            return null
        }
        if (this.state.selectionIndexes[index]) {
            return (
                <FormGroupChild>
                    <FormLabel light={this.state.lightTheme}>
                        {this.capitalizeFirstWords(group.label)}:
                    </FormLabel>
                    <Autocomplete
                        data={group.children.map((x) => {
                            return {
                                key: x.id,
                                label: x.description,
                            }
                        })}
                        value={this.state.selectionIndexes[index].label}
                        onChange={(option) => {
                            this.setState((prevState) => ({
                                selectionGroups: prevState.selectionGroups.slice(
                                    0,
                                    index + 1
                                ),
                            }))
                            this.setState((prevState) => ({
                                selectionIndexes: [
                                    ...prevState.selectionIndexes.slice(
                                        0,
                                        index
                                    ),
                                    option,
                                ],
                            }))

                            this.setState({ showIdCodeInput: false })

                            if (!group.is_child) {
                                this.setState({
                                    selectedGroup: null,
                                    userGroupId: null,
                                    userIdCode: null,
                                })
                                this.updateParent()
                            }

                            this.getChildren(option.key)
                        }}
                    />
                </FormGroupChild>
            )
        }

        return null
    }

    idCodeComponent() {
        return (
            <FormGroupChild>
                <FormLabel light={this.state.lightTheme}>
                    {this.state.selectedGroup.group_manager.require_id}
                </FormLabel>
                <NormalInput
                    returnKeyType='done'
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

    groupItemsManager() {
        const elements = this.state.selectionGroups.map((g, i) =>
            this.groupComponent(g, i)
        )

        if (this.state.showIdCodeInput) {
            elements.push(this.idCodeComponent())
        }
        if (elements.length === 0) {
            return null
        }

        let pair = null
        const rowedElements = []

        elements.forEach((el, index) => {
            if (pair === null) {
                pair = el
            } else {
                rowedElements.push(this.rowElements(pair, el, index))
                pair = null
            }
        })

        if (pair !== null) {
            rowedElements.push(this.rowElements(pair, null, elements.length))
        }

        return rowedElements
    }

    render() {
        return (
            <>
                <FormInlineCheck space>
                    <CheckBoxStyled
                        title={translate('register.institution')}
                        checked={this.state.hasGroup}
                        onPress={async () => {
                            if (
                                !this.state.hasGroup &&
                                this.state.rootGroup === null
                            ) {
                                this.getRootGroup()
                            }
                            await this.setState((prevState) => ({
                                hasGroup: !prevState.hasGroup,
                            }))
                            this.updateParent()
                        }}
                    />
                </FormInlineCheck>
                {this.state.hasGroup ? this.groupItemsManager() : null}
            </>
        )
    }
}

export default InstitutionSelector
