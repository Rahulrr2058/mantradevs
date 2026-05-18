import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kflsxekakwgfqugvxvqj.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_ye_NLbIZmZ6c7YsInHQUiw_la1G-nZf";

// Initialize Supabase client only if a valid configuration is active.
// If configurations are missing, it defaults to null to allow local sandbox failover.
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;
