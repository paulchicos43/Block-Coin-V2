import React, { useState, useEffect } from 'react'
import { Container, Text, Input, Item, Form, Button } from 'native-base'
import { StyleSheet } from 'react-native'
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyB08NFXIeuM8j_GSd8W25vBgZBBNKdoC1I",
    authDomain: "payma-5485f.firebaseapp.com",
    databaseURL: "https://payma-5485f.firebaseio.com",
    projectId: "payma-5485f",
    storageBucket: "payma-5485f.appspot.com",
    messagingSenderId: "839743388889",
    appId: "1:839743388889:web:99741590109094853052c8",
    measurementId: "G-TLJD3PBTBB"
};

if (firebase.apps.length === 0) { //Prevent initializing twice
    firebase.initializeApp(firebaseConfig);
}
export default function App({ navigation, route }: any) {
    const handlePress = () => {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(() => {
                firebase.firestore().collection('balances').doc(firebase.auth().currentUser?.uid)
                    .set({
                        balance: 0,
                    })
            })
            .catch((error: any) => {
            firebase.auth().signInWithEmailAndPassword(username, password)
            .catch((error: any) => {
                alert(error)
            })
        })
    }
    const checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate("Home");
            } else {
                navigation.navigate("Login")
            }
        })
    }
    useEffect(() => checkIfLoggedIn());
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <Container>
            <Form>
                <Item style={styles.formItem}>
                    <Input placeholder='jdoe@doe.com' onChangeText={ setUsername } />
                </Item>
                <Item style={styles.formItem}>
                    <Input secureTextEntry={ true } placeholder='abcdefg' onChangeText={setPassword} />
                </Item>
                <Button onPress= { handlePress } block primary><Text>Sign In / Register</Text></Button>
            </Form>
        </Container>
        )
}

const styles = StyleSheet.create({
    formItem: {
        marginBottom: '2%'
    }
})