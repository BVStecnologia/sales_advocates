import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { GlobalThemeStyles, useGlobalTheme } from './styles/GlobalThemeSystem';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import Monitoring from './pages/Monitoring';
import Mentions from './pages/Mentions';
import Settings from './pages/Settings';
import Integrations from './pages/Integrations';
import LoginPage from './pages/LoginPage';
import ProjectCreationPage from './pages/ProjectCreationPage';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Security from './pages/Security';
import LoadingDataIndicator from './components/LoadingDataIndicator';
import ProcessingWrapper from './components/ProcessingWrapper';
import UrlDataTest from './components/UrlDataTest';
import * as FaIcons from 'react-icons/fa';
import { IconComponent } from './utils/IconHelper';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { OAUTH_CONFIG } from './config/oauth';
import Footer from './components/Footer';
import VideoManager from './pages/VideoManager';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  
  @media (min-width: 769px) {
    flex-direction: row;
  }
  
  /* Applied to fix any possible issues with sidebar */
  position: relative;
  z-index: 0;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.background};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 16px 12px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 8px;
  }
`;

const FloatingMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primaryDark}, ${props => props.theme.colors.primary}); /* Accent color (10%) for button background */
  color: ${props => props.theme.colors.secondary}; /* Secondary color (30%) for button icon */
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 
              inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.17, 0.67, 0.29, 0.96);
  isolation: isolate;
  
  /* Edge highlight */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0) 100%);
    opacity: 0.6;
    z-index: 1;
  }
  
  /* Light beam */
  &::after {
    content: '';
    position: absolute;
    width: 1.2px;
    height: 130%;
    top: -15%;
    left: -10%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 10%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.05) 90%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(20deg);
    z-index: 2;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
                0 0 40px rgba(255, 255, 255, 0.25);
    filter: blur(0.3px);
    opacity: 0.7;
    animation: navButtonBeam 6s cubic-bezier(0.17, 0.67, 0.29, 0.96) infinite;
    animation-delay: 1s;
  }
  
  @keyframes navButtonBeam {
    0% {
      left: -5%;
      opacity: 0;
      transform: rotate(20deg) translateY(0);
    }
    10% {
      opacity: 0.7;
    }
    60% {
      opacity: 0.7;
    }
    100% {
      left: 105%;
      opacity: 0;
      transform: rotate(20deg) translateY(0);
    }
  }
  
  /* Icon position above animations */
  svg {
    position: relative;
    z-index: 3;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
    transition: all 0.3s ease;
    font-size: 1.5rem;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.01);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryLight}); /* Accent colors (10%) for hover state */
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 0 1px rgba(255, 255, 255, 0.1),
                0 0 15px rgba(255, 255, 255, 0.2);
    
    &::after {
      animation-duration: 3.8s;
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.8),
                  0 0 50px rgba(255, 255, 255, 0.3);
    }
    
    &::before {
      opacity: 0.9;
    }
    
    svg {
      transform: scale(1.15);
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.6));
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.99);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 
                inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

// Helper function to get theme-aware background color
const getThemeBackground = (): string => {
  const savedTheme = localStorage.getItem('darkMode');
  
  if (savedTheme !== null) {
    return savedTheme === 'true' ? '#0A0A0B' : '#f0f2f5';
  }
  
  // If no preference, use time-based theme
  const currentHour = new Date().getHours();
  const isDarkMode = currentHour >= 18 || currentHour < 6;
  return isDarkMode ? '#0A0A0B' : '#f0f2f5';
};

// Componente OAuthHandler para processar códigos de autorização do YouTube em qualquer rota
const OAuthHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar se há um código de autorização do YouTube na URL
    const checkForYouTubeOAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const hasYouTubeScopes = urlParams.get('scope')?.includes('youtube');
      
      // Se temos um código de autorização e escopos do YouTube
      if (code && hasYouTubeScopes) {
        console.log('Código de autorização do YouTube detectado na URL:', code);
        console.log('ID do projeto no parâmetro state:', state);
        
        try {
          // Importar dinamicamente a biblioteca Supabase e o cliente
          const { supabase } = await import('./lib/supabaseClient');
          
          // Limpar os parâmetros da URL para evitar reprocessamento em recargas
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Construir os parâmetros para troca de token
          // Determinar o URI de redirecionamento correto com base no ambiente
          const isProduction = 
            window.location.hostname === 'salesadvocate.ai' || 
            window.location.hostname === 'sales-advocates.fly.dev' ||
            window.location.hostname === 'liftlio.fly.dev';
          const redirectUri = isProduction 
            ? `https://${window.location.hostname}/oauth-callback.html` 
            : 'http://localhost:3000/oauth-callback.html';
            
          console.log('Ambiente detectado:', isProduction ? 'Produção' : 'Desenvolvimento');
          console.log('Usando redirect URI:', redirectUri);
          
          const tokenEndpoint = 'https://oauth2.googleapis.com/token';
          const clientId = OAUTH_CONFIG.GOOGLE_CLIENT_ID;
          const clientSecret = OAUTH_CONFIG.GOOGLE_CLIENT_SECRET;
          
          // Criar dados do formulário para a solicitação de token
          const formData = new URLSearchParams();
          formData.append('code', code);
          formData.append('client_id', clientId);
          formData.append('client_secret', clientSecret);
          formData.append('redirect_uri', redirectUri);
          formData.append('grant_type', 'authorization_code');
          
          // Fazer a requisição de token
          console.log('Fazendo solicitação de token para o YouTube...');
          const tokenResponse = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
          });
          
          // Processar a resposta
          if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            throw new Error(`Falha na troca de token: ${errorData.error_description || errorData.error || 'Erro desconhecido'}`);
          }
          
          const tokenData = await tokenResponse.json();
          console.log('Token recebido com sucesso, salvando no Supabase...');
          
          // Armazenar o tempo de expiração diretamente em segundos
          const expiresAt = tokenData.expires_in; // Valor em segundos (ex: 3599)
          
          // Verificar se um projeto foi fornecido no parâmetro state
          if (state) {
            // Verificar se a integração já existe
            console.log('Verificando integração existente para projeto ID:', state);
            const projectId = parseInt(state, 10); // Converter para número
            const { data: existingData, error: queryError } = await supabase
              .from('Integrações')
              .select('*')
              .eq('PROJETO id', projectId)
              .eq('Tipo de integração', 'youtube');
              
            console.log('Consulta de integração:', existingData ? `${existingData.length} encontradas` : 'Nenhuma', queryError || '');
            
            if (existingData && existingData.length > 0) {
              // Atualizar integração existente
              console.log('Atualizando integração existente para projeto ID:', projectId);
              const { data: updateData, error: updateError } = await supabase
                .from('Integrações')
                .update({
                  "Token": tokenData.access_token,
                  "Refresh token": tokenData.refresh_token,
                  "expira em": expiresAt,
                  "Ultima atualização": new Date().toISOString(),
                  "ativo": true
                })
                .eq('PROJETO id', projectId)
                .eq('Tipo de integração', 'youtube')
                .select();
                
              console.log('Resultado da atualização:', updateData ? 'Sucesso' : 'Falha', updateError || '');
                
              if (updateError) throw updateError;
            } else {
              // Inserir nova integração
              console.log('Criando nova integração com PROJETO id:', state);
              const { data: insertData, error: insertError } = await supabase
                .from('Integrações')
                .insert([{
                  "PROJETO id": parseInt(state, 10),  // Convertendo string para número
                  "Tipo de integração": "youtube",
                  "Token": tokenData.access_token,
                  "Refresh token": tokenData.refresh_token,
                  "expira em": expiresAt,
                  "Ultima atualização": new Date().toISOString(),
                  "ativo": true
                }])
                .select();
              
              console.log('Resultado da inserção:', insertData ? 'Sucesso' : 'Falha', insertError || '');
                
              if (insertError) throw insertError;
            }
            
            // ALTERAÇÃO: Marcamos a integração como bem-sucedida e
            // registramos que o usuário completou o onboarding para evitar
            // que ele volte ao modo onboarding ao desconectar integrações
            localStorage.setItem('integrationSuccess', 'true');
            localStorage.setItem('integrationTimestamp', Date.now().toString());
            localStorage.setItem('userCompletedOnboarding', 'true');
            
            // Adicionar marcador de "integração recente" para prevenir inicialização duplicada
            // Este marcador será verificado antes de iniciar um novo fluxo OAuth
            localStorage.setItem('recentIntegration', 'true');
            
            // Marcar que devemos ir para o dashboard após OAuth
            localStorage.setItem('postOAuthDestination', '/dashboard');
            
            // Configurar expiração do marcador (60 segundos)
            setTimeout(() => {
              localStorage.removeItem('recentIntegration');
            }, 60000); // Remover após 60 segundos
            
            // Forçar a atualização do estado de onboarding para completar o fluxo
            try {
              // Atualizar diretamente na tabela de integrações - tornar ativo
              const { data: finalUpdateData, error: finalUpdateError } = await supabase
                .from('Integrações')
                .update({
                  "ativo": true
                })
                .eq('PROJETO id', projectId)
                .eq('Tipo de integração', 'youtube')
                .select();
                
              console.log('Ativação final da integração:', 
                finalUpdateData ? 'Sucesso' : 'Falha', 
                finalUpdateError || '');
              
              // Primeiro, atualizar o campo Youtube Active na tabela Projeto
              const { data: projectUpdateData, error: projectUpdateError } = await supabase
                .from('Projeto')
                .update({
                  "Youtube Active": true
                })
                .eq('id', projectId)
                .select();
                
              console.log('Atualização do campo Youtube Active no projeto:', 
                projectUpdateData ? 'Sucesso' : 'Falha', 
                projectUpdateError || '');
                
              // Segundo, atualizar o campo Integrações na tabela Projeto
              // Precisamos do ID da integração que acabamos de criar ou atualizar
              // Se já existia uma integração anterior, usamos esse ID
              let integracaoId = null;
              if (existingData?.length > 0) {
                integracaoId = existingData[0].id;
              }
              // Se não existia e acabamos de criar uma, precisamos buscar o ID dela
              else {
                // Buscar a integração recém-criada para obter o ID
                const { data: newIntegrationData } = await supabase
                  .from('Integrações')
                  .select('id')
                  .eq('PROJETO id', projectId)
                  .eq('Tipo de integração', 'youtube')
                  .limit(1);
                  
                if (newIntegrationData?.length > 0) {
                  integracaoId = newIntegrationData[0].id;
                }
              }
              
              if (integracaoId) {
                console.log('Atualizando campo Integrações do projeto com o ID da integração:', integracaoId);
                
                const { data: integracaoUpdateData, error: integracaoUpdateError } = await supabase
                  .from('Projeto')
                  .update({
                    "Integrações": integracaoId
                  })
                  .eq('id', projectId)
                  .select();
                  
                console.log('Atualização do campo Integrações no projeto:', 
                  integracaoUpdateData ? 'Sucesso' : 'Falha', 
                  integracaoUpdateError || '');
              } else {
                console.error('Não foi possível atualizar o campo Integrações porque não temos o ID da integração');
              }
              
              // Verificar se o projeto já tem mensagens antes de definir o status para 0
              const { data: mensagensExistentes, error: mensagensError } = await supabase
                .from('Mensagens')
                .select('id')
                .eq('project_id', projectId)
                .limit(1);
                
              console.log('Verificação de mensagens existentes:', 
                mensagensExistentes ? `${mensagensExistentes.length} encontradas` : 'Nenhuma', 
                mensagensError || '');
              
              // Apenas definir o status para 0 se o projeto ainda não tiver mensagens
              if (!mensagensExistentes || mensagensExistentes.length === 0) {
                console.log('Projeto ainda não tem mensagens, iniciando processamento (status=0)');
                const { data: statusUpdateData, error: statusUpdateError } = await supabase
                  .from('Projeto')
                  .update({
                    "status": "0"
                  })
                  .eq('id', projectId)
                  .select();
                  
                console.log('Atualização do campo status do projeto para iniciar processamento:', 
                  statusUpdateData ? 'Sucesso' : 'Falha', 
                  statusUpdateError || '');
              } else {
                console.log('Projeto já tem mensagens, mantendo o status atual');
              }
              
              console.log('Integração marcada como ativa com sucesso');
            } catch (updateError) {
              console.error('Erro ao marcar integração como ativa:', updateError);
            }
            
            // Redirecionar para o dashboard para que o usuário possa ver a animação de processamento
            // Uma vez que o dashboard está envolvido pelo ProcessingWrapper, ele mostrará a tela de carregamento
            console.log('Redirecionando para o dashboard para mostrar o processamento...');
            
            // Aguardar um momento para garantir que o token foi salvo
            setTimeout(() => {
              // Usar navigate do React Router para manter a SPA
              navigate('/dashboard', { replace: true });
            }, 1000);
          } else {
            alert('Erro: Nenhum ID de projeto encontrado para associar a esta integração.');
          }
        } catch (error) {
          console.error('Erro ao processar o código de autorização do YouTube:', error);
          alert(`Erro ao conectar ao YouTube: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
      }
    };
    
    // Executar verificação
    checkForYouTubeOAuth();
  }, []);
  
  return null; // Este componente não renderiza nada
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Root-level authentication handling
  // This handles tokens that arrive on any path, not just the callback path
  useEffect(() => {
    // Check if we have an auth token in the URL hash
    if (window.location.hash && window.location.hash.includes('access_token')) {
      console.log('Detected auth token, processing directly...');
      
      // Load the Supabase client here to process the token
      import('./lib/supabaseClient').then(({ supabase }) => {
        // The hash contains the session information - let's process it
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
          console.log('Found access token, setting session...');
          
          // Let Supabase handle the token
          supabase.auth.getSession().then(({ data }) => {
            console.log('Session checked:', data.session ? 'Found' : 'Not found');
            
            // If we got a session, all is good - no redirect needed
            // The auth provider will handle the user state
          });
        }
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyle />
        <AuthProvider>
          <ProjectProvider>
            <Router>
            {/* Adicionar OAuthHandler para processar códigos do YouTube em qualquer rota */}
            <OAuthHandler />
            <Routes>
              {/* Landing page como ponto de entrada principal */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Páginas institucionais */}
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              
              <Route path="/*" element={
                <ProtectedLayout 
                  sidebarOpen={sidebarOpen} 
                  toggleSidebar={toggleSidebar}
                />
              } />
            </Routes>
            </Router>
          </ProjectProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// Componente de layout protegido
const ProtectedLayout = ({ sidebarOpen, toggleSidebar }: { sidebarOpen: boolean, toggleSidebar: () => void }) => {
  const { user, loading } = useAuth();
  const { isOnboarding, onboardingReady, hasProjects, isLoading, projects, projectIntegrations } = useProject();
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();
  
  // Effect para garantir que mostramos loading até tudo estar pronto
  useEffect(() => {
    console.log('ProtectedLayout state check:', {
      authLoading: loading,
      onboardingReady,
      projectIsLoading: isLoading,
      isInitializing,
      hasUser: !!user,
      userEmail: user?.email
    });
    
    // Só remover o loading quando TODAS as condições estiverem resolvidas
    if (!loading && onboardingReady && !isLoading) {
      // Delay maior para garantir que tudo está carregado, especialmente após OAuth
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, onboardingReady, isLoading, user]);
  
  // Verificar se temos um destino pós-OAuth pendente
  useEffect(() => {
    const postOAuthDestination = localStorage.getItem('postOAuthDestination');
    if (postOAuthDestination && user && !loading && !isLoading) {
      console.log('Redirecionando para destino pós-OAuth:', postOAuthDestination);
      localStorage.removeItem('postOAuthDestination');
      // Usar navigate em vez de window.location para evitar recarregamento
      navigate(postOAuthDestination, { replace: true });
    }
  }, [user, loading, isLoading, navigate]);
  
  // Log detailed state on every render
  useEffect(() => {
    console.log('🔍 ProtectedLayout Debug:', {
      currentPath: window.location.pathname,
      authLoading: loading,
      hasUser: !!user,
      userEmail: user?.email,
      onboardingReady,
      projectLoading: isLoading,
      isInitializing,
      timestamp: new Date().toISOString()
    });
  });
  
  // Add a small delay for localhost to ensure auth state is fully loaded
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  useEffect(() => {
    // On localhost, add extra delay to ensure auth state is loaded
    if (window.location.hostname === 'localhost' && !loading) {
      const timer = setTimeout(() => {
        console.log('🔐 Localhost auth check complete after delay');
        setAuthCheckComplete(true);
      }, 800); // Balanceado para evitar redirect mas não atrasar muito
      return () => clearTimeout(timer);
    } else if (!loading) {
      setAuthCheckComplete(true);
    }
  }, [loading]);
  
  // Mostrar loading até TODAS as verificações estarem completas
  if (loading || !onboardingReady || isLoading || isInitializing || !authCheckComplete) {
    console.log('Still loading...', { loading, onboardingReady, isLoading, isInitializing, authCheckComplete });
    return (
      <div style={{
        height: '100vh',
        backgroundColor: getThemeBackground(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <LoadingDataIndicator />
      </div>
    );
  }
  
  // Redirecionar para a página inicial (login) se não estiver autenticado
  if (!user) {
    console.log('🚨 No user found in ProtectedLayout');
    console.log('Current state:', {
      authLoading: loading,
      projectLoading: isLoading,
      onboardingReady,
      isInitializing,
      authCheckComplete,
      hostname: window.location.hostname
    });
    
    // Double check localStorage for any auth data
    const authKeys = Object.keys(localStorage).filter(key => key.includes('supabase') || key.includes('auth') || key.includes('sb-'));
    console.log('Auth keys in localStorage:', authKeys);
    
    // IMPORTANTE: Se há tokens de autenticação mas não há usuário ainda,
    // aguardar mais um pouco antes de redirecionar
    if (authKeys.some(key => key.includes('auth-token'))) {
      console.log('🔄 Auth tokens found but no user yet, waiting...');
      return (
        <div style={{
          height: '100vh',
          backgroundColor: getThemeBackground(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <LoadingDataIndicator />
        </div>
      );
    }
    
    return <Navigate to="/" replace />;
  }
  
  // Se chegou aqui, o usuário está autenticado e o carregamento foi concluído
  
  // REMOVIDO: Redirecionamento automático para /create-project
  // O usuário agora pode acessar o dashboard mesmo sem projetos
  // e criar projetos através do EmptyState no dashboard
  /*
  if (!hasProjects) {
    return (
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="*" element={<Navigate to="/create-project" replace />} />
            <Route path="/create-project" element={<ProjectCreationPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    );
  }
  */
  
  // REMOVIDO: Redirecionamento automático para projetos sem integrações
  // O usuário pode configurar integrações através do dashboard
  /*
  if (projects.length === 1 && projectIntegrations.length === 0) {
    console.log('Usuário tem apenas 1 projeto sem integrações, redirecionando para criação de projeto');
    return (
      <AppContainer>
        <MainContent>
          <Header toggleSidebar={toggleSidebar} />
          <ContentWrapper>
            <Routes>
              <Route path="*" element={<Navigate to="/create-project" replace />} />
              <Route path="/create-project" element={<ProjectCreationPage />} />
            </Routes>
          </ContentWrapper>
        </MainContent>
      </AppContainer>
    );
  }
  */
  
  // Para o onboarding, esconder completamente a sidebar e qualquer outro componente de layout
  if (isOnboarding) {
    return (
      <Routes>
        <Route path="*" element={
          <div 
            style={{ 
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#f0f2f5",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
          >
            {/* Header fixo simples */}
            <div 
              style={{ 
                height: "70px", 
                backgroundColor: "#1e2a3d",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                fontWeight: "bold",
                fontSize: "24px"
              }}
            >
              SALES ADVOCATES
            </div>
            
            {/* Container de conteúdo */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              <ProjectCreationPage />
            </div>
          </div>
        } />
      </Routes>
    );
  }
  
  // Interface completa para usuários que já completaram o onboarding
  // Ou usuários que estão adicionando novo projeto (sempre mostrar header)
  return (
    <Routes>
      {/* Rota para criação de projeto - sem Sidebar e sem Header */}
      <Route path="/create-project" element={
        <AppContainer>
          <MainContent style={{ width: '100%' }}>
            {/* Header removido da página de criação de projeto */}
            <ContentWrapper>
              <ProjectCreationPage />
            </ContentWrapper>
          </MainContent>
        </AppContainer>
      } />
      
      {/* Todas as outras rotas - com Sidebar */}
      <Route path="*" element={
        <AppContainer>
          {/* Sidebar - desktop mode it's controlled by media query, mobile by state */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => toggleSidebar()} 
          />
          <MainContent>
            <Header toggleSidebar={toggleSidebar} />
            <ContentWrapper>
              <Routes>
                <Route index element={<ProcessingWrapper><Overview /></ProcessingWrapper>} />
                <Route path="dashboard" element={<ProcessingWrapper><Overview /></ProcessingWrapper>} />
                <Route path="monitoring" element={<ProcessingWrapper><Monitoring /></ProcessingWrapper>} />
                <Route path="mentions" element={<ProcessingWrapper><Mentions /></ProcessingWrapper>} />
                <Route path="videos" element={<ProcessingWrapper><VideoManager /></ProcessingWrapper>} />
                <Route path="settings" element={<Settings />} />
                <Route path="integrations" element={<ProcessingWrapper><Integrations /></ProcessingWrapper>} />
                <Route path="url-test" element={<UrlDataTest />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </ContentWrapper>
            <Footer />
          </MainContent>
          
          {/* Floating hamburger menu button for mobile */}
          <FloatingMenuButton onClick={toggleSidebar}>
            <IconComponent icon={FaIcons.FaBars} />
          </FloatingMenuButton>
        </AppContainer>
      } />
    </Routes>
  );
}

// Componente para lidar com callbacks de autenticação
const AuthCallback = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && user) {
      // Usuário autenticado - ir para dashboard
      window.location.href = '/dashboard';
    } else if (!loading && !user) {
      // Sem usuário - ir para login
      window.location.href = '/login';
    }
  }, [user, loading]);
  
  return <LoadingDataIndicator />;
};

export default App;
