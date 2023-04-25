import '@stripe/stripe-js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AccountPage from './components/pages/AccountPage';
import { AuthProvider } from './contexts/Auth';
import ForgotPasswordModule from './components/auth/ForgotPasswordModule';
import HomePage from './components/pages/HomePage';
import LoginModule from './components/auth/LoginModule';
import NotificationProvider from './contexts/NotificationProvider';
import PrivateRoutes from './components/router/PrivateRoutes';
import ResetPasswordModule from './components/auth/ResetPasswordModule';
import SignupModule from './components/auth/SignupModule';
import TempHomePage from './components/pages/TempHomePage';

function App() {
	return (
		<div className='w-screen h-screen'>
			<BrowserRouter>
				<NotificationProvider>
					<AuthProvider>
						<Routes>
							<Route element={<PrivateRoutes />}>
								<Route exact path='/*' element={<HomePage />} />
								<Route exact path='/account*' element={<AccountPage />} />
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
