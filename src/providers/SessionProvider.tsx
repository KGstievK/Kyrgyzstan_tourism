import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../redux/api/auth';

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
	const { status } = useGetMeQuery();
	console.log("🚀 ~ status:", status)
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleNavigation = () => {
		switch (pathname) {
			case '/auth/sign-in':
			case '/auth/sign-up':
			case '/auth/reset-password':
			case '/auth/forgot':
				if (status === 'fulfilled') {
					navigate('/');
				}
				break;
			case '/chats':
			case '/notifications':
			case '/settings':
			case '/my-profile':
			case '/my-public':
				if (status === 'rejected') {
					navigate('/auth/sign-in');
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		handleNavigation();
	}, [status, pathname, navigate]);

	return children;
};
