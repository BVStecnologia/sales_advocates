import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js'
import { cleanupOrphanedAuthTokens } from '../utils/authCleanup'

type AuthContextType = {
  session: Session | null
  user: User | null
  loading: boolean
  signIn: (
    provider: 'google' | 'email', 
    credentials?: { email: string; password: string }
  ) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    // Debug auth redirects without intercepting
    if (window.location.hostname === 'localhost') {
      console.log('[Auth] Running on localhost - OAuth debugging enabled');
    }
    
    // Configura o listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state changed:', _event, 'Session:', session ? 'Active' : 'None');
        
        // Log auth events for debugging
        if (_event === 'SIGNED_IN') {
          console.log('[Auth] User signed in successfully');
        }
        
        // Ensure the session is properly set
        if (session) {
          console.log('Setting session from auth state change');
          setSession(session);
          setUser(session.user);
        } else if (_event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
        }
        
        // Only set loading to false after processing
        setLoading(false);
      }
    )

    // Carrega a sessão atual na inicialização
    const initializeAuth = async () => {
      try {
        // First, try to get session from Supabase
        const { data } = await supabase.auth.getSession();
        const { session } = data;
        
        console.log('Initial session check:', session ? 'Found' : 'Not found', 'Environment:', window.location.hostname);
        
        // Enhanced debug logging for localhost
        if (window.location.hostname === 'localhost') {
          console.log('🔍 Localhost debugging:');
          console.log('- Storage keys:', Object.keys(localStorage).filter(k => k.includes('supabase')));
          console.log('- Current URL:', window.location.href);
          console.log('- Origin:', window.location.origin);
          
          // If no session but we have auth token in localStorage, try to recover
          if (!session) {
            const authKeys = Object.keys(localStorage).filter(k => k.includes('sb-') && k.includes('-auth-token'));
            if (authKeys.length > 0) {
              console.log('Found auth token in localStorage but no session, checking if orphaned...');
              
              // Check if tokens are orphaned/expired
              const hasOrphanedTokens = cleanupOrphanedAuthTokens();
              
              if (hasOrphanedTokens) {
                console.log('❌ Orphaned/expired tokens detected and cleaned up');
                // Tokens were cleaned, user needs to login again
                setLoading(false);
                return;
              }
              
              // Try to recover session with retries
              console.log('Attempting to recover valid session...');
              let recovered = false;
              
              for (let attempt = 1; attempt <= 3; attempt++) {
                await new Promise(resolve => setTimeout(resolve, attempt * 500));
                
                try {
                  // Try getting the session again first
                  const { data: sessionData } = await supabase.auth.getSession();
                  
                  if (sessionData.session) {
                    console.log(`✅ Session found on attempt ${attempt}`);
                    setSession(sessionData.session);
                    setUser(sessionData.session.user);
                    recovered = true;
                    break;
                  }
                  
                  // If no session, try to get user
                  const { data: userData } = await supabase.auth.getUser();
                  if (userData.user) {
                    console.log(`✅ User found on attempt ${attempt}`);
                    setUser(userData.user);
                    // Don't break, continue trying to get session
                  }
                } catch (err) {
                  console.error(`Attempt ${attempt} failed:`, err);
                }
              }
              
              if (!recovered) {
                console.log('❌ Failed to recover session after 3 attempts, cleaning up...');
                cleanupOrphanedAuthTokens();
              }
            }
          }
        }
        
        if (session) {
          console.log('Session user:', session.user.email);
          console.log('Session expires at:', new Date(session.expires_at! * 1000).toLocaleString());
          console.log('Access token present:', !!session.access_token);
          console.log('Refresh token present:', !!session.refresh_token);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (provider: 'google' | 'email', credentials?: { email: string; password: string }) => {
    try {
      if (provider === 'google') {
        // Para login com Google, precisamos garantir que o redirecionamento volte para a página inicial
        // Always use the full callback URL for consistency
        const redirectUrl = `${window.location.origin}/auth/callback`;
        
        console.log('Using redirect URL:', redirectUrl);
        console.log('Current environment:', window.location.hostname);
        
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: redirectUrl,
          },
        })
        
        if (error) throw error
        
        // Para o Google OAuth, como ele redireciona para outra página e volta,
        // a função continuará executando apenas se a autenticação não redirecionar
        // O que acontece em casos de erro
        console.log("OAuth sign-in initiated")
        
      } else if (provider === 'email' && credentials) {
        console.log('Attempting email login for:', credentials.email);
        const { error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })
        console.log('Email login result:', error ? 'Failed' : 'Success', error?.message || '');
        if (error) throw error
      }
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // Limpar o projeto atual do localStorage ao fazer logout
      localStorage.removeItem('currentProjectId');
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      console.error('Error during signup:', error)
      throw error
    }
  }

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}