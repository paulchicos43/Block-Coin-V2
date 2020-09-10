import React, { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { Container, Text } from 'native-base'
import PlaidAuthenticator from 'react-native-plaid-link'
import firebase from 'firebase'
require('@firebase/functions')
export default function App({ navigation, route }: any) {
    const handleLog = (value: any) => {
        if (value.action === 'plaid_link-undefined::exit') {
            navigation.pop()
        }
        if (value != null && value.metadata != null && value.metadata.public_token != null) {
            firebase.functions().httpsCallable('handlePlaid')({
                public_token: value.metadata.public_token,
                account_id: value.metadata.account_id,
            })
                .then(() => {
                    navigation.pop()
                })
        }
    }
    useEffect(() => {
        Keyboard.dismiss()
    })
    return (
        <PlaidAuthenticator
            onMessage={handleLog}
            selectAccount= { true }
            publicKey="d027c32082e6626f6fcf209d39510d"
            env="sandbox"
            product="auth,transactions"
            clientName="Payma" 
        />
        )
}