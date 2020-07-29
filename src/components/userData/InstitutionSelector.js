import React, { Component } from 'react'
import { View } from 'react-native';

import { FormInlineCheck, FormGroup, FormGroupChild, FormLabel, NormalInput, Selector, CheckBoxStyled } from '../principal/Household/styles';

import { schoolCategory, schoolLocation, educationLevel } from '../../utils/selectorUtils'
import { scale } from '../../utils/scallingUtils'
import translate from '../../../locales/i18n'
import { API_URL } from 'react-native-dotenv';

class InstitutionSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupCheckbox: false,
            initValueGroup: null,
            initValueCategory: null,
            initValueSchoolLocation: null,
            initValueEducationLevel: null,
        }
    }

    updateParent() {
        this.props.setUserInstitutionCallback(this.state.userIdCode, this.state.userGroup)
    }

    loadingSchools(Category, Level, City) {
        const groups = []
        this.props.setAlert(true)
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
                    setTimeout(() => {
                        this.props.setAlert(false)
                      }, 1500);
                    return response.json()
                }
            })
            .then((responseJson) => {
                responseJson.school_units.map(group => {
                    groups.push({ key: group.id, label: group.description })
                })
                this.setState({ groups })
            })
    }

    render() {
        return (
            <View style={{ marginBottom: scale(16) }}>
                <FormInlineCheck>
                    <CheckBoxStyled
                        title={"É integrante de alguma instituição de Ensino?"}
                        checked={this.state.groupCheckbox}
                        onPress={() => this.setState({ groupCheckbox: !this.state.groupCheckbox })}
                    />
                </FormInlineCheck>
                {this.state.groupCheckbox ?
                    <View>
                        <FormGroup>
                            <FormGroupChild>
                                <FormLabel>
                                    Categoria:
                                </FormLabel>
                                <Selector
                                    initValue={translate("selector.label")}
                                    cancelText={translate("selector.cancelButton")}
                                    data={schoolCategory}
                                    onChange={(option) => { if (option.key == "UNB") { this.loadingSchools(option.key) } this.setState({ userCategory: option.key, initValueCategory: option.label, userEducationLevel: null }) }}
                                />
                            </FormGroupChild>
                            {this.state.userCategory == "UNB" ?
                                <FormGroupChild>
                                    <FormLabel>
                                        Faculdade:
                                    </FormLabel>
                                    <Selector
                                        initValue={translate("selector.label")}
                                        cancelText={translate("selector.cancelButton")}
                                        data={this.state.groups}
                                        onChange={async (option) => {
                                            await this.setState({ userGroup: option.key, initValueGroup: option.label })
                                            this.updateParent()
                                        }}
                                    />
                                </FormGroupChild>
                            : this.state.userCategory == "SES-DF" ?
                                <FormGroupChild>
                                    <FormLabel>
                                        Nivel de Ensino:
                                    </FormLabel>
                                    <Selector
                                        initValue={translate("selector.label")}
                                        cancelText={translate("selector.cancelButton")}
                                        data={educationLevel}
                                        onChange={(option) => this.setState({ userEducationLevel: option.key, initValueEducationLevel: option.label })}
                                    />
                                </FormGroupChild>
                            : null}
                        </FormGroup>
                        {this.state.userEducationLevel != null ?
                            <FormGroup>
                                <FormGroupChild>
                                    <FormLabel>
                                        Região:
                                    </FormLabel>
                                    <Selector
                                        initValue={translate("selector.label")}
                                        cancelText={translate("selector.cancelButton")}
                                        data={schoolLocation}
                                        onChange={(option) => { this.loadingSchools(this.state.userCategory, this.state.userEducationLevel, option.key), this.setState({ userSchoolLocation: option.key, initValueSchoolLocation: option.label }) }}
                                    />
                                </FormGroupChild>
                                {this.state.userSchoolLocation != null ?
                                    <FormGroupChild>
                                        <FormLabel>
                                            Unidade:
                                        </FormLabel>
                                        <Selector
                                            initValue={translate("selector.label")}
                                            cancelText={translate("selector.cancelButton")}
                                            data={this.state.groups}
                                            onChange={async (option) => {
                                                await this.setState({ userGroup: option.key, initValueGroup: option.label })
                                                this.updateParent()
                                            }}
                                        />
                                    </FormGroupChild>
                                : null}
                            </FormGroup>
                        : this.state.userGroup != null && this.state.userCategory == "UNB" ?
                            <FormGroup>
                                <FormGroupChild>
                                    <FormLabel>
                                        Nº de Identificação:
                                    </FormLabel>
                                    <NormalInput
                                        returnKeyType='done'
                                        keyboardType='number-pad'
                                        onChangeText={async (text) => {
                                            await this.setState({ userIdCode: text })
                                            this.updateParent()
                                        }}
                                    />
                                </FormGroupChild>
                            </FormGroup>
                        : null}
                    </View>
                : null}
            </View>
        )
    }
}

//make this component available to the app
export default InstitutionSelector
