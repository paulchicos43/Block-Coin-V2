import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../components/Home'
import Login from '../components/Login'
import AddMoney from '../components/AddMoney'
import { Button } from 'react-native'
import firebase from 'firebase'
export default function App() {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation, route }) => ({
                        headerLeft: () => <Button title='Log Out' onPress={() => firebase.auth().signOut()} />,
                        headerRight: () => <Button title='Add Money' onPress={() => navigation.navigate('AddMoney') } />,
                        gestureEnabled: false,
                    })}
                />
                <Stack.Screen
                    name="AddMoney"
                    component={AddMoney}
                    options={{
                        title: 'Add Money'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        )
}