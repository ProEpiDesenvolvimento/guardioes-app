import React, {Component} from 'react';
import {View, StyleSheet, Alert, Modal, Platform} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Delete} from './styles';
import {
  ModalContainer,
  ModalBox,
  ModalTitle,
  ModalText,
  Button,
  ModalButton,
  ModalButtonText,
} from '../../styled/NormalForms';
import {
  Container,
  KeyboardScrollView,
  FormInline,
  FormLabel,
  NormalInput,
  FormGroup,
  FormGroupChild,
} from '../../styled/NormalForms';
import {
  Selector,
  DateSelector,
  ReadOnlyInput,
  FormInlineCheck,
  CheckBoxStyled,
  CheckLabel,
  SendContainer,
  SendText,
} from '../../styled/NormalForms';

import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import {scale} from '../../../utils/scallingUtils';
import {API_URL} from 'react-native-dotenv';
import translate from '../../../../locales/i18n';
import {gender, country, race, household} from '../../../utils/selectorUtils';
import {state, getCity} from '../../../utils/brasil';
import {handleAvatar, getInitials} from '../../../utils/constUtils';
import InstitutionSelector from '../../userData/InstitutionSelector';
import LoadingModal from '../../userData/LoadingModal';

let data = new Date();
let d = data.getDate();
let m = data.getMonth() + 1;
let y = data.getFullYear();

let today = d + '-' + m + '-' + y;

Feather.loadFont();

