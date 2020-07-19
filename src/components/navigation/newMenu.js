import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Imagem from '../../imgs/imageConst';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from '../../utils/scallingUtils';

Feather.loadFont();

import { Container, Avatar, AvatarContainer, UserOption, TextOption, Aplicativo } from './styles';

export default function drawerContentComponents(){
	const [userName, setUserName] = useState('')
	const [userAvatar, setUserAvatar] = useState('')

	async function getAvatar(){
		let userName1 = await AsyncStorage.getItem('userName');
		setUserName(userName1)
		let userAvatar1 = await AsyncStorage.getItem('userAvatar');	
		setUserAvatar(userAvatar1)	
	}

	useEffect(() => {
		getAvatar();
	}, [])

	return (
		<>
			<Container>
				<AvatarContainer>
					<Avatar 
					 	source={Imagem[userAvatar]}
					/>
				</AvatarContainer>		
				<UserOption>
					<Feather name='settings'
						size={scale(26)} 
						color='#ffffff' 
						style={styles.iconStyle}
					/>
					<TextOption>
						Editar perfis
					</TextOption>
				</UserOption>
				<UserOption>
					<Feather name='log-out'
						size={scale(26)} 
						color='#ffffff' 
						style={styles.iconStyle}
					/>
					<TextOption>
						Sair
					</TextOption>
				</UserOption>
				<Aplicativo>
					Aplicativo
				</Aplicativo>
				<UserOption style={styles.menuOptionColor}>
					<Feather name='share-2'
						size={scale(26)} 
						color='#ffffff' 
						style={styles.iconStyle}
					/>
					<TextOption>
						Compartilhar
					</TextOption>
				</UserOption>
				<UserOption style={styles.menuOptionColor}>
					<Feather name='help-circle'
						size={scale(26)} 
						color='#ffffff' 
						style={styles.iconStyle}
					/>
					<TextOption>
						Ajuda
					</TextOption>
				</UserOption>
				<UserOption style={styles.menuOptionColor}>
					<Feather name='info'
						size={scale(26)} 
						color='#ffffff' 
						style={styles.iconStyle}
					/>
					<TextOption>
						Sobre
					</TextOption>
				</UserOption>
			</Container>
		</>
	)
}

const styles = StyleSheet.create({
	iconStyle: {
		marginLeft: scale(5),
	},
	menuOptionColor: {
		backgroundColor: '#5DD39E',
	}
})