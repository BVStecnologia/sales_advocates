// Utility to debug authentication issues
export const debugAuth = () => {
  console.log('=== AUTH DEBUG ===');
  
  // Check all localStorage keys
  console.log('LocalStorage keys:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('supabase') || key.includes('auth'))) {
      console.log(`${key}:`, localStorage.getItem(key));
    }
  }
  
  // Check sessionStorage
  console.log('\nSessionStorage keys:');
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && (key.includes('supabase') || key.includes('auth'))) {
      console.log(`${key}:`, sessionStorage.getItem(key));
    }
  }
  
  // Check cookies
  console.log('\nCookies:', document.cookie);
  
  console.log('=== END DEBUG ===');
};

// Auto-run on load in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(debugAuth, 1000);
}