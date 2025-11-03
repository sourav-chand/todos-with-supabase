import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://lyxdwngilfjvgkegvvjq.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl) throw new Error("Missing SUPABASE_URL!");
if (!supabaseKey) throw new Error("Missing SUPABASE_KEY!");

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
