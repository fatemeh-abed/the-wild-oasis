import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rbfkxrnsukouuaoczylr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiZmt4cm5zdWtvdXVhb2N6eWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDMzMTYsImV4cCI6MjEwNzgxOTMxNn0.sT17ObXlM9smy-xR43MCZLNaAgcxBHTfkYUZB7ZR7Kc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