class EditarPerfil extends Component {
  static navigationOptions = {
    title: translate('register.editProfile'),
  };
  constructor(props) {
    super(props);
    this.state = {
      isUser: null,
      householdID: 0,
      modalVisibleRiskGroup: false,
      Picture: 'default',
      IdCode: null,
      Group: null,
      paramsLoaded: false,
      showAlert: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {params} = this.props.navigation.state;

    await this.setState({
      isUser: params.isUser,
      originalName: params.data.Name,
    });

    await this.setState(params.data);
    this.setState({paramsLoaded: true});

    await this.getHouseholdAvatars();
    const userSelected = await AsyncStorage.getItem('userSelected');
    this.setState({userSelected});
  };

  getHouseholdAvatars = async () => {
    let householdAvatars = JSON.parse(
      await AsyncStorage.getItem('householdAvatars'),
    );

    if (!householdAvatars) {
      householdAvatars = {};
    }

    this.setState({householdAvatars});
  };

  handleEdit = async () => {
    if (this.state.Country !== 'Brazil') {
      this.setState({City: null, State: null});
    }

    if (this.state.isUser) {
      await this.editUser();
    } else {
      await this.editHousehold();
    }
  };

  changeAvatar = () => {
    const isUser = this.state.isUser;
    const householdID = this.state.householdID;
    let householdAvatars = this.state.householdAvatars;

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton === 'remove') {
        if (isUser) {
          AsyncStorage.removeItem('userAvatar');
        } else {
          householdAvatars[householdID] = null;
          AsyncStorage.setItem(
            'householdAvatars',
            JSON.stringify(householdAvatars),
          );
        }

        if (this.state.originalName === this.state.userSelected) {
          // Update locally to current user
          AsyncStorage.removeItem('avatarSelected');
        }

        this.setState({Avatar: null});
      } else {
        let source = response.uri;

        if (Platform.OS === 'android') {
          source = 'content://com.guardioesapp.provider/root' + response.path;
        }

        if (isUser) {
          AsyncStorage.setItem('userAvatar', source);
        } else {
          householdAvatars[householdID] = source;
          AsyncStorage.setItem(
            'householdAvatars',
            JSON.stringify(householdAvatars),
          );
        }

        if (this.state.originalName === this.state.userSelected) {
          // Update locally to current user
          AsyncStorage.setItem('avatarSelected', source);
        }

        this.setState({Avatar: source});
      }
    });
  };

  formatBirthAgain = birthDate => {
    let newDate = birthDate.split('-');
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[0];
    return newDate;
  };

  isUserDataValid = () => {
    if (this.state.Name == null || this.state.Name == '') {
      Alert.alert(translate('register.emptyName'));
      return false;
    } else if (
      this.state.Country == 'Brazil' &&
      (this.state.State == null || this.state.City == null)
    ) {
      Alert.alert(translate('register.localRequired'));
      return false;
    } else if (
      this.state.instituitionComponentError != null &&
      this.state.instituitionComponentError != undefined &&
      this.state.instituitionComponentError.length > 0
    ) {
      Alert.alert(this.state.instituitionComponentError);
      return false;
    } else if (this.state.Country == null) {
      Alert.alert(
        translate('registeer.nationalityRequired'),
        translate('register.nationalityRequired2'),
      );
      return false;
    }
    return true;
  };

  editUser = () => {
    if (!this.isUserDataValid()) {
      return;
    }
    this.setAlert(true);
    return fetch(`${API_URL}/users/${this.state.userID}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/json',
        Authorization: `${this.state.userToken}`,
      },
      body: JSON.stringify({
        user_name: this.state.Name,
        picture: this.state.Picture,
        birthdate: this.state.Birth,
        gender: this.state.Gender,
        race: this.state.Race,
        group_id: this.state.Group,
        identification_code: this.state.IdCode,
        risk_group: this.state.RiskGroup,
        country: this.state.Country,
        state: this.state.State,
        city: this.state.City,
        is_professional: this.state.isProfessional,
      }),
    }).then(response => {
      console.warn(response.status);
      this.setAlert(false);
      if (response.status == 200) {
        AsyncStorage.setItem('userName', this.state.Name);
        AsyncStorage.setItem(
          'userBirth',
          this.formatBirthAgain(this.state.Birth),
        );

        if (this.state.originalName === this.state.userSelected) {
          // Update locally to current user
          AsyncStorage.setItem('userSelected', this.state.Name);
          AsyncStorage.setItem(
            'birthSelected',
            this.formatBirthAgain(this.state.Birth),
          );
        }
        this.props.navigation.goBack();
      } else {
        Alert.alert('Ocorreu um erro, tente novamente depois.');
      }
    });
  };

  isHouseholdDataValid = () => {
    if (
      this.state.Name == null ||
      this.state.Name == '' ||
      this.state.Birth == null
    ) {
      Alert.alert(translate('register.nameRequired'));
      return false;
    } else if (this.state.Gender == null || this.state.Race == null) {
      Alert.alert(translate('register.genderRequired'));
      return false;
    } else if (this.state.Kinship == null) {
      Alert.alert(translate('register.kinshipRequired'));
      return false;
    } else if (
      this.state.instituitionComponentError != null &&
      this.state.instituitionComponentError != undefined &&
      this.state.instituitionComponentError.length > 0
    ) {
      Alert.alert(this.state.instituitionComponentError);
      return false;
    } else if (this.state.Country == null) {
      Alert.alert(
        translate('nationalityRequired'),
        translate('nationalityRequired2'),
      );
      return false;
    }
    return true;
  };

  editHousehold = () => {
    if (!this.isHouseholdDataValid()) {
      return;
    }
    this.setAlert(true);
    return fetch(
      `${API_URL}/users/${this.state.userID}/households/${
        this.state.householdID
      }`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/json',
          Authorization: `${this.state.userToken}`,
        },
        body: JSON.stringify({
          description: this.state.Name,
          picture: this.state.Picture,
          birthdate: this.state.Birth,
          gender: this.state.Gender,
          race: this.state.Race,
          group_id: this.state.Group,
          identification_code: this.state.IdCode,
          risk_group: this.state.RiskGroup,
          country: this.state.Country,
          kinship: this.state.Kinship,
        }),
      },
    ).then(response => {
      console.warn(response.status);
      this.setAlert(false);
      if (response.status == 200) {
        if (this.state.originalName === this.state.userSelected) {
          // Update locally to current user
          AsyncStorage.setItem('userSelected', this.state.Name);
          AsyncStorage.setItem(
            'birthSelected',
            this.formatBirthAgain(this.state.Birth),
          );
        }
        this.props.navigation.goBack();
      } else {
        Alert.alert(translate('register.geralError'));
      }
    });
  };

  setRiskGroupModalVisible(visible) {
    this.setState({modalVisibleRiskGroup: visible});
  }

  setAlert = show => {
    this.setState({
      showAlert: show,
    });
  };

  setInstitutionCallback = (IdCode, Group) => {
    this.setState({
      IdCode: IdCode,
      Group: Group,
    });
  };

  setInstituitionComponentError = error => {
    this.state.instituitionComponentError = error;
  };

  render() {
    const {isUser} = this.state;
    const {showAlert} = this.state;
    //console.log(this.state)

    return (
      <Container>
        <Modal //Modal View for Risk Group Message
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleRiskGroup}
          onRequestClose={() => {
            this.setRiskGroupModalVisible(!this.state.modalVisibleRiskGroup);
          }}>
          <ModalContainer>
            <ModalBox>
              <ModalTitle>{translate('register.riskGroupTitle')}</ModalTitle>

              <ModalText>{translate('register.riskGroupMessage')}</ModalText>

              <Button
                onPress={() => {
                  this.setRiskGroupModalVisible(
                    !this.state.modalVisibleRiskGroup,
                  );
                }}>
                <ModalButton>
                  <ModalButtonText>
                    {translate('register.riskGroupButton')}
                  </ModalButtonText>
                </ModalButton>
              </Button>
            </ModalBox>
          </ModalContainer>
        </Modal>
        <KeyboardScrollView>
          <FormInline>
            <Avatar
              size={scale(110)}
              source={handleAvatar(this.state.Avatar)}
              title={getInitials(this.state.Name)}
              activeOpacity={0.5}
              showEditButton
              rounded
              editButton={{
                name: 'camera',
                type: 'feather',
                color: '#ffffff',
                underlayColor: '#000000',
              }}
              onEditPress={() => this.changeAvatar()}
            />
            {!isUser && (
              <Delete onPress={() => this.confirmDelete()}>
                <Feather name="trash-2" size={scale(25)} color="#ffffff" />
              </Delete>
            )}
          </FormInline>

          {isUser ? (
            <FormInline>
              <FormLabel>{translate('register.email')}</FormLabel>
              <ReadOnlyInput>{this.state.Email}</ReadOnlyInput>
            </FormInline>
          ) : null}

          <FormInline>
            <FormLabel>{translate('register.name')}</FormLabel>
            <NormalInput
              value={this.state.Name}
              onChangeText={text => this.setState({Name: text})}
            />
          </FormInline>

          <FormGroup>
            <FormGroupChild>
              <FormLabel>{translate('register.gender')}</FormLabel>
              <Selector
                data={gender}
                initValue={this.state.Gender}
                cancelText={translate('selector.cancelButton')}
                onChange={option => this.setState({Gender: option.key})}
              />
            </FormGroupChild>

            <FormGroupChild>
              <FormLabel>{translate('register.race')}</FormLabel>
              <Selector
                data={race}
                initValue={this.state.Race}
                cancelText={translate('selector.cancelButton')}
                onChange={option => this.setState({Race: option.key})}
              />
            </FormGroupChild>
          </FormGroup>

          <FormGroup>
            <FormGroupChild>
              <FormLabel>{translate('register.birth')}</FormLabel>
              <DateSelector
                placeholder={translate('birthDetails.format')}
                date={this.state.Birth}
                format="DD-MM-YYYY"
                minDate="01-01-1918"
                maxDate={today}
                locale={'pt-BR'}
                confirmBtnText={translate('birthDetails.confirmButton')}
                cancelBtnText={translate('birthDetails.cancelButton')}
                onDateChange={date => this.setState({Birth: date})}
              />
            </FormGroupChild>

            <FormGroupChild>
              <FormLabel>{translate('register.country')}</FormLabel>
              <Selector
                data={country}
                initValue={this.state.Country}
                cancelText={translate('selector.cancelButton')}
                onChange={option => this.setState({Country: option.key})}
              />
            </FormGroupChild>
          </FormGroup>

          {this.state.Country == 'Brazil' && isUser ? (
            <FormGroup>
              <FormGroupChild>
                <FormLabel>Estado:</FormLabel>
                <Selector
                  data={state}
                  initValue={this.state.State}
                  cancelText={translate('selector.cancelButton')}
                  onChange={option => this.setState({State: option.key})}
                />
              </FormGroupChild>

              <FormGroupChild>
                <FormLabel>Cidade:</FormLabel>
                <Selector
                  data={getCity(this.state.State)}
                  initValue={this.state.City}
                  cancelText={translate('selector.cancelButton')}
                  onModalClose={option => this.setState({City: option.key})}
                />
              </FormGroupChild>
            </FormGroup>
          ) : null}

          {!isUser ? (
            <FormInline>
              <FormLabel>Parentesco:</FormLabel>
              <Selector
                data={household}
                initValue={this.state.Kinship}
                cancelText={translate('selector.cancelButton')}
                onChange={option => this.setState({Kinship: option.key})}
              />
            </FormInline>
          ) : null}

          <FormInlineCheck>
            <CheckBoxStyled
              title={translate('share.riskGroupLabel')}
              checked={this.state.RiskGroup}
              onPress={() => {
                this.setState({RiskGroup: !this.state.RiskGroup});
              }}
            />
            <CheckLabel
              onPress={() => {
                this.setRiskGroupModalVisible(true);
              }}>
              <Feather name="help-circle" size={scale(25)} color="#348EAC" />
            </CheckLabel>
          </FormInlineCheck>

          {this.state.paramsLoaded ? (
            <InstitutionSelector
              setUserInstitutionCallback={this.setInstitutionCallback}
              setAlert={this.setAlert}
              userGroup={this.state.Group}
              userIdCode={this.state.IdCode}
              setErrorCallback={this.setInstituitionComponentError}
            />
          ) : null}

          <Button onPress={async () => await this.handleEdit()}>
            <SendContainer>
              <SendText>Salvar</SendText>
            </SendContainer>
          </Button>
        </KeyboardScrollView>

        <LoadingModal show={showAlert} />
      </Container>
    );
  }

  confirmDelete = () => {
    Alert.alert(
      translate('register.confirmDeleteUser'),
      translate('register.confirmDeleteUser2'),
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteHousehold()},
      ],
      {cancelable: false},
    );
  };

  deleteHousehold = () => {
    return fetch(
      `${API_URL}/users/${this.state.userID}/households/${
        this.state.householdID
      }`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `${this.state.userToken}`,
        },
      },
    ).then(response => {
      console.warn(response.status);
      if (response.status == 204) {
        this.props.navigation.goBack();
      } else {
        Alert.alert(translate('register.geralError'));
      }
    });
  };
}

const options = {
  title: translate('register.selectImage'),
  takePhotoButtonTitle: translate('register.pickPhoto'),
  chooseFromLibraryButtonTitle: translate('register.library'),
  customButtons: [{name: 'remove', title: translate('register.removePhoto')}],
  noData: true,
  quality: 0.5,
  storageOptions: {
    skipBackup: true,
    path: 'gds',
  },
};

const styles = StyleSheet.create({
  Avatar: {
    borderColor: '#ffffff',
    borderWidth: 3,
  },
});

export default EditarPerfil;
