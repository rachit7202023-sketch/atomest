import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkBucket() {
  const { data, error } = await supabase.storage.getBucket('resumes');
  if (error) {
    console.log("Bucket 'resumes' not found. Trying to create...");
    // anon key can't create buckets usually, but let's see
  } else {
    console.log("Bucket 'resumes' exists!");
  }
}

checkBucket();
