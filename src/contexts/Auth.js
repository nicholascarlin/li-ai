import React, { useContext, useEffect, useState } from 'react';

import { supabase } from '../supabaseClient';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			if (_event === 'PASSWORD_RECOVERY') {
				console.log('FROM AUTH: PASSWORD RECOVERY EVENT');
			} else {
				setUser(session);
			}
		});

		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session);
		});

		setLoading(false);
	}, []);

	const value = {
		signUp: (data) => supabase.auth.signUp(data),
		signIn: (data) => supabase.auth.signInWithPassword(data),
		signOut: () => supabase.auth.signOut(),
		resetPassword: (data) => supabase.auth.updateUser(data),
		user,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
