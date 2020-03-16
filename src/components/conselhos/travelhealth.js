import React, { Component } from 'react';
import { ConselhoContent } from './Utils';

class TravelHealth extends Component {


	constructor(props) {
		super(props);
		this.state = { isLoading: true }

	}

	static navigationOptions = {
		title: 'Saúde do Viajante'
	}

	render() {
		const { navigation } = this.props;
		const incomePages = navigation.getParam('body', 'Sorry, nothig to show now.');
		return (
			<ConselhoContent incomePages={incomePages} />
		);
	}
}

export default TravelHealth;