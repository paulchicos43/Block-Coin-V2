import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Keyboard } from 'react-native'
import { Container, Text, Button, Input, Form, Item } from 'native-base'
import firebase from 'firebase'
import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators'

export default function App({ navigation, route }: any) {
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState("")
    useEffect(() => {
        Keyboard.dismiss()
    })
    const handleBuy = () => {
        if (parseInt(amount) != 0) {
            firebase.functions().httpsCallable('placeOrder')({
                amount: parseInt(amount),
            })
                .then(() => {
                    navigation.pop()
                    alert('Success! It may take a moment for your transaction to be reflected in your balance.')
                })
            
        } else {
            alert('You must have an amount greater than 0.')
        }
    }
    return (
        !loading ?
            <Container>
                <Form style={{ width: '50%', alignSelf: 'center' }}>
                    <Item>
                        <Text style={{ fontSize: 50 }}>$ </Text><Input style={{ fontSize: 50 }} keyboardType='numeric' onChangeText={setAmount} />
                    </Item>   
                </Form>
                <Button style={{ marginTop: '5%' }} block danger onPress={() => navigation.navigate('PlaidLink')}><Text>Link a Bank Account</Text></Button>
                <Button style={{ marginTop: '10%' }} primary block onPress= { handleBuy }><Text>Buy</Text></Button>
                
            </Container>
            :
            <Container>
                <ActivityIndicator color = 'red' />
            </Container>
        )
}
