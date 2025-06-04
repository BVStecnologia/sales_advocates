// Utility to clean up orphaned auth tokens
export const cleanupOrphanedAuthTokens = () => {
  console.log('[Auth Cleanup] Checking for orphaned tokens...');
  
  // Find all Supabase-related keys
  const supabaseKeys = Object.keys(localStorage).filter(
    key => key.includes('supabase') || key.includes('sb-')
  );
  
  if (supabaseKeys.length > 0) {
    console.log('[Auth Cleanup] Found Supabase keys:', supabaseKeys);
    
    // Check if we have auth tokens but no valid session
    const hasAuthToken = supabaseKeys.some(key => key.includes('auth-token'));
    
    if (hasAuthToken) {
      console.log('[Auth Cleanup] Found auth tokens, checking validity...');
      
      // Get the auth token to check expiry
      const authTokenKey = supabaseKeys.find(key => key.includes('auth-token'));
      if (authTokenKey) {
        try {
          const tokenData = JSON.parse(localStorage.getItem(authTokenKey) || '{}');
          const expiresAt = tokenData.expires_at;
          
          if (expiresAt) {
            const now = Math.floor(Date.now() / 1000);
            const isExpired = expiresAt < now;
            
            if (isExpired) {
              console.log('[Auth Cleanup] Token is expired, cleaning up...');
              cleanupAllAuthData();
              return true;
            }
          }
        } catch (error) {
          console.error('[Auth Cleanup] Error parsing token:', error);
          cleanupAllAuthData();
          return true;
        }
      }
    }
  }
  
  return false;
};

export const cleanupAllAuthData = () => {
  console.log('[Auth Cleanup] Removing all auth-related data...');
  
  // Remove all Supabase-related items
  const keysToRemove = Object.keys(localStorage).filter(
    key => key.includes('supabase') || key.includes('sb-') || key.includes('auth')
  );
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`[Auth Cleanup] Removed: ${key}`);
  });
  
  // Also clear sessionStorage
  sessionStorage.clear();
  
  console.log('[Auth Cleanup] Cleanup complete');
};

// Force a fresh login by clearing everything and reloading
export const forceReauthentication = () => {
  console.log('[Auth Cleanup] Forcing re-authentication...');
  cleanupAllAuthData();
  window.location.href = '/';
};