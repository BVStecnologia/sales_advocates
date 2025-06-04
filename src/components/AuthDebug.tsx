import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { cleanupAllAuthData } from '../utils/authCleanup';

const DebugPanel = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  max-width: 300px;
  z-index: 9999;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const DebugButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 11px;
  
  &:hover {
    background: #c0392b;
  }
`;

const DebugInfo = styled.div`
  margin: 5px 0;
  
  strong {
    color: #3498db;
  }
`;

export const AuthDebug: React.FC = () => {
  const { user, loading } = useAuth();
  const [authKeys, setAuthKeys] = useState<string[]>([]);
  
  useEffect(() => {
    // Update auth keys every second
    const interval = setInterval(() => {
      const keys = Object.keys(localStorage).filter(
        k => k.includes('supabase') || k.includes('sb-') || k.includes('auth')
      );
      setAuthKeys(keys);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Only show on localhost
  if (window.location.hostname !== 'localhost') {
    return null;
  }
  
  return (
    <DebugPanel>
      <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#f39c12' }}>
        🔍 Auth Debug Panel
      </div>
      
      <DebugInfo>
        <strong>Status:</strong> {loading ? 'Loading...' : user ? 'Authenticated' : 'Not authenticated'}
      </DebugInfo>
      
      {user && (
        <DebugInfo>
          <strong>User:</strong> {user.email}
        </DebugInfo>
      )}
      
      <DebugInfo>
        <strong>Auth Keys:</strong> {authKeys.length} found
        {authKeys.length > 0 && (
          <div style={{ fontSize: '10px', marginTop: '3px', opacity: 0.8 }}>
            {authKeys.map((key, i) => (
              <div key={i}>• {key.substring(0, 30)}...</div>
            ))}
          </div>
        )}
      </DebugInfo>
      
      <DebugButton
        onClick={() => {
          if (window.confirm('Limpar todos os dados de autenticação e recarregar?')) {
            cleanupAllAuthData();
            window.location.reload();
          }
        }}
      >
        🗑️ Clear Auth & Reload
      </DebugButton>
    </DebugPanel>
  );
};