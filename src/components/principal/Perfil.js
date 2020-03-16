import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, ScrollView, TouchableOpacity, NetInfo, Alert, Modal, Button, Picker, TextInput } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale } from '../scallingUtils';
import CountryPicker from 'react-native-country-picker-modal';
import DatePicker from 'react-native-datepicker';
import { API_URL } from '../../constUtils';
import translate from '../../../locales/i18n';
import ModalSelector from 'react-native-modal-selector';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = y + "-" + m + "-" + d;

class Perfil extends Component {
  static navigationOptions = {
    title: "Perfil"
  }
  constructor(props) {
    super(props);
    this._getInfos();
    this.state = {
      modalVisibleHousehold: false,
      modalVisibleUser: false,
      cca2: 'BR',
    };
  }

  setModalVisible(visible) {
    if (this.state.userModal == true) {
      this.setState({ modalVisibleUser: visible });
    } else {
      this.setState({ modalVisibleHousehold: visible });
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
    );
  }

  _getInfos = async () => { //Ger user infos
    let userName = await AsyncStorage.getItem('userName');
    let userID = await AsyncStorage.getItem('userID');
    let userToken = await AsyncStorage.getItem('userToken');
    let userAvatar = await AsyncStorage.getItem('userAvatar')
    this.setState({ userName, userID, userToken, userAvatar });
    this.setState({ userSelect: this.state.userName });
    this.getHouseholds();
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
      this.getHouseholds();
    })
  }

  avatarHouseholdSelector = async () => {
    if (this.state.householdGender == "Masculino") {
      switch (this.state.kinship) {
        case "Pai":
          await this.setState({ picture: "Father" });
          break;
        case "Mãe":
          await this.setState({ picture: "Mother" });
          break;
        case "conjuge":
          await this.setState({ picture: "Father" });
          break;
        case "Avós":
          await this.setState({ picture: "Grandfather" });
          break;
        case "Filhos":
          await this.setState({ picture: "Son" });
          break;
        case "Irmãos":
          await this.setState({ picture: "Brother" });
          break;
      }
    } else {
      switch (this.state.kinship) {
        case "Mãe":
          await this.setState({ picture: "Mother" });
          break;
        case "Pai":
          await this.setState({ picture: "Father" });
          break;
        case "conjuge":
          await this.setState({ picture: "Mother" });
          break;
        case "Avós":
          await this.setState({ picture: "Grandmother" });
          break;
        case "Filhos":
          await this.setState({ picture: "Daughter" });
          break;
        case "Irmãos":
          await this.setState({ picture: "Sister" });
          break;
      }
    }

    this.editHousehold();
  }

  editHousehold = () => {
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
          picture: this.state.picture
        }
      )
    })
      .then((response) => {
        if (response.status == 200) {
          console.warn(response.status)
          this.getHouseholds();
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
          country: this.state.userCountry,
          gender: this.state.userGender,
          race: this.state.userRace
        }
      )
    })
      .then((response) => {
        if (response.status == 200) {
          console.warn(response.status)
          //this.getHouseholds();
        } else {
          console.warn(response.status)

        }
      })
  }

  getAllUserInfos = () => {
    return fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `${this.state.userToken}`
      }
    }).then((response) => {
      if (response.status == 200) {
        console.warn(response.status)
        return response.json()
      } else {
        alert("Algo deu errado");
      }
    }).then((responseJson) => {
      console.warn(responseJson)
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const householdsData = this.state.dataSource;

    const gender = [
      { key: 'Masculino', label: translate("genderChoices.male") },
      { key: 'Femenino', label: translate("genderChoices.female") },
    ];

    const race = [
      { key: 'Blanco', label: translate("raceChoices.white") },
      { key: 'Indígena', label: translate("raceChoices.indian") },
      { key: 'Mestizo', label: translate("raceChoices.mix") },
      { key: 'Negro, mulato o afrodescendiente', label: translate("raceChoices.black") },
      { key: 'Palenquero', label: translate("raceChoices.palenquero") },
      { key: 'Raizal', label: translate("raceChoices.raizal") },
      { key: 'Rom-Gitano', label: translate("raceChoices.romGitano") }
    ];

    const household = [
      { key: 'Pai', label: "Pai" },
      { key: 'Mãe', label: "Mãe" },
      { key: 'Filhos', label: "Filhos" },
      { key: 'Irmaãos', label: "Irmãos" },
      { key: 'Avós', label: "Avós" },
      { key: 'Outros', label: "Outros" }
    ];

    return (
      <View style={styles.container}>
        <Modal //Modal View for User
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleUser}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisibleUser); //Exit to modal view
            this.setState({ userModal: false });
          }}>
          <View style={styles.modalView}>
            <View style={{ paddingTop: 10 }}></View>
            <View style={styles.viewCommom}>
              <Text style={styles.commomText}>{translate("register.name")}</Text>
              <TextInput style={styles.formInput}
                placeholder={this.state.userName}
                onChangeText={text => this.setState({ userName: text })}
              />
            </View>

            <View style={styles.viewRow}>
              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                <ModalSelector
                  style={{ width: '80%', height: '70%' }}
                  data={gender}
                  initValue={translate("genderChoices.male")}
                  onChange={(option) => this.setState({ householdGender: option.key })}
                />
              </View>

              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                <ModalSelector
                  style={{ width: '80%', height: '70%' }}
                  data={race}
                  initValue={translate("raceChoices.white")}
                  onChange={(option) => this.setState({ householdRace: option.key })}
                />
              </View>

            </View>

            <View style={styles.viewRow}>
              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>Nascimento</Text>
                <DatePicker
                  style={{ width: '80%', height: scale(25), backgroundColor: 'rgba(135, 150, 151, 0.55)', borderRadius: 20, marginTop: 5 }}
                  showIcon={false}
                  date={this.state.userDob}
                  androidMode='spinner'
                  mode="date"
                  placeholder={translate("birthDetails.format")}
                  format="YYYY-MM-DD"
                  minDate="1918-01-01"
                  maxDate={today}
                  confirmBtnText={translate("birthDetails.confirmButton")}
                  cancelBtnText={translate("birthDetails.cancelButton")}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0
                    },
                    dateText: {
                      marginBottom: 10,
                      fontFamily: 'roboto',
                      fontSize: 17
                    },
                    placeholderText: {
                      marginBottom: 15,
                      fontFamily: 'roboto',
                      fontSize: 15,
                      color: 'black'
                    }
                  }}
                  onDateChange={date => this.setState({ userDob: date })}
                />
              </View>

              <View style={styles.viewChildPais}>
                <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>{translate("register.country")}</Text></View>
                <View>
                  <CountryPicker
                    onChange={value => {
                      this.setState({ cca2: value.cca2, userCountry: value.name })
                    }}
                    cca2={this.state.cca2}
                    translation="eng"
                  />
                  <Text style={styles.textCountry}>{this.state.userCountry}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="editar"
                color="#348EAC"
                onPress={() => {
                  this.editUser();
                  this.setState({ userModal: false });
                  this.setModalVisible(!this.state.modalVisibleUser);
                }} />
            </View>
          </View>
        </Modal>
        <Modal //Modal View for household
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleHousehold}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisibleHousehold); //Exit to modal view
          }}>
          <View style={styles.modalView}>
            <View style={{ paddingTop: 10 }}></View>
            <View style={styles.viewCommom}>
              <Text style={styles.commomText}>{translate("register.name")}</Text>
              <TextInput style={styles.formInput}
                placeholder={this.state.householdName}
                onChangeText={text => this.setState({ householdName: text })}
              />
            </View>

            <View style={styles.viewRow}>
              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{translate("register.gender")}</Text>
                <ModalSelector
                  style={{ width: '80%', height: '70%' }}
                  data={gender}
                  initValue={translate("genderChoices.male")}
                  onChange={(option) => this.setState({ householdGender: option.key })}
                />
              </View>

              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>{translate("register.race")}</Text>
                <ModalSelector
                  style={{ width: '80%', height: '70%' }}
                  data={race}
                  initValue={translate("raceChoices.white")}
                  onChange={(option) => this.setState({ householdRace: option.key })}
                />
              </View>

            </View>

            <View style={styles.viewRow}>
              <View style={styles.viewChildSexoRaca}>
                <Text style={styles.commomTextView}>Nascimento</Text>
                <DatePicker
                  style={{ width: '80%', height: scale(25), backgroundColor: 'rgba(135, 150, 151, 0.55)', borderRadius: 20, marginTop: 5 }}
                  showIcon={false}
                  date={this.state.householdDob}
                  androidMode='spinner'
                  mode="date"
                  placeholder={translate("birthDetails.format")}
                  format="YYYY-MM-DD"
                  minDate="1918-01-01"
                  maxDate={today}
                  confirmBtnText={translate("birthDetails.confirmButton")}
                  cancelBtnText={translate("birthDetails.cancelButton")}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0
                    },
                    dateText: {
                      marginBottom: 10,
                      fontFamily: 'roboto',
                      fontSize: 17
                    },
                    placeholderText: {
                      marginBottom: 15,
                      fontFamily: 'roboto',
                      fontSize: 15,
                      color: 'black'
                    }
                  }}
                  onDateChange={date => this.setState({ householdDob: date })}
                />
              </View>

              <View style={styles.viewChildPais}>
                <View style={{ marginRight: '10%' }} ><Text style={styles.commomTextView}>{translate("register.country")}</Text></View>
                <View>
                  <CountryPicker
                    onChange={value => {
                      this.setState({ cca2: value.cca2, householdCountry: value.name })
                    }}
                    cca2={this.state.cca2}
                    translation="eng"
                  />
                  <Text style={styles.textCountry}>{this.state.householdCountry}</Text>
                </View>
              </View>
            </View>

            <View style={styles.viewCommom}>
              <Text style={styles.commomText}>Parentesco:</Text>
              <ModalSelector
                style={{ width: '95%', height: '70%' }}
                data={household}
                initValue={this.state.kinship}
                onChange={(option) => this.setState({ kinship: option.key })}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="editar"
                color="#348EAC"
                onPress={() => {
                  this.avatarHouseholdSelector();
                  this.setModalVisible(!this.state.modalVisibleHousehold);
                }} />
            </View>
          </View>
        </Modal>
        <View style={styles.viewTop}>
          <View style={styles.userAvatar}>
            <Avatar
              large
              rounded
              source={Imagem[this.state.userAvatar]}
              activeOpacity={0.7}
            />
          </View>
          <View style={styles.userInfos}>
            <Text style={styles.userName}>
              {this.state.userName}
            </Text>
            {/*<View style={{ flexDirection: 'row' }}>
              <Text style={styles.userDobText}>
                Idade:
                            </Text>
              <Text style={styles.userDob}>
                35 anos
                            </Text>
              </View>*/}
          </View>
          <View style={{ alignSelf: 'center', marginRight: 10 }}>
            {/*<TouchableOpacity onPress={async () => {
              await this.setState({ userModal: true })
              this.getAllUserInfos();
              //await this.setState({
              //householdID: household.id,
              //householdName: household.description,
              //householdDob: household.birthdate,
              //householdCountry: household.country,
              //householdGender: household.gender,
              //householdRace: household.race,
              //kinship: household.kinship
              //})

              this.setModalVisible(true)
            }}>
              <FontAwesome name="edit" size={scale(25)} color='white' />
          </TouchableOpacity>*/}
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>{translate("profiles.households")}</Text>
        </View>
        <ScrollView>
          {householdsData != null ?
            householdsData.map(household => {
              return (
                <View style={styles.viewHousehold}>
                  <Avatar
                    large
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
                      await this.setState({
                        householdID: household.id,
                        householdName: household.description,
                        householdDob: household.birthdate,
                        householdCountry: household.country,
                        householdGender: household.gender,
                        householdRace: household.race,
                        kinship: household.kinship
                      });
                      this.setModalVisible(true);
                    }}>
                      <FontAwesome name="edit" size={scale(25)} color='rgba(22, 107, 135, 1)' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      this.setState({ householdID: household.id });
                      this.confirmDelete();
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
    );
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
  },
  userName: {
    fontFamily: 'roboto',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
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
    alignSelf: 'center',
    width: '93%',
    //height: '60%',
    //padding: 15,
    marginTop: '35%',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
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
  }
});

export default Perfil;
