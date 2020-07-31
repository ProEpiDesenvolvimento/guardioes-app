import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { ScrollViewStyled, User, AvatarWrapper, InfoContainer, InfoWrapper, Name, Relation, ButtonsWrapper } from './styles';
import { HouseholdWrapper, HouseholdTitle, Household, HouseholdName, HouseholdRelation } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import * as Imagem from '../../../imgs/imageConst';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { getInitials } from '../../../utils/constUtils';
import { scale } from '../../../utils/scallingUtils';
import {API_URL} from 'react-native-dotenv';
import translate from '../../../../locales/i18n';
import { getGroupName } from '../../../utils/selectorUtils';
import InstitutionSelector from '../../userData/InstitutionSelector' 

Feather.loadFont();

const options = {
    title: 'Selecione imagem de Perfil',
    takePhotoButtonTitle: 'Tire uma foto',
    chooseFromLibraryButtonTitle: 'Selecione da Galeria',
    storageOptions: {
      skipBackup: true,
      path: 'gds',
    },
}; 

class Perfis extends Component {
    static navigationOptions = {
        title: "Perfis"
    }
    constructor(props) {
        super(props)
        this.fetchData()
        this.state = {
            modalVisibleHousehold: false,
            modalVisibleUser: false,
            userData: {},
            householdData: {}
        }
    }

    fetchData = async () => { //Get user info
        const userID = await AsyncStorage.getItem('userID')
        const userName = await AsyncStorage.getItem('userName')
        const userAvatar = await AsyncStorage.getItem('userAvatar')
        const userToken = await RNSecureStorage.get('userToken')

        this.setState({ userName, userID, userToken, userAvatar })
        await this.getAllUserInfos()
        this.getHouseholds()
    }

