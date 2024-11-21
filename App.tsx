import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigation } from '@/navigation/Navigation'
import './global.css'
import { AuthProvider } from './providers/auth/AuthProvider'

export default function Index() {
	return (
		<>
			<AuthProvider>
				<SafeAreaProvider>
					<Navigation />
					<StatusBar style='light' />
				</SafeAreaProvider>
			</AuthProvider>
		</>
	)
}
