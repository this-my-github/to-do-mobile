import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState
} from 'react'
import { IContext } from './auth-provider.interface'
import * as SplashScreen from 'expo-splash-screen'
import { getToken, getUserId, removeToken } from '@/api/store-token'

export const AuthContext = createContext({} as IContext)

SplashScreen.preventAutoHideAsync()

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [userId, setUserId] = useState()

	useEffect(() => {
		let mounted = true

		const checkAccessToken = async () => {
			try {
				const token = await getToken()
				if (token) {
					const id = await getUserId()
					if (mounted) setUserId(id)
				}
			} catch {
			} finally {
				await SplashScreen.hideAsync()
			}
		}

		checkAccessToken()

		return () => {
			mounted = false
		}
	}, [])

	const logout = () => {
		removeToken()
		setUserId(null)
	}

	return (
		<AuthContext.Provider value={{ userId, setUserId, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
