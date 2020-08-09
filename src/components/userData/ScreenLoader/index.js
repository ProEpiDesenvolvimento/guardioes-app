import React, { PureComponent } from 'react'
import { SafeAreaView } from 'react-native'
import { Screen, Loading } from './styles'

class ScreenLoader extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Screen>
                    <Loading />
                </Screen>
            </SafeAreaView>
        )
    }
}

//make this component available to the app
export default ScreenLoader
