import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../components/Login'
import PlaidLink from '../components/PlaidLink'
import AddMoney from '../components/AddMoney'
import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './HomeStack'
import { Button } from 'react-native'
import firebase from 'firebase'
export default function App() {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator
                mode = 'card'
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeStack}
                    options={({ navigation, route }: any) => ({
                        headerLeft: () => <Button title='Log Out' onPress={() => firebase.auth().signOut()} />,
                        headerRight: () => <Button title='Add Money' onPress={() => navigation.navigate('AddMoney') } />,
                        gestureEnabled: false,
                    })}
                />
                <Stack.Screen
                    name="PlaidLink"
                    component={ PlaidLink }
                    options={{
                        headerShown: false,
                    }}
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