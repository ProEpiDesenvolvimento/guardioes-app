import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { ModalContainer, ModalBox, ModalTitle, ModalText, Button, ModalButton, ModalButtonText } from '../Household/styles';
import { Container, KeyboardScrollView, FormInline, FormLabel, NormalInput, FormGroup, FormGroupChild, Selector, DateSelector } from '../Household/styles';
import { FormInlineCheck, CheckBoxStyled, SendContainer, SendText } from '../Household/styles';

import { scale } from '../../../utils/scallingUtils';
import {API_URL} from 'react-native-dotenv';
import translate from '../../../../locales/i18n';
import { gender, country, race, household, getGroups, schoolCategory, educationLevel, schoolLocation } from '../../../utils/selectorUtils';
import { state, getCity } from '../../../utils/brasil';

let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

let today = d + "-" + m + "-" + y

Feather.loadFont();

class EditarPerfil extends Component {
    static navigationOptions = {
        title: "Editar Perfil"
    }
    constructor(props) {
        super(props)
        this.props.navigation.addListener('didFocus', payload => {
            //this.fetchData();
        })
        this.state = {
            isUser: null,
            modalVisibleRiskGroup: false,
        }
    }

    componentDidMount () {
        this.fetchData()
    }

    fetchData = () => {
        const { params } = this.props.navigation.state

        this.setState({ isUser: params.isUser })
        this.setState(params.data)
    }

    handleEdit = async () => {
        if (!this.state.groupCheckbox) {
            this.setState({ Group: null, IdCode: null, GroupName: null })
        }
        if (this.state.Country !== "Brazil") {
            this.setState({ City: null, State: null })
        }

        if (this.state.isUser) {
            await this.editUser()
        }
        else {
            await this.editHousehold()
        }
    }

