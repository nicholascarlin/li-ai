import { supabase } from '../../supabaseClient';

export const FetchUser = async (id) => {
	const { data, error } = await supabase.from('Accounts').select().eq('id', id);

	if (error) {
		console.log('ERROR', error);
		return error.message;
	}
	if (data) {
		return data[0];
	}
};
