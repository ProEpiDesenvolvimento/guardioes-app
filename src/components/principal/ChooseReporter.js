import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import translate from '../../../locales/i18n';

const AdicionarFamiliar = (<Icon name='plus' type={'evilicon'} size={30} color='red' />)
class ChooseReporter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userLatitude: 'unknown',
            userLongitude: 'unknown',
            error: null,
            isLoading: true,
            url: "",
            userHousehold: []
        }

    }    
    static navigationOptions = {
        title: translate("chooseReporter.title")
    }
    
    getUserData = async () => {
        UserID = await AsyncStorage.getItem('userID');
        this.setState({ UserID: UserID });
        UserName = await AsyncStorage.getItem('userName');
        this.setState({ UserName: UserName });
    }
    componentDidMount(){
        
        this.getUserData();
        this.GetHouseholds();
        
    }
    GetHouseholds = async () => {
        userHousehold = await AsyncStorage.getItem('userHousehold');
        this.setState({ userHousehold: JSON.parse(userHousehold) });
    }

    reportUser(){
        this.props.navigation.navigate('Reportar');
        AsyncStorage.removeItem('HouseholdId');
    }
  
    setHouseholdReporter = async (id) =>{
        AsyncStorage.setItem('HouseholdId', id);
        this.props.navigation.navigate('Reportar');

    }
        render() {
            let HouseholdAux = this.state.userHousehold;
            return (
              <ScrollView >
                     <Text style={styles.titulo}>Quem participará?</Text>
                     <Text style={styles.textoSelector}>Selecione o perfil que quer reportar</Text>
                     <TouchableOpacity style={styles.selector} onPress={() => this.reportUser()}>
                         <Text style={styles.titulo}>{this.state.UserName}</Text>
                     </TouchableOpacity>
                     <View style={styles.familiar}>
                        {   
                            HouseholdAux.map((houseH , index) => {
                                return(
                                        <TouchableOpacity style={styles.selector} onPress={() => this.setHouseholdReporter(houseH.id)}>
                                            <Text style={styles.textoSelector}>{houseH.firstname}</Text>
                                        </TouchableOpacity>
                                )
                            })
                        }
                        <TouchableOpacity style={{padding: 10}} onPress={() => this.props.navigation.navigate('Household')}>
                            {AdicionarFamiliar}
                        </TouchableOpacity>
                        
                    </View>
                    </ScrollView>
            );
          }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    margTop: {
        flexDirection: 'row',
        backgroundColor: '#0084b4',
        height: 50,
        justifyContent: 'space-between'
      },
      margTop1: {
        backgroundColor: '#CD853F',
        height: 5,
      },
      titulo: {
        color: '#CD853F',
        justifyContent: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
      },
      backButton: {
          alignSelf: 'center',
          marginLeft: 10,
      },
      scroll: {

      },
      selector: {
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 10,
          elevation: 5,

          backgroundColor: '#fff',
          padding: 10,
      },
      textoSelector: {
          alignSelf: 'center',
          color: '#e10531',
          fontSize: 16,
          fontWeight: 'bold',
      },

});

export default ChooseReporter;