    getAllUserInfos = async () => {
        return fetch(`${API_URL}/users/${this.state.userID}`, {
            method: 'GET',
            headers: {
                Authorization: `${this.state.userToken}`
            }
        })
        .then((response) => {
            if (response.status == 200) {
                //console.warn(response.status)
                return response.json()
            } else {
                console.warn(response.status)
            }
        })
        .then(async (responseJson) => {
            // Trata userBirth no formato correto
            responseJson.user.birthdate = responseJson.user.birthdate.split('T', 1).toString()
            
            let birthDate = responseJson.user.birthdate.split('-')
            birthDate = birthDate[2] + '-' + birthDate[1] + '-' + birthDate[0]

            // Trata userGroupName no formato correto
            const groupName = await getGroupName(responseJson.user.school_unit_id)

            // Definindo variaveis logicas
            let groupCheckbox = false
            let NewInst = true
            let SchoolLocation = null
            let EducationLevel = null
            let Category = null

            if (responseJson.user.school_unit_id) {
                groupCheckbox = true
                NewInst = false
            }

            const userData = {
                userID: this.state.userID,
                userToken: this.state.userToken,

                Name: responseJson.user.user_name,
                Birth: birthDate,
                Country: responseJson.user.country,
                Gender: responseJson.user.gender,
                Race: responseJson.user.race,
                Group: responseJson.user.school_unit_id,
                IdCode: responseJson.user.identification_code,
                Email: responseJson.user.email,
                isProfessional: responseJson.user.is_professional,
                RiskGroup: responseJson.user.risk_group,
                State: responseJson.user.state,
                City: responseJson.user.city,
                GroupName: groupName,

                initValueGroup: "Selecionar",
                initValueCategory: "Selecionar",
                initValueSchoolLocation: "Selecionar",
                initValueEducationLevel: "Selecionar",

                groupCheckbox,
                NewInst,
                SchoolLocation,
                EducationLevel,
                Category,
            }

            this.setState({ userData });
        })
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

    loadHouseholdInfo = async (household) => {
        const { navigate } = this.props.navigation

        // Trata a data de nascimento do household para o formato apropriado
        let birthDate = household.birthdate.split('-')
        birthDate = birthDate[2] + '-' + birthDate[1] + '-' + birthDate[0]

        const householdGroupName = await getGroupName(household.school_unit_id)

        // Definindo variaveis logicas
        let groupCheckbox = false
        let NewInst = true
        let SchoolLocation = null
        let EducationLevel = null
        let Category = null

        if (household.school_unit_id) {
            groupCheckbox = true
            NewInst = false
        }
        
        const householdData = {
            userID: this.state.userID,
            userToken: this.state.userToken,
            householdID: household.id,

            Name: household.description,
            Birth: birthDate,
            Country: household.country,
            Gender: household.gender,
            Race: household.race,
            Group: household.school_unit_id,
            IdCode: household.identification_code,
            kinship: household.kinship,
            RiskGroup: household.risk_group,
            GroupName: householdGroupName,
            
            // variaveis logicas
            groupCheckbox,
            NewInst,

            // variaveis iniciais
            SchoolLocation,
            EducationLevel,
            Category,
        }

        this.setState({ householdData });
    }

    changeAvatar = () => {
        ImagePicker.showImagePicker(options, (response) => {
          //console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            let source = response.uri;
    
            if (Platform.OS === 'android') {
              source = 'content://com.guardioesapp.provider/root' + response.path
            }
    
            this.setState({
              avatarSource: source,
            });
    
            AsyncStorage.setItem('userAvatar', this.state.avatarSource);
            this.fetchData()
          }
        });
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

    render() {
        const { navigate } = this.props.navigation
        const householdsData = this.state.dataSource

        return (
            <ScrollViewStyled>
                <User>
                    <AvatarWrapper>
                        <Avatar
                            containerStyle={styles.Avatar}
                            size={scale(58)}
                            source={{uri: this.state.userAvatar}}
                            title={getInitials(this.state.userName)}
                            activeOpacity={0.7}
                            showEditButton
                            rounded
                            editButton={{name: 'camera', type: 'feather', color: '#ffffff', underlayColor: '#000000'}}
                            onEditPress={() => this.changeAvatar()}
                        />
                    </AvatarWrapper>
                    <InfoContainer>
                        <InfoWrapper>
                            <Name>{this.state.userName}</Name>
                            <Relation>Proprietário</Relation>
                        </InfoWrapper>
                        <ButtonsWrapper>
                            <TouchableOpacity
                                onPress={async () => {
                                    navigate('EditarPerfil', { isUser: true, data: this.state.userData });
                                }
                            }>
                                <Feather name="edit" size={scale(25)} color='#ffffff' />
                            </TouchableOpacity>
                        </ButtonsWrapper>
                    </InfoContainer>
                </User>

                <HouseholdWrapper>
                    <HouseholdTitle>{translate("profiles.households")}</HouseholdTitle>
                </HouseholdWrapper>
                
                {householdsData != null ?
                    householdsData.map((household) => {
                        return (
                            <Household key={household.id}>
                                <AvatarWrapper>
                                    <Avatar
                                        size={scale(58)}
                                        source={Imagem[household.picture]}
                                        title={getInitials(household.description)}
                                        rounded
                                    />
                                </AvatarWrapper>
                                <InfoContainer>
                                    <InfoWrapper>
                                        <HouseholdName>{household.description}</HouseholdName>
                                        <HouseholdRelation>{household.kinship}</HouseholdRelation>
                                    </InfoWrapper>
                                    <ButtonsWrapper>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                await this.loadHouseholdInfo(household);
                                                navigate('EditarPerfil', { isUser: false, data: this.state.householdData });
                                            }
                                        }>
                                            <Feather name="edit" size={scale(25)} color='#348EAC' />
                                        </TouchableOpacity>
                                    </ButtonsWrapper>
                                </InfoContainer>
                            </Household>
                        )
                    })
                : null}
            </ScrollViewStyled>
        )
    }
}

const styles = StyleSheet.create({
    Avatar: {
        borderColor: '#ffffff',
        borderWidth: 3
    },
})

export default Perfis
