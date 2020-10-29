import React, {Component} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

class LoadingModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AwesomeAlert
        show={this.props.show}
        showProgress={true}
        title={'Carregando'}
      />
    );
  }
}

export default LoadingModal;
