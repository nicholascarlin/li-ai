import { useAuth } from '../../contexts/Auth';
import { useEffect } from 'react';

const { Outlet, Navigate } = require('react-router-dom');

const PrivateRoutes = () => {
	const { user } = useAuth();

	return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
