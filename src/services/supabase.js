import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uyslgfheusduclqvcnmc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5c2xnZmhldXNkdWNscXZjbm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzAyNDMsImV4cCI6MjA3MDg0NjI0M30.nyTStuYg1ciidqC2sqGHbbQ_k5_l-Zls8aQPZ2sy9kM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
