import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, Modal, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import * as Imagem from '../../imgs/imageConst';
import { Avatar, CheckBox } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale } from '../../utils/scallingUtils';
import DatePicker from 'react-native-datepicker';
import {API_URL} from 'react-native-dotenv';
import translate from '../../../locales/i18n';
import ModalSelector from 'react-native-modal-selector';
import { gender, country, race, household, getGroups, getGroupName, schoolCategory, educationLevel, schoolLocation } from '../../utils/selectorUtils';
import { state, getCity } from '../../utils/brasil';
import InstitutionSelector from '../userData/InstitutionSelector' 

FontAwesome.loadFont()

let data = new Date()
let d = data.getDate()
let m = data.getMonth() + 1
let y = data.getFullYear()

let today = d + "-" + m + "-" + y

class Perfil extends Component {
  static navigationOptions = {
    title: "Perfil"
  }
  constructor(props) {
    super(props)
    this.getInfo()
    this.state = {
      modalVisibleHousehold: false,
      modalVisibleUser: false,
    }
  }

  setModalVisible(visible) {
    if (this.state.userModal == true) {
      this.setState({ modalVisibleUser: visible })
    } else {
      this.setState({ modalVisibleHousehold: visible })
    }
  }

  confirmDelete = () => {
    Alert.alert(
      "Deletar Usuário",
      "Deseja deletar esse usuário?",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.deleteHousehold() },
      ],
      { cancelable: false },
    )
  }

  getInfo = async () => { //Get user info
    const userID = await AsyncStorage.getItem('userID')
    const userName = await AsyncStorage.getItem('userName')
    const userAvatar = await AsyncStorage.getItem('userAvatar')
    const userToken = await RNSecureStorage.get('userToken')

    this.setState({ userName, userID, userToken, userAvatar })
    await this.getAllUserInfos()
    this.setState({ userSelect: this.state.userName })
    this.setState({ userIdSelect: this.state.userIdCode })
    this.getHouseholds()
  }

  getHouseholds = () => {//Get households
    //console.warn("UserID " + this.state.userID + " Token " + this.state.userToken)
    return fetch(`${API_URL}/users/${this.state.userID}/households`, {
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `${this.state.userToken}`
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.households,
        })
      })
  }

  deleteHousehold = () => {
    return fetch(`${API_URL}/users/${this.state.userID}/households/${this.state.householdID}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `${this.state.userToken}`
      },
    }).then((response) => {
      console.warn(response.status)
      this.getHouseholds()
    })
  }

  avatarHouseholdSelector = async () => {
    if (this.state.householdGender == "Masculino") {
      switch (this.state.kinship) {
        case "Pai":
          await this.setState({ picture: "Father" })
          break
        case "Mãe":
          await this.setState({ picture: "Mother" })
          break
        case "conjuge":
          await this.setState({ picture: "Father" })
          break
        case "Avós":
          await this.setState({ picture: "Grandfather" })
          break
        case "Filhos":
          await this.setState({ picture: "Son" })
          break
        case "Irmãos":
          await this.setState({ picture: "Brother" })
          break
      }
    } else {
      switch (this.state.kinship) {
        case "Mãe":
          await this.setState({ picture: "Mother" })
          break
        case "Pai":
          await this.setState({ picture: "Father" })
          break
        case "conjuge":
          await this.setState({ picture: "Mother" })
          break
        case "Avós":
          await this.setState({ picture: "Grandmother" })
          break
        case "Filhos":
          await this.setState({ picture: "Daughter" })
          break
        case "Irmãos":
          await this.setState({ picture: "Sister" })
          break
      }
    }

    this.editHousehold()
  }

  editHousehold = () => {
    if (!this.state.groupCheckbox) {
      this.setState({
        householdIdCode: null,
        householdGroup: null
      })
    }
    fetch(`${API_URL}/users/${this.state.userID}/households/${this.state.householdID}`, {
      method: 'PATCH',
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
          school_unit_id: this.state.householdGroup,
          identification_code: this.state.householdIdCode,
          risk_group: this.state.householdRiskGroup
        }
      )
    })
      .then((response) => {
        if (response.status == 200) {
          console.warn(response.status)
          this.getHouseholds()
        } else {
          console.warn(response.status)
        }
      })
  }

  editUser = () => {
    fetch(`${API_URL}/users/${this.state.userID}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`
      },
      body: JSON.stringify(
        {
          user_name: this.state.userName,
          birthdate: this.state.userDob,
          gender: this.state.userGender,
          race: this.state.userRace,
          school_unit_id: this.state.userGroup,
          identification_code: this.state.userIdCode,
          is_professional: this.state.isProfessional,
          risk_group: this.state.userRiskGroup,
          state: this.state.userState,
          city: this.state.userCity
        }
      )
    })
      .then((response) => {
        if (response.status == 200) {
          console.warn(response.status)
          //this.getHouseholds()
        } else {
          console.warn(response.status)
        }
      })
  }

  getAllUserInfos = () => {
    return fetch(`${API_URL}/users/${this.state.userID}`, {
      method: 'GET',
      headers: {
        Authorization: `${this.state.userToken}`
      }
    }).then((response) => {
      if (response.status == 200) {
        console.warn(response.status)
        return response.json()
      } else {
        console.warn(response.status)
      }
    }).then(async (responseJson) => {
      responseJson.user.birthdate = responseJson.user.birthdate.split('T', 1).join('')
      responseJson.user.birthdate = responseJson.user.birthdate.split('')
      let str = ''
      str = responseJson.user.birthdate[8] + responseJson.user.birthdate[9] + '-' + responseJson.user.birthdate[5] + responseJson.user.birthdate[6] + '-'
      str += responseJson.user.birthdate[0] + responseJson.user.birthdate[1] + responseJson.user.birthdate[2] + responseJson.user.birthdate[3]

      let groupName = await getGroupName(responseJson.user.school_unit_id)

      this.setState({
        userName: responseJson.user.user_name,
        userDob: str,
        userCountry: responseJson.user.country,
        userGender: responseJson.user.gender,
        userRace: responseJson.user.race,
        userGroup: responseJson.user.school_unit_id,
        userIdCode: responseJson.user.identification_code,
        userEmail: responseJson.user.email,
        isProfessional: responseJson.user.is_professional,
        userRiskGroup: responseJson.user.risk_group,
        userState: responseJson.user.state,
        userCity: responseJson.user.city,
        userGroupName: groupName,


        initValueCity: "Selecionar",
        initValueGroup: "Selecionar",
        initValueCategory: "Selecionar",
        initValueSchoolLocation: "Selecionar",
        initValueEducationLevel: "Selecionar",
      })
    })
  }

  showUserModal = async () => {
    if (this.state.userGroup) {
      await this.setState({ groupCheckbox: true })
    } else {
      await this.setState({ groupCheckbox: false })
    }
    await this.setState({ modalVisibleUser: true })
  }

  handleCancel = async () => {
    await this.setState({ modalVisibleUser: false })
    await this.getAllUserInfos()
    await this.setState({ userSelect: this.state.userName, userIdSelect: this.state.userIdCode })
  }

  handleEdit = async () => {
    await this.setState({ modalVisibleUser: false })
    await this.setState({ userName: this.state.userSelect})
    if (this.state.groupCheckbox === false) {
      await this.setState({ userGroup: null, userIdCode: null, userGroupName: null, userIdSelect: null })
    }
    await this.editUser()
  }

  loadHouseholdInfo = async (household) => {
    // Trata a data de nascimento do household para o formato apropriado
    let householdBirthdate = household.birthdate.split('-');
    householdBirthdate = householdBirthdate[2] + '-' + householdBirthdate[1] + '-' + householdBirthdate[0];
    
    this.setState({
      // atributos do household
      householdID: household.id,
      householdName: household.description,
      householdDob: householdBirthdate,
      householdCountry: household.country,
      householdGender: household.gender,
      householdRace: household.race,
      kinship: household.kinship,
      householdIdCode: null,
      householdGroup: null,
      householdGroupName: null,
      householdRiskGroup: household.risk_group,
      
      // variaveis logicas
      groupCheckbox: false,
      householdNewInst: true,

      // variaveis iniciais
      householdSchoolLocation: null,
      householdEducationLevel: null,
      householdCategory: null
    });
    if (household.school_unit_id) {
      let householdGroupName = await getGroupName(household.school_unit_id);
      this.setState({
        householdIdCode: household.identification_code,
        householdGroup: household.school_unit_id,
        householdGroupName: householdGroupName,
        groupCheckbox: true,
        householdNewInst: false,
      });
    }
  }

  loadUserInfo = async () => {
    this.setState({
      groupCheckbox: false,
      userNewInst: true,
      userSchoolLocation: null,
      userEducationLevel: null,
      userCategory: null
    })
    if (this.state.userGroup) {
      this.setState({
        groupCheckbox: true,
        userNewInst: false,
      })
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const householdsData = this.state.dataSource

    return (
      <View style={styles.container}>

        <Modal //Modal View for household
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleHousehold}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisibleHousehold) //Exit to modal view
          }}>
          <View style={styles.modalView}>
            <View style={{ paddingTop: 10 }}></View>
            <View style={styles.viewCommom}>
              <Text style={styles.commomText}>{translate("register.name")}</Text>
              <TextInput style={styles.formInput}
                value={this.state.householdName}
                onChangeText={text => this.setState({ householdName: text })}
              />
            </View>

            <View style={styles.viewRow}>
              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                <ModalSelector
                  initValueTextStyle={{ color: 'black' }}
                  style={{ width: '80%', height: '70%' }}
                  data={gender}
                  initValue={this.state.householdGender}
                  onChange={(option) => this.setState({ householdGender: option.key })}
                />
              </View>

              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                <ModalSelector
                  initValueTextStyle={{ color: 'black' }}
                  style={{ width: '80%', height: '70%' }}
                  data={race}
                  initValue={this.state.householdRace}
                  onChange={(option) => this.setState({ householdRace: option.key })}
                />
              </View>

            </View>

            <View style={styles.viewRow}>
              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>Nascimento:</Text>
                <DatePicker
                  style={{ width: '80%', height: scale(32), borderRadius: 5, borderWidth: 1, borderColor: 'rgba(0,0,0,0.11)' }}
                  showIcon={false}
                  date={this.state.householdDob}
                  androidMode='spinner'
                  locale={'pt-BR'}
                  mode="date"
                  placeholder={translate("birthDetails.format")}
                  format="DD-MM-YYYY"
                  minDate="01-01-1918"
                  maxDate={today}
                  confirmBtnText={translate("birthDetails.confirmButton")}
                  cancelBtnText={translate("birthDetails.cancelButton")}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0
                    },
                    dateText: {
                      justifyContent: "center",
                      fontFamily: 'roboto',
                      fontSize: 17
                    },
                    placeholderText: {
                      justifyContent: "center",
                      fontFamily: 'roboto',
                      fontSize: 15,
                      color: 'black'
                    }
                  }}
                  onDateChange={date => this.setState({ householdDob: date })}
                />
              </View>

              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{translate("register.country")}</Text>
                <ModalSelector
                  initValueTextStyle={{ color: 'black' }}
                  style={{ width: '80%', height: '70%' }}
                  data={country}
                  initValue={this.state.householdCountry}
                  onChange={(option) => this.setState({ householdCountry: option.key })}
                />
              </View>
            </View>

            <View style={styles.viewCommom}>
              <Text style={styles.commomText}>Parentesco:</Text>
              <ModalSelector
                initValueTextStyle={{ color: 'black' }}
                style={{ width: '90%', height: '70%' }}
                data={household}
                initValue={this.state.kinship}
                onChange={(option) => this.setState({ kinship: option.key })}
              />
            </View>

            <View style={this.CheckBoxStyle}>
              <CheckBox
                  title={"Faz parte do Grupo de Risco?"}
                  checked={this.state.householdRiskGroup}
                  containerStyle={styles.CheckBoxStyle}
                  size={scale(16)}
                  onPress={() => {
                      this.setState({ householdRiskGroup: !this.state.householdRiskGroup })
                  }}
              />
            </View>

            <View>
              <CheckBox
                title={"É integrante de alguma instituição de Ensino?"}
                containerStyle={styles.CheckBoxStyle}
                size={scale(16)}
                checked={this.state.groupCheckbox}
                onPress={() => { this.setState({ groupCheckbox: !this.state.groupCheckbox }) }}
              />
            </View>
            {this.state.groupCheckbox && this.state.householdNewInst?
              <View>
                <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>Categoria:</Text>
                        <ModalSelector
                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                            style={{ width: '80%', height: '70%' }}
                            data={schoolCategory}
                            initValue={this.state.initValueCategory}
                            onChange={(option) => this.setState({ householdCategory: option.key, initValueCategory: option.label, householdEducationLevel: null })}
                            />
                    </View>
                    {this.state.householdCategory == "UNB" ?
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Faculdade:</Text>
                            <ModalSelector
                                initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                style={{ width: '80%', height: '70%' }}
                                data={getGroups("UNB", "", "")}
                                initValue={this.state.initValueGroup}
                                onChange={async (option) => {
                                    await this.setState({ householdGroup: option.key, initValueGroup: option.label })
                                }}
                                />
                        </View>
                        : this.state.householdCategory == "SES-DF" ?
                        <View style={styles.viewChildSexoRaca}>
                          <Text style={styles.commomTextView}>Nivel de Ensino:</Text>
                          <ModalSelector
                              initValueTextStyle={{ color: 'black', fontSize: 10 }}
                              style={{ width: '80%', height: '70%' }}
                              data={educationLevel}
                              initValue={this.state.initValueEducationLevel}
                              onChange={(option) => this.setState({ householdEducationLevel: option.key, initValueEducationLevel: option.label })}
                              />
                        </View>
                        : null}
                </View>
                {this.state.householdEducationLevel != null ?
                  <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                      <Text style={styles.commomTextView}>Região:</Text>
                        <ModalSelector
                          initValueTextStyle={{ color: 'black', fontSize: 10 }}
                          style={{ width: '80%', height: '70%' }}
                          data={schoolLocation}
                          initValue={this.state.initValueSchoolLocation}
                          onChange={(option) => this.setState({ householdSchoolLocation: option.key, initValueSchoolLocation: option.label })}
                        />
                    </View>
                    {this.state.householdSchoolLocation != null ?
                      <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>Unidade:</Text>
                          <ModalSelector
                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                            style={{ width: '80%', height: '70%' }}
                            data={getGroups("SES-DF", this.state.householdEducationLevel, this.state.householdSchoolLocation)}
                            initValue={this.state.initValueGroup}
                            onChange={async (option) => {
                              await this.setState({ householdGroup: option.key, initValueGroup: option.label })
                            }}
                          />
                      </View>
                      : null}
                  </View>
                  : this.state.householdGroup != null && this.state.householdCategory == "UNB"?
                  <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                      <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                      <TextInput style={styles.formInput50}
                        returnKeyType='done'
                        keyboardType='number-pad'
                        value={this.state.householdIdCode}
                        onChangeText={async (text) => {
                          await this.setState({ householdIdCode: text })
                        }}
                      />
                    </View>
                  </View>
                  : null}
              </View>
            : null}
              {this.state.groupCheckbox && !this.state.householdNewInst ?
                <View style={styles.viewRow}>
                  <View style={styles.viewChildSexoRaca}>
                    <Text style={styles.commomTextView}>Instituição:</Text>
                    <ModalSelector
                      initValueTextStyle={{ color: 'black', fontSize: 10 }}
                      style={{ width: '80%', height: '70%' }}
                      data={[{key: this.state.householdGroup, label: this.state.householdGroupName}]}
                      initValue={this.state.householdGroupName}
                      onChange={(option) => this.setState({ householdGroup: option.key, householdGroupName: option.label })}
                    />
                  </View>
                  {this.state.householdIdCode ?
                  <View style={styles.viewChildSexoRaca}>
                    <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                    <TextInput style={styles.formInput50}
                      returnKeyType='done'
                      keyboardType='number-pad'
                      value={this.state.householdIdCode}
                      onChangeText={text => this.setState({ householdIdCode: text })}
                    />
                  </View>
                  : null}
                </View>
              : null}

            <View style={styles.buttonView}>
              <Button
                title="Salvar"
                color="#348EAC"
                onPress={() => {
                  this.avatarHouseholdSelector()
                  this.setModalVisible(!this.state.modalVisibleHousehold)
                }} />
              <View style={{ margin: 5 }}></View>
              <Button
                title="Cancelar"
                color="#348EAC"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisibleHousehold)
                }} />
              {this.state.groupCheckbox && !this.state.householdNewInst ?
              <View>
              <View style={{ margin: 5 }}></View>
              <Button
                title="Editar instituição"
                color="#348EAC"
                onPress={() => {
                  this.setState({
                    householdNewInst: true,
                    householdIdCode: null
                  })
                }}
              />
              </View>
              : null}
            </View>
          </View>
        </Modal>

        <Modal //Modal view for User
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleUser}
          onRequestClose={this.handleCancel}
          propagateSwipe={true}>
          <ScrollView>
            <View style={styles.modalView}>
              <View style={styles.viewCommom, { paddingBottom: 0, marginBottom: 0 }}>
                <Text style={styles.commomText}>Email:</Text>
                <Text style={{ color: 'gray', fontSize: 17, textAlign: "center" }}>{this.state.userEmail}</Text>
              </View>

              <View style={styles.viewCommom}>
                <Text style={styles.commomText}>{translate("register.name")}</Text>
                <TextInput style={styles.formInput}
                  value={this.state.userSelect}
                  onChangeText={text => this.setState({ userSelect: text })}
                />
              </View>

              <View style={styles.viewRow}>
                <View style={styles.viewChildSexoRaca}>
                  <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                  <ModalSelector
                    initValueTextStyle={{ color: 'black' }}
                    style={{ width: '80%', height: '70%' }}
                    data={gender}
                    initValue={this.state.userGender}
                    onChange={(option) => this.setState({ userGender: option.key })}
                  />
                </View>

                <View style={styles.viewChildSexoRaca}>
                  <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                  <ModalSelector
                    initValueTextStyle={{ color: 'black' }}
                    style={{ width: '80%', height: '70%' }}
                    data={race}
                    initValue={this.state.userRace}
                    onChange={(option) => this.setState({ userRace: option.key })}
                  />
                </View>

              </View>

              <View style={styles.viewRow}>
                <View style={styles.viewChildSexoRaca}>
                  <Text style={styles.commomTextView}>Nascimento:</Text>
                  <DatePicker
                    style={{ width: '80%', height: scale(32), borderRadius: 5, borderWidth: 1, borderColor: 'lightgray' }}
                    showIcon={false}
                    date={this.state.userDob}
                    androidMode='spinner'
                    locale={'pt-BR'}
                    mode="date"
                    placeholder={this.state.userDob}
                    format="DD-MM-YYYY"
                    minDate="01-01-1918"
                    maxDate={today}
                    confirmBtnText={translate("birthDetails.confirmButton")}
                    cancelBtnText={translate("birthDetails.cancelButton")}
                    customStyles={{
                      dateInput: {
                        borderWidth: 0
                      },
                      dateText: {
                        justifyContent: "center",
                        fontFamily: 'roboto',
                        fontSize: 17
                      },
                      placeholderText: {
                        justifyContent: "center",
                        fontFamily: 'roboto',
                        fontSize: 15,
                        color: 'black'
                      }
                    }}
                    onDateChange={date => this.setState({ userDob: date })}
                  />
                </View>

                <View style={styles.viewChildSexoRaca}>
                  <Text style={styles.commomTextView}>País de Origem:</Text>
                  <Text style={styles.textBornCountry}>{this.state.userCountry}</Text>
                </View>
              </View>

              {this.state.userCountry == "Brazil" ?
                <View style={styles.viewRow}>
                  <View style={styles.viewChildSexoRaca}>
                    <Text style={styles.commomTextView}>Estado:</Text>
                    <ModalSelector
                      initValueTextStyle={{ color: 'black', fontSize: 14 }}
                      style={{ width: '80%', height: '70%' }}
                      data={state}
                      initValue={this.state.userState}
                      onChange={(option) => this.setState({ userState: option.key })}
                    />
                  </View>

                  <View style={styles.viewChildSexoRaca}>
                    <Text style={styles.commomTextView}>Cidade:</Text>
                    <ModalSelector
                      initValueTextStyle={{ color: 'black', fontSize: 14 }}
                      style={{ width: '80%', height: '70%' }}
                      data={getCity(this.state.userState)}
                      initValue={this.state.userCity}
                      onModalClose={(option) => this.setState({ userCity: option.key, initValueCity: option.key })}
                    />
                  </View>
                </View>
                : null}
                <View style={this.CheckBoxStyle}>
                  <CheckBox
                      title={"Faz parte do Grupo de Risco?"}
                      checked={this.state.userRiskGroup}
                      containerStyle={styles.CheckBoxStyle}
                      size={scale(16)}
                      onPress={() => {
                          this.setState({ userRiskGroup: !this.state.userRiskGroup })
                      }}
                  />
                </View>

            <View>
              <CheckBox
                title={"É integrante de alguma instituição de Ensino?"}
                containerStyle={styles.CheckBoxStyle}
                size={scale(16)}
                checked={this.state.groupCheckbox}
                onPress={() => { this.setState({ groupCheckbox: !this.state.groupCheckbox }) }}
              />
            </View>
            {this.state.groupCheckbox && this.state.userNewInst?
              <View>
                <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>Categoria:</Text>
                        <ModalSelector
                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                            style={{ width: '80%', height: '70%' }}
                            data={schoolCategory}
                            initValue={this.state.initValueCategory}
                            onChange={(option) => this.setState({ userCategory: option.key, initValueCategory: option.label, userEducationLevel: null })}
                            />
                    </View>
                    {this.state.userCategory == "UNB" ?
                        <View style={styles.viewChildSexoRaca}>
                            <Text style={styles.commomTextView}>Faculdade:</Text>
                            <ModalSelector
                                initValueTextStyle={{ color: 'black', fontSize: 10 }}
                                style={{ width: '80%', height: '70%' }}
                                data={getGroups("UNB", "", "")}
                                initValue={this.state.userGroupName}
                                onChange={async (option) => {
                                    await this.setState({ userGroup: option.key, userGroupName: option.label })
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
                          onChange={(option) => this.setState({ userSchoolLocation: option.key, initValueSchoolLocation: option.label })}
                        />
                    </View>
                    {this.state.userSchoolLocation != null ?
                      <View style={styles.viewChildSexoRaca}>
                        <Text style={styles.commomTextView}>Unidade:</Text>
                          <ModalSelector
                            initValueTextStyle={{ color: 'black', fontSize: 10 }}
                            style={{ width: '80%', height: '70%' }}
                            data={getGroups("SES-DF", this.state.userEducationLevel, this.state.userSchoolLocation)}
                            initValue={this.state.userGroupName}
                            onChange={async (option) => {
                              await this.setState({ userGroup: option.key, userGroupName: option.label })
                            }}
                          />
                      </View>
                      : null}
                  </View>
                  : this.state.userGroup != null && this.state.userCategory == "UNB"?
                  <View style={styles.viewRow}>
                    <View style={styles.viewChildSexoRaca}>
                      <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                      <TextInput style={styles.formInput50}
                        returnKeyType='done'
                        keyboardType='number-pad'
                        value={this.state.userIdCode}
                        onChangeText={async (text) => {
                          await this.setState({ userIdCode: text })
                        }}
                      />
                    </View>
                  </View>
                  : null}
              </View>
            : null}
              {this.state.groupCheckbox && !this.state.userNewInst ?
                <View style={styles.viewRow}>
                  <View style={styles.viewChildSexoRaca}>
                    <Text style={styles.commomTextView}>Instituição:</Text>
                    <ModalSelector
                      initValueTextStyle={{ color: 'black', fontSize: 10 }}
                      style={{ width: '80%', height: '70%' }}
                      data={[{key: this.state.userGroup, label: this.state.userGroupName}]}
                      initValue={this.state.userGroupName}
                      onChange={(option) => this.setState({ userGroup: option.key, userGroupName: option.label })}
                    />
                  </View>
                  {this.state.userIdCode ?
                  <View style={styles.viewChildSexoRaca}>
                    <Text style={styles.commomTextView}>Nº de Identificação:</Text>
                    <TextInput style={styles.formInput50}
                      returnKeyType='done'
                      keyboardType='number-pad'
                      value={this.state.userIdCode}
                      onChangeText={text => this.setState({ userIdCode: text })}
                    />
                  </View>
                  : null}
                </View>
              : null}

              <View style={styles.buttonView}>
                <Button
                  title="Salvar"
                  color="#348EAC"
                  onPress={async () => {
                    await this.handleEdit()
                  }} />
                <View style={{ margin: 5 }}></View>
                <Button
                  title="Cancelar"
                  color="#348EAC"
                  onPress={() => {
                    this.handleCancel()
                  }} />
                {this.state.groupCheckbox && !this.state.userNewInst ?
                <View>
                <View style={{ margin: 5 }}></View>
                <Button
                  title="Editar instituição"
                  color="#348EAC"
                  onPress={() => {
                    this.setState({
                      userNewInst: true,
                      userIdCode: null
                    })
                  }}
                />
                </View>
                : null}
              </View>
            </View>
          </ScrollView>
        </Modal>

        <View style={styles.viewTop}>
          <View style={styles.userAvatar}>
            <Avatar
              size="large"
              rounded
              source={Imagem[this.state.userAvatar]}
              activeOpacity={0.7}
            />
          </View>
          <View style={styles.userInfos}>
            <Text style={styles.userName}>
              {this.state.userName}
            </Text>
            <View style={{ paddingLeft: 20, justifyContent: 'center' }}>
              <View style={styles.viewButtons}>
                <TouchableOpacity
                  onPress={ () => {
                    this.loadUserInfo()
                    this.showUserModal()
                  }
                }>
                  <FontAwesome name="edit" size={scale(25)} color='rgba(255, 255, 255, 1)' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ alignSelf: 'center', marginRight: 10 }}>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>{translate("profiles.households")}</Text>
        </View>
        <ScrollView>
          {householdsData != null ?
            householdsData.map((household, key) => {
              return (
                <View style={styles.viewHousehold} key={key}>
                  <Avatar
                    size="large"
                    rounded
                    source={Imagem[household.picture]}
                    activeOpacity={0.7}
                  />
                  <View style={{ flexDirection: 'column', marginLeft: 10, width: scale(220) }}>
                    <Text style={styles.householdName}>{household.description}</Text>
                    <Text style={styles.householdKinship}>{household.kinship}</Text>
                  </View>
                  <View style={styles.viewButtons}>
                    <TouchableOpacity onPress={async () => {
                      this.loadHouseholdInfo(household);
                      this.setModalVisible(true);
                    }}>
                      <FontAwesome name="edit" size={scale(25)} color='rgba(22, 107, 135, 1)' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      this.setState({ householdID: household.id })
                      this.confirmDelete()
                    }}>
                      <FontAwesome name="trash" size={scale(25)} color='rgba(22, 107, 135, 1)' />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
            : null}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewTop: {
    height: scale(95),
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#2298BF',
    borderColor: 'red',
    //marginBottom: 2,
    //borderWidth: 1,
  },
  userAvatar: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  userInfos: {
    marginRight: scale(80),
    borderColor: 'green',
    //borderWidth: 1,
    flexDirection: 'row'
  },
  userName: {
    fontFamily: 'roboto',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
    width: '70%'
  },
  userDobText: {
    fontFamily: 'roboto',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  userDob: {
    fontFamily: 'roboto',
    fontSize: 14,
    color: 'white'
  },
  viewHousehold: {
    justifyContent: 'space-between',
    margin: 2,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 7,
    backgroundColor: 'rgba(22, 107, 135, 0.15)',
  },
  householdName: {
    fontFamily: 'roboto',
    fontWeight: 'bold',
    color: '#348EAC',
    fontSize: 20,
  },
  householdKinship: {
    fontFamily: 'roboto',
    fontSize: 14,
  },
  viewButtons: {
    justifyContent: 'space-between',
    padding: 5,
  },
  modalView: {
    paddingTop: 30,
    paddingBottom: 30,
    alignSelf: 'center',
    width: '93%',
    //height: '60%',
    //padding: 15,
    marginTop: '15%',
    marginBottom: '15%',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 15,
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
  buttonView: {
    width: "60%",
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  textCountry: {
    fontSize: 15,
    fontFamily: 'roboto',
  },
  textBornCountry: {
    width: '80%',
    height: '60%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 17,
    color: 'gray'
  }
})

export default Perfil
