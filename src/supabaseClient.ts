import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (((import.meta as any).env?.VITE_SUPABASE_URL) || "https://ethixgnouplxttrllxfb.supabase.co").trim();
const supabaseAnonKey = (((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || "sb_publishable_eh0OXVl0NCgavJbUKFP0eA_Jc7osS4N").trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

