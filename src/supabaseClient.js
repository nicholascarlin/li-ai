import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zxajmbdpsqnovfocvqnk.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4YWptYmRwc3Fub3Zmb2N2cW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg3MTg2ODksImV4cCI6MTk4NDI5NDY4OX0.f_rWH8sCqkeLtjkVhbSU5dRpntONtQ1FqXH8UorTOfw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