    editUser = () => {
        return fetch(`${API_URL}/users/${this.state.userID}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify(
                {
                    user_name: this.state.Name,
                    birthdate: this.state.Birth,
                    gender: this.state.Gender,
                    race: this.state.Race,
                    school_unit_id: this.state.Group,
                    identification_code: this.state.IdCode,
                    risk_group: this.state.RiskGroup,
                    country: this.state.Country,
                    state: this.state.State,
                    city: this.state.City,
                    is_professional: this.state.isProfessional
                }
            )
        })
            .then((response) => {
                if (response.status == 200) {
                    console.warn(response.status)
                } else {
                    console.warn(response.status)
                }
            })
    }

    editHousehold = () => {
        return fetch(`${API_URL}/users/${this.state.userID}/households/${this.state.householdID}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/json',
                Authorization: `${this.state.userToken}`
            },
            body: JSON.stringify(
                {
                    description: this.state.Name,
                    birthdate: this.state.Birth,
                    gender: this.state.Gender,
                    race: this.state.Race,
                    school_unit_id: this.state.Group,
                    identification_code: this.state.IdCode,
                    risk_group: this.state.RiskGroup,
                    country: this.state.Country,
                    kinship: this.state.kinship,
                    picture: this.state.picture
                }
            )
        })
            .then((response) => {
                if (response.status == 200) {
                    console.warn(response.status)
                } else {
                    console.warn(response.status)
                }
            })
    }

    setRiskGroupModalVisible(visible) {
        this.setState({ modalVisibleRiskGroup: visible })
    }

    render() {
        const { isUser } = this.state
        console.log(this.state)

        return (
            <Container>
                <Modal //Modal View for Risk Group Message
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisibleRiskGroup}
                    onRequestClose={() => {
                        this.setRiskGroupModalVisible(!this.state.modalVisibleRiskGroup)
                    }
                }>
                    <ModalContainer>
                        <ModalBox>
                            <ModalTitle>
                                {translate("register.riskGroupTitle")}
                            </ModalTitle>
                            <ModalText>
                                {translate("register.riskGroupMessage")}
                            </ModalText>

                            <Button onPress={() => {
                                    this.setRiskGroupModalVisible(!this.state.modalVisibleRiskGroup)
                                }
                            }>
                                <ModalButton>
                                    <ModalButtonText>
                                        {translate("register.riskGroupButton")}
                                    </ModalButtonText>
                                </ModalButton>
                            </Button>
                        </ModalBox>
                    </ModalContainer>
                </Modal>
                <KeyboardScrollView>
                    { isUser ? 
                        <FormInline>
                            <FormLabel>Email:</FormLabel>
                            <Text style={{ color: 'gray', fontSize: 17, textAlign: "center" }}>{this.state.Email}</Text>
                        </FormInline>
                    : null}

                    <FormInline>
                        <FormLabel>{translate("register.name")}</FormLabel>
                        <NormalInput
                            value={this.state.Name}
                            onChangeText={text => this.setState({ Name: text })}
                        />
                    </FormInline>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>{translate("register.gender")}</FormLabel>
                            <Selector
                                data={gender}
                                initValue={this.state.Gender}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ Gender: option.key })}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>{translate("register.race")}</FormLabel>
                            <Selector
                                data={race}
                                initValue={this.state.Race}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ Race: option.key })}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    <FormGroup>
                        <FormGroupChild>
                            <FormLabel>Nascimento:</FormLabel>
                            <DateSelector
                                placeholder={translate("birthDetails.format")}
                                date={this.state.Birth}
                                format="DD-MM-YYYY"
                                minDate="01-01-1918"
                                maxDate={today}
                                locale={'pt-BR'}
                                confirmBtnText={translate("birthDetails.confirmButton")}
                                cancelBtnText={translate("birthDetails.cancelButton")}
                                onDateChange={date => this.setState({ Birth: date })}
                            />
                        </FormGroupChild>

                        <FormGroupChild>
                            <FormLabel>{translate("register.country")}</FormLabel>
                            <Selector
                                data={country}
                                initValue={this.state.Country}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ Country: option.key })}
                            />
                        </FormGroupChild>
                    </FormGroup>

                    {this.state.Country == "Brazil" && isUser ?
                        <FormGroup>
                            <FormGroupChild>
                                <FormLabel>Estado:</FormLabel>
                                <Selector
                                    data={state}
                                    initValue={this.state.State}
                                    cancelText={translate("selector.cancelButton")}
                                    onChange={(option) => this.setState({ State: option.key })}
                                />
                            </FormGroupChild>

                            <FormGroupChild>
                                <FormLabel>Cidade:</FormLabel>
                                <Selector
                                    data={getCity(this.state.State)}
                                    initValue={this.state.City}
                                    cancelText={translate("selector.cancelButton")}
                                    onModalClose={(option) => this.setState({ City: option.key, initValueCity: option.key })}
                                />
                            </FormGroupChild>
                        </FormGroup>
                    : null}

                    {!isUser ?
                        <FormInline>
                            <FormLabel>Parentesco:</FormLabel>
                            <Selector
                                data={household}
                                initValue={this.state.kinship}
                                cancelText={translate("selector.cancelButton")}
                                onChange={(option) => this.setState({ kinship: option.key })}
                            />
                        </FormInline>
                    : null}

                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={"Faz parte do Grupo de Risco?"}
                            checked={this.state.RiskGroup}
                            onPress={() => {
                                this.setState({ RiskGroup: !this.state.RiskGroup })
                            }}
                        />
                        <Button onPress={async () => {
                            this.setRiskGroupModalVisible(true)
                            }
                        }>
                            <Feather name="help-circle" size={scale(25)} color="#348EAC" />
                        </Button>
                    </FormInlineCheck>

                    <FormInlineCheck>
                        <CheckBoxStyled
                            title={"É integrante de alguma instituição de Ensino?"}
                            checked={this.state.groupCheckbox}
                            onPress={() => { this.setState({ groupCheckbox: !this.state.groupCheckbox }) }}
                        />
                    </FormInlineCheck>
                    {this.state.groupCheckbox && this.state.NewInst ?
                        <View>
                            <FormGroup>
                                <FormGroupChild>
                                    <FormLabel>Categoria:</FormLabel>
                                    <Selector
                                        data={schoolCategory}
                                        initValue={this.state.initValueCategory}
                                        cancelText={translate("selector.cancelButton")}
                                        onChange={(option) => this.setState({ Category: option.key, initValueCategory: option.label, EducationLevel: null })}
                                    />
                                </FormGroupChild>
                                {this.state.Category == "UNB" ?
                                    <FormGroupChild>
                                        <FormLabel>Faculdade:</FormLabel>
                                        <Selector
                                            data={getGroups("UNB", "", "")}
                                            initValue={this.state.initValueGroup}
                                            cancelText={translate("selector.cancelButton")}
                                            onChange={async (option) => {
                                                await this.setState({ Group: option.key, initValueGroup: option.label })
                                            }}
                                        />
                                    </FormGroupChild>
                                : this.state.Category == "SES-DF" ?
                                    <FormGroupChild>
                                        <FormLabel>Nivel de Ensino:</FormLabel>
                                        <Selector
                                            data={educationLevel}
                                            initValue={this.state.initValueEducationLevel}
                                            cancelText={translate("selector.cancelButton")}
                                            onChange={(option) => this.setState({ EducationLevel: option.key, initValueEducationLevel: option.label })}
                                        />
                                    </FormGroupChild>
                                : null}
                            </FormGroup>
                            {this.state.EducationLevel != null ?
                                <FormGroup>
                                    <FormGroupChild>
                                        <FormLabel>Região:</FormLabel>
                                            <Selector
                                                data={schoolLocation}
                                                initValue={this.state.initValueSchoolLocation}
                                                cancelText={translate("selector.cancelButton")}
                                                onChange={(option) => this.setState({ SchoolLocation: option.key, initValueSchoolLocation: option.label })}
                                            />
                                    </FormGroupChild>
                                    {this.state.SchoolLocation != null ?
                                        <FormGroupChild>
                                            <FormLabel>Unidade:</FormLabel>
                                                <Selector
                                                    data={getGroups("SES-DF", this.state.EducationLevel, this.state.SchoolLocation)}
                                                    initValue={this.state.GroupName}
                                                    cancelText={translate("selector.cancelButton")}
                                                    onChange={async (option) => {
                                                        await this.setState({ Group: option.key, GroupName: option.label })
                                                    }}
                                                />
                                        </FormGroupChild>
                                    : null}
                                </FormGroup>
                            : this.state.Group != null && this.state.Category == "UNB" ?
                                <FormGroup>
                                    <FormGroupChild>
                                        <FormLabel>Nº de Identificação:</FormLabel>
                                        <NormalInput
                                            returnKeyType='done'
                                            keyboardType='number-pad'
                                            value={this.state.IdCode}
                                            onChangeText={async (text) => {
                                                await this.setState({ IdCode: text })
                                            }}
                                        />
                                    </FormGroupChild>
                                </FormGroup>
                            : null}
                        </View>
                    : null}
                    {this.state.groupCheckbox && !this.state.NewInst ?
                        <FormGroup>
                            <FormGroupChild>
                                <FormLabel>Instituição:</FormLabel>
                                <Selector
                                    data={[{ key: this.state.Group, label: this.state.GroupName }]}
                                    initValue={this.state.GroupName}
                                    cancelText={translate("selector.cancelButton")}
                                    onChange={(option) => this.setState({ Group: option.key, GroupName: option.label })}
                                />
                            </FormGroupChild>
                            {this.state.IdCode ?
                                <FormGroupChild>
                                    <FormLabel>Nº de Identificação:</FormLabel>
                                    <NormalInput
                                        returnKeyType='done'
                                        keyboardType='number-pad'
                                        value={this.state.IdCode}
                                        onChangeText={text => this.setState({ IdCode: text })}
                                    />
                                </FormGroupChild>
                            : null}
                        </FormGroup>
                    : null}

                    <Button onPress={async () => {
                            await this.handleEdit()
                        }
                    }>
                        <SendContainer>
                            <SendText>Salvar</SendText>
                        </SendContainer>
                    </Button>

                    {this.state.groupCheckbox && !this.state.NewInst ?
                        <Button onPress={() => {
                                this.setState({
                                    NewInst: true,
                                    IdCode: null
                                })
                            }
                        }>
                            <SendContainer>
                                <SendText>Editar instituição</SendText>
                            </SendContainer>
                        </Button>
                    : null}
                </KeyboardScrollView>
            </Container>
        )
    }
}

export default EditarPerfil