import { supabase } from '../lib/supabaseClient';

export const checkSupabaseConfig = async () => {
  console.log('=== SUPABASE CONFIG CHECK ===');
  
  // Check environment
  console.log('Environment:', {
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    origin: window.location.origin,
    isLocalhost: window.location.hostname === 'localhost'
  });
  
  // Check Supabase URL
  console.log('Supabase URL:', supabase.auth ? 'Auth client initialized' : 'Auth client NOT initialized');
  
  // Check redirect URLs being used
  const redirectUrl = `${window.location.origin}/auth/callback`;
  console.log('Redirect URL being used:', redirectUrl);
  
  // Check localStorage for auth data
  const authKeys = Object.keys(localStorage).filter(key => 
    key.includes('supabase') || key.includes('auth')
  );
  console.log('Auth-related localStorage keys:', authKeys);
  
  // Check if we can make a basic request
  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      console.log('No session found');
    } else {
      console.log('Session fetch successful:', data.session ? 'Session exists' : 'No session');
    }
  } catch (e) {
    console.error('Failed to connect to Supabase:', e);
  }
  
  console.log('=== END CONFIG CHECK ===');
};

// Auto-run on development
if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
  setTimeout(checkSupabaseConfig, 2000);
}