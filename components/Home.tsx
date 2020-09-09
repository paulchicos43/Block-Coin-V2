import React, { useState, useEffect } from 'react'
import { Container, Content, Text, Button } from 'native-base'
import { StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'
import QRCode from 'react-native-qrcode-svg'
export default function App({ navigation, route }: any) {
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(true)
    firebase.firestore().collection('balances').doc(firebase.auth().currentUser?.uid).
        onSnapshot((doc: any) => {
            if (doc.data() != null) {
                setBalance(doc.data().balance)
                setLoading(false)
            }

        })
    return (
        !loading ?
            <Container style={{ alignItems: 'center' }}>
                <Text style={styles.balance}>$ {balance}</Text>
                <Text style= {{ fontSize: 40, marginBottom: '6%' }}>@{ firebase.auth().currentUser?.email?.split('@')[0] }</Text>
                <QRCode
                    size= { 200 }
                    value= 'user {firebase.auth().currentUser?.uid }'
                />
                <Container style={{ flexDirection: 'row', alignItems: 'center', marginTop: '45%'  }}>
                    <Button warning rounded style= {{ marginRight: '5%' }}><Text>Pay with Handle</Text></Button>
                    <Button danger rounded><Text>Pay with QR Code</Text></Button>
                </Container>
            </Container>
            :
            <Container style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <ActivityIndicator size= 'large' color = 'red' />
            </Container>
        )
}
const styles = StyleSheet.create({
    balance: {
        alignSelf: 'center',
        fontSize: 100,
        marginBottom: '25%'
    },
})