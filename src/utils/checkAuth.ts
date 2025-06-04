import { supabase } from '../lib/supabaseClient';

export const checkAuthSession = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    
    console.log('Manual session check:', {
      hasSession: !!session,
      user: session?.user?.email,
      expiresAt: session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : null
    });
    
    // Check current user
    const { data: userData } = await supabase.auth.getUser();
    console.log('Current user check:', {
      hasUser: !!userData.user,
      userEmail: userData.user?.email
    });
    
    return session;
  } catch (error) {
    console.error('Error checking auth session:', error);
    return null;
  }
};

// Run check on window focus
if (typeof window !== 'undefined') {
  window.addEventListener('focus', () => {
    console.log('Window focused, checking auth...');
    checkAuthSession();
  });
}