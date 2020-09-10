import React, { useState } from 'react'
import { Container, Input, Form, Item, Text, Button } from 'native-base'
import firebase from 'firebase'
import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators'

export default function App({ navigation, route }: any) {
    const [targetHandle, setTargetHandle] = useState("")
    const [amount, setAmount] = useState("0")
    const handleSend = () => {
        if (parseInt(amount) === 0) {
            alert("Amount must be greater than 0.")
            return
        }
        firebase.functions().httpsCallable('sendToHandle')({
            handle: targetHandle,
            amount: parseInt(amount),
        })
        navigation.pop()
    }
    return (
        <Container>
            <Form>
                <Item>
                    <Text>User: </Text>
                    <Input onChangeText={setTargetHandle} placeholder='andrei001' />
                </Item>
                <Item>
                    <Text>Amount: $</Text>
                    <Input onChangeText={setAmount} placeholder='10' />
                </Item>
                <Button block primary style={{marginTop: '2%'}} onPress={ handleSend}><Text>Send</Text></Button>
            </Form>
        </Container>
        )
}