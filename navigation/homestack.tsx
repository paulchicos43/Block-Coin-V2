import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../components/Home'
import SendWithHandle from '../components/SendWithHandle'
import { Button } from 'react-native'
const Stack = createStackNavigator()

export default function App() {
	return (
		<Stack.Navigator
			mode='modal'
		>
			<Stack.Screen
				name="Home"
				component={ Home }
			/>
			<Stack.Screen
				name="SendWithHandle"
				component={SendWithHandle}
				options={{
					headerLeft: () => <Button onPress= {() => null} title = "test" />
				}}
			/>
		</Stack.Navigator>
		)
}