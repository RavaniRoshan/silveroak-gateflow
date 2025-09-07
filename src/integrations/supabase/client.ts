import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables with fallbacks
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  const missingVars = [];
  if (!SUPABASE_URL) missingVars.push('VITE_SUPABASE_URL');
  if (!SUPABASE_ANON_KEY) missingVars.push('VITE_SUPABASE_ANON_KEY');
  
  const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
  
  if (isDevelopment) {
    console.error('❌ Supabase Configuration Error:', errorMessage);
    console.log('📝 To fix this:');
    console.log('1. Create a .env.local file in your project root');
    console.log('2. Add the following variables:');
    console.log('   VITE_SUPABASE_URL=your_supabase_url_here');
    console.log('   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here');
    console.log('3. Restart your development server');
  }
  
  throw new Error(errorMessage);
}

// Validate URL format
if (!SUPABASE_URL.startsWith('https://')) {
  throw new Error('VITE_SUPABASE_URL must be a valid HTTPS URL');
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Log successful initialization
if (isDevelopment) {
  console.log('✅ Supabase client initialized successfully');
  console.log('🔗 Supabase URL:', SUPABASE_URL);
}