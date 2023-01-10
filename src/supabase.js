import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pazyevznqbiqvbkvjcgv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhenlldnpucWJpcXZia3ZqY2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwOTIzNDEsImV4cCI6MTk4ODY2ODM0MX0.k1JnRT48wPKIq97-LukJQCD1WgL6T4fTUlrk5sWFAK8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
