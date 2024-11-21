import { useAuth } from '@/hooks/useAuth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import { TypeRootStackParamList } from './navigation.types'
import { routes } from './user.routes'
import { Auth } from '@/components/screens/Auth/Auth'
import { Button } from '@/components/ui'
import { Text } from 'react-native'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

export const PrivateNavigator: FC = () => {
	const { userId, logout } = useAuth()

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: '#000'
				}
			}}
		>
			{userId ? (
				routes.map(route => (
					<Stack.Screen
						key={route.name}
						{...route}
						options={{
							headerShown: true,
							headerTitle: '',
							headerStyle: {
								backgroundColor: 'black',
								borderBottomWidth: 0
							},
							headerRight: () => (
								<Button onPress={logout}>
									<Text>Выйти</Text>
								</Button>
							)
						}}
					/>
				))
			) : (
				<Stack.Screen key='Auth' name='Auth' component={Auth} />
			)}
		</Stack.Navigator>
	)
}
