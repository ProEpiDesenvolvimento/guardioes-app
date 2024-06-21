import React, { useEffect, useState } from 'react'
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import Balloon from '../../../components/Balloon'
import LoadingModal from '../../../components/LoadingModal'
import {
    getSignalComments,
    sendSignalComment,
} from '../../../api/flexibleForms'
import { useUser } from '../../../hooks/user'

const KEYBOARD_AVOIDING_BEHAVIOR = Platform.select({
    ios: 'padding',
    android: 'height',
})

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    scrollViewContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        top: 10,
    },
    sendButton: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 5,
    },
    sendButtonText: {
        color: Colors.white,
        fontSize: 16,
    },
    messageTextInputContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: 'transparent',
        borderTopColor: Colors.light,
        alignItems: 'center',
        flexDirection: 'row',
    },
    messageTextInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 90,
        paddingHorizontal: 12,
        fontSize: 17,
        paddingTop: 8,
        marginHorizontal: 5,
        borderColor: Colors.light,
        borderWidth: 1,
        backgroundColor: Colors.white,
        borderRadius: 20,
    },
})

const Chat = ({ route }) => {
    const { token } = useUser()
    const { flexible_form_id } = route.params

    const [loadingAlert, setLoadingAlert] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState('')

    const getMessages = async () => {
        const response = await getSignalComments(flexible_form_id, token)

        if (response.status === 200) {
            setMessages(response.data.messages)
        } else {
            console.warn(response.data)
        }
        setLoadingAlert(false)
    }

    const sendMessage = async () => {
        setIsSending(true)

        const newMessage = {
            message: messageText,
        }

        const response = await sendSignalComment(
            flexible_form_id,
            newMessage,
            token
        )

        if (response.status !== 201) {
            Alert.alert('Erro', 'Não foi possível enviar a mensagem.')
            console.warn(response)
        } else {
            await getMessages()
            setMessageText('')
        }
        setIsSending(false)
    }

    useEffect(() => {
        if (flexible_form_id) {
            getMessages()
        }
    }, [flexible_form_id])

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {messages.map((message) => (
                    <Balloon key={message.id} message={message} />
                ))}
            </ScrollView>

            <KeyboardAvoidingView
                behavior={KEYBOARD_AVOIDING_BEHAVIOR}
                keyboardVerticalOffset={76}
            >
                <SafeAreaView>
                    <View style={styles.messageTextInputContainer}>
                        <TextInput
                            style={styles.messageTextInput}
                            placeholder='Digite sua mensagem...'
                            placeholderTextColor={Colors.light}
                            multiline
                            onChangeText={(text) => setMessageText(text)}
                            value={messageText}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            disabled={!messageText || isSending}
                            onPress={() => sendMessage()}
                        >
                            <Text style={styles.sendButtonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>

            <LoadingModal show={loadingAlert} />
        </>
    )
}

export default Chat
