import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppnxahznhiqbqedfmznx.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbnhhaHpuaGlxYnFlZGZtem54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIzNDIwMTgsImV4cCI6MTk3NzkxODAxOH0._r7vv_cRqkx2eXTdAawMlDfzdfZa-mDe_JKwFEkapgk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
