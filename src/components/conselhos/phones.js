import React, { Component } from 'react';
import { ConselhoContent } from './Utils';

class Phones extends Component {
	static navigationOptions = {
		title: 'Telefones Úteis'
	}

	render() {
		const { navigation } = this.props;
		const incomePages = navigation.getParam('body', 'Sorry, nothig to show now.');
		return (
			<ConselhoContent incomePages={incomePages} />
		);
	}
}

export default Phones;