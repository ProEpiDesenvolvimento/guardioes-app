import React, { Component } from 'react';
import Animated from 'react-native';

class FloatingTeste extends Component {
    state = {
        isFocused: false,
        thisValue: props.value
    };

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200
        }).start();
    }

    render() {
        const { label, value, ...props } = this.props;
        const labelStyle = {
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 15]
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#aaa', '#000']
            }),
            position: 'absolute',
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0]
            }),
            left: 0,
            alignSelf: 'flex-start',
            textAlign: 'left',
            paddingLeft: "5%",
            fontWeight: 'bold',
        };
        return (
            <View style={{ paddingTop: 18, alignItems: 'center', }}>
                <Animated.Text style={labelStyle}>{label}</Animated.Text>
                <TextInput
                    {...props}
                    style={styles.formInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChangeText={text => props.atualizaValor(text)}
                />
            </View>
        );
    }
}

export default FloatingTeste;