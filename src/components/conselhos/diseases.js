import React, { Component } from 'react';
import { ConselhoContent } from './Utils';

class Diseases extends Component {
	static navigationOptions = {
		title: 'Enfermidades Imunopreviniveis'
	}

	render() {
		const { navigation } = this.props;
		const incomePages = navigation.getParam('body', 'Sorry, nothig to show now.');
		return (
			<ConselhoContent incomePages={incomePages} />
		);
	}
}

export default Diseases;