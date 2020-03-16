import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { ConselhoContent } from './Utils';

class Prevention extends Component {
	static navigationOptions = {
		title: 'Prevenção'
	}

	render() {
		const { navigation } = this.props;
		const incomePages = navigation.getParam('body', 'Sorry, nothig to show now.');

		return (
			<ConselhoContent incomePages={incomePages} />
		);
	}
}

export default Prevention;