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
        if (props.userGroup !== null && props.userGroup !== undefined) {
            this.getRootGroup(false)
            this.buildPath(props.userGroup)
        }
    }

    // eslint-disable-next-line react/sort-comp
    isInputValid() {
        if (this.state.groupCheckbox === false) {
            return true
        }
        if (
            this.state.selectedGroup === null ||
            this.state.selectedGroup === undefined
        ) {
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
                    this.setState({ rootGroup: response.data.group })
                    this.getChildren(response.data.group.id)
                }
            })
            .then(() => {
                if (setAlert) this.props.setAlert(false)
            })
    }

    insertSortToGroupList(data) {
        const groupList = this.state.groupList.slice()

        groupList.push(data)
        for (let i = parseInt(groupList.length, 10) - 1; i > 0; i -= 1) {
            if (groupList[i].id < groupList[i - 1].id) {
                const tmp = groupList[i]
                groupList[i] = groupList[i - 1]
                groupList[i - 1] = tmp
            } else {
                break
            }
        }

        this.setState({ groupList })
    }

    async getGroup(id, setAlert = true) {
        if (setAlert) this.props.setAlert(true)
        this.setState({ idCodeInputShow: false })

        getAppGroup(id)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ selectedGroup: response.data.group })

                    if (response.data.group.group_manager && response.data.group.group_manager.require_id != null) {
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
                    if (response.data.is_child) {
                        this.setState({ userGroup: id })
                        this.getGroup(id, setAlert)
                        return
                    }

                    const selectionIndexes = this.state.selectionIndexes.slice()
                    selectionIndexes.push({
                        label: translate('selector.label'),
                        key: -1,
                    })

                    this.insertSortToGroupList({
                        ...response.data,
                        id: parseInt(id, 10),
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

    // This builds the path of current users group
    async buildPath(id) {
        this.props.setAlert(true)

        getUserGroupPath(id)
            .then(async (response) => {
                if (response.status === 200) {
                    const { groups } = response.data
                    const selectionIndexes = []

                    groups.forEach(async (group) => {
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

    capitalizeFirstWords = (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    groupComponent(group, index) {
        if (group.children.length === 0) {
            Alert.alert(
                'Não possuimos instituições cadastradas nesse município',
                'Mostre o aplicativo para sua instituição e faça parte dessa iniciaiva.'
            )
            return null
        }

        if (this.state.selectionIndexes[index]) {
            return (
                <FormGroupChild key={index}>
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
                            this.setState({
                                groupList: this.state.groupList.slice(
                                    0,
                                    index + 1
                                ),
                            })
                            this.setState({
                                selectionIndexes: this.state.selectionIndexes.slice(
                                    0,
                                    index + 1
                                ),
                            })
                            this.setState({ idCodeInputShow: false })

                            this.getChildren(option.key)

                            this.setState({
                                selectionIndexes: [
                                    ...this.state.selectionIndexes.slice(
                                        0,
                                        index
                                    ),
                                    option,
                                ],
                            })

                            if (!group.is_child) {
                                this.setState({
                                    userGroup: null,
                                    selectedGroup: null,
                                    userIdCode: null,
                                })
                                this.updateParent()
                            }
                        }}
                    />
                </FormGroupChild>
            )
        }

        return null
    }

    idCodeComponent(index) {
        return (
            <FormGroupChild key={index}>
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

    rowElements = (el1, el2, index) => {
        const key = index + 100
        return (
            <FormGroup key={key}>
                {el1}
                {el2}
            </FormGroup>
        )
    }

    groupItemsManager() {
        const elements = this.state.groupList.map((g, i) =>
            this.groupComponent(g, i)
        )

        if (this.state.idCodeInputShow) {
            elements.push(this.idCodeComponent(elements.length))
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
