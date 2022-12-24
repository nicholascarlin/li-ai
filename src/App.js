import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth';
import ForgotPasswordModule from './components/auth/ForgotPasswordModule';
import HomePage from './components/pages/HomePage';
import LoginModule from './components/auth/LoginModule';
import NotificationProvider from './contexts/NotificationProvider';
import PrivateRoutes from './components/router/PrivateRoutes';
import ResetPasswordModule from './components/auth/ResetPasswordModule';
import SignupModule from './components/auth/SignupModule';

function App() {
	return (
		<div className='w-screen h-screen'>
			<BrowserRouter>
				<NotificationProvider>
					<AuthProvider>
						<Routes>
							<Route element={<PrivateRoutes />}>
								<Route exact path='/*' element={<HomePage />} />
							</Route>
							<Route element={<LoginModule />} path='/login' />
							<Route element={<SignupModule />} path='/signup' />
							<Route
								element={<ForgotPasswordModule />}
								path='/forgot-password'
							/>
							<Route element={<ResetPasswordModule />} path='/reset-password' />
						</Routes>
					</AuthProvider>
				</NotificationProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
