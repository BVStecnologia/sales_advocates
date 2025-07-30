import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { FaYoutube, FaChartLine, FaBell, FaRocket, FaCheck, FaArrowRight, FaPlay, FaQuoteLeft, FaGlobe, FaSun, FaMoon, FaShieldAlt, FaClock, FaUsers, FaTrophy, FaFire, FaDollarSign, FaExclamationTriangle, FaLock, FaInfinity } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { BiPulse } from 'react-icons/bi';
import { MdAutoGraph, MdTrendingUp } from 'react-icons/md';
import { AiOutlineCalculator } from 'react-icons/ai';
import { renderIcon } from '../utils/IconHelper';
import { useTheme } from '../context/ThemeContext';
import Cookies from 'js-cookie';
import Testimonials from '../components/Testimonials';

// Animações
const shimmerAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

// Internacionalização
const translations = {
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      testimonials: "Testimonials",
      login: "Sign In",
    },
    hero: {
      badge: "Strategic Comment Management",
      title: "Manage Comments and",
      titleHighlight: "Discover Opportunities",
      subtitle: "Sales Advocates, powered by Liftlio Growth Engine, helps you manage YouTube comments strategically and discover relevant channels in your niche. Organize comments for manual review and build authentic relationships with your community.",
      cta: {
        primary: "Start Growing Today",
        secondary: "See How It Works"
      },
      metrics: {
        mentions: "Mentions",
        positive: "Positive",
        leads: "Advocates"
      }
    },
    features: {
      title: "Features That",
      titleHighlight: "Drive Results",
      subtitle: "Tools to help you manage comments and discover engagement opportunities",
      items: [
        {
          title: "Channel Discovery",
          description: "Discover relevant channels in your niche. Find opportunities to engage with your target audience through thoughtful comments."
        },
        {
          title: "Sentiment Organization",
          description: "Our system helps organize comments by sentiment, making it easy for you to prioritize which ones to respond to manually."
        },
        {
          title: "Comment Management",
          description: "Organize and manage your YouTube comments efficiently. Keep track of your responses and build genuine relationships."
        },
        {
          title: "Long-Term Relationships",
          description: "Build lasting connections with your audience. Your thoughtful responses create ongoing engagement opportunities."
        },
        {
          title: "Response Organization",
          description: "Organize your responses by priority and context. Manage your engagement strategy with our intuitive dashboard."
        },
        {
          title: "Compliant Engagement",
          description: "Follow YouTube's best practices for authentic engagement. Build your community the right way with manual, thoughtful responses."
        }
      ]
    },
    stats: {
      monitored: "Comments Organized",
      leads: "Comments Organized",
      accuracy: "Organization Accuracy",
      tracking: "Channels Tracked"
    },
    exponential: {
      title: "Build Lasting",
      titleHighlight: "Community Connections",
      subtitle: "Sales Advocates helps you build genuine relationships through organized comment management",
      items: [
        {
          month: "Month 1",
          value: "147",
          description: "Initial comments on new videos"
        },
        {
          month: "Month 3",
          value: "892",
          description: "Comments accumulate as videos gain views"
        },
        {
          month: "Month 6",
          value: "3,241",
          description: "Older videos continue bringing traffic"
        },
        {
          month: "Month 12",
          value: "12,847",
          description: "Exponential growth from all comments"
        }
      ],
      benefits: [
        "Build authentic relationships with your audience",
        "Organize comments for efficient management",
        "Establish authority through thoughtful responses",
        "Create lasting connections with your community"
      ]
    },
    process: {
      title: "How Sales Advocates",
      titleHighlight: "Works",
      subtitle: "Our organized 6-step process helps you build genuine connections through thoughtful engagement",
      steps: [
        {
          title: "Channel Discovery",
          description: "Discover relevant channels and check for new videos when you want"
        },
        {
          title: "Video Analysis",
          description: "Organize videos by topics and themes, making it easier to find engagement opportunities"
        },
        {
          title: "Comment Organization",
          description: "Organize and categorize comments from potential customers for efficient response"
        },
        {
          title: "Thoughtful Responses",
          description: "Craft helpful comments with specific references (e.g., 'at 3:42 they mention...')"
        },
        {
          title: "Authentic Engagement",
          description: "Balance promotional and helpful content to build genuine community connections"
        },
        {
          title: "Snowball Effect",
          description: "Comments stay forever, continuously bringing engaged visitors as videos grow"
        }
      ]
    },
    pricing: {
      title: "Simple Pricing,",
      titleHighlight: "No Hidden Fees",
      subtitle: "Choose the plan that fits your needs",
      monthly: "per month",
      plans: {
        single: {
          name: "Single Project",
          price: "$10",
          description: "Perfect for managing one YouTube channel",
          features: [
            "1 YouTube channel",
            "Unlimited comment organization",
            "Channel discovery tools",
            "Comment management dashboard",
            "Export comments to CSV",
            "Email support"
          ]
        },
        multi: {
          name: "Multiple Projects",
          price: "$20",
          description: "For agencies and creators with multiple channels",
          badge: "Best Value",
          features: [
            "Unlimited YouTube channels",
            "All Single Project features",
            "Cross-channel analytics",
            "Team collaboration tools",
            "Priority support",
            "Advanced export options"
          ]
        }
      },
      cta: "Start Free Trial"
    },
    testimonials: {
      title: "What Our",
      titleHighlight: "Customers Say",
      subtitle: "See how companies are transforming mentions into growth",
      items: [
        {
          text: "Sales Advocates transformed how we manage comments. We can now organize and respond to our community more effectively.",
          author: "Sarah Johnson",
          role: "CMO, TechStart"
        },
        {
          text: "The comment organization tools helped us identify important feedback and improve our customer service.",
          author: "Michael Chen",
          role: "CEO, E-commerce Plus"
        },
        {
          text: "Amazing results! In just 3 months, Sales Advocates helped us build stronger relationships with our audience.",
          author: "Jessica Miller",
          role: "Sales Director, SaaS Co"
        }
      ]
    },
    cta: {
      title: "Ready to",
      titleHighlight: "Transform",
      titleEnd: "Your Mentions?",
      subtitle: "Join thousands of companies already converting mentions into real business opportunities",
      button: "Start Growing Your Traffic Today"
    },
    footer: {
      description: "Helping creators manage YouTube comments efficiently and build authentic relationships with their audience.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      links: {
        features: "Features",
        pricing: "Pricing",
        integrations: "Integrations",
        api: "API",
        about: "About",
        blog: "Blog",
        careers: "Careers",
        contact: "Contact",
        privacy: "Privacy",
        terms: "Terms",
        security: "Security"
      },
      copyright: "© 2024 Sales Advocates. All rights reserved."
    }
  },
  pt: {
    nav: {
      features: "Recursos",
      pricing: "Preços",
      testimonials: "Depoimentos",
      login: "Entrar",
    },
    hero: {
      badge: "Gestão Estratégica de Comentários",
      title: "Gerencie Comentários e",
      titleHighlight: "Descubra Oportunidades",
      subtitle: "O Sales Advocates, impulsionado pelo Liftlio Growth Engine, ajuda você a gerenciar comentários do YouTube de forma estratégica e descobrir canais relevantes do seu nicho. Organize comentários para revisão manual e construa relacionamentos autênticos com sua comunidade.",
      cta: {
        primary: "Comece a Crescer Hoje",
        secondary: "Veja Como Funciona"
      },
      metrics: {
        mentions: "Menções",
        positive: "Positivas",
        leads: "Advocates"
      }
    },
    features: {
      title: "Recursos que",
      titleHighlight: "Geram Resultados",
      subtitle: "Ferramentas para ajudar você a gerenciar comentários e descobrir oportunidades de engajamento",
      items: [
        {
          title: "Descoberta de Canais",
          description: "Descubra canais relevantes do seu nicho. Encontre oportunidades para engajar com seu público-alvo através de comentários pensados."
        },
        {
          title: "Organização por Sentimento",
          description: "Nosso sistema ajuda a organizar comentários por sentimento, facilitando para você priorizar quais responder manualmente."
        },
        {
          title: "Gestão de Comentários",
          description: "Organize e gerencie seus comentários do YouTube com eficiência. Acompanhe suas respostas e construa relacionamentos genuínos."
        },
        {
          title: "Relacionamentos Duradouros",
          description: "Construa conexões duradouras com seu público. Suas respostas pensadas criam oportunidades contínuas de engajamento."
        },
        {
          title: "Organização de Respostas",
          description: "Organize suas respostas por prioridade e contexto. Gerencie sua estratégia de engajamento com nosso painel intuitivo."
        },
        {
          title: "Engajamento Conforme",
          description: "Siga as melhores práticas do YouTube para engajamento autêntico. Construa sua comunidade do jeito certo com respostas manuais e pensadas."
        }
      ]
    },
    stats: {
      monitored: "Comentários Organizados",
      leads: "Comentários Organizados",
      accuracy: "Precisão da Organização",
      tracking: "Canais Acompanhados"
    },
    exponential: {
      title: "O Efeito",
      titleHighlight: "Bola de Neve",
      subtitle: "O Sales Advocates ajuda você a construir relacionamentos genuínos através da gestão organizada de comentários e respostas pensadas",
      items: [
        {
          month: "Mês 1",
          value: "147",
          description: "Comentários iniciais em novos vídeos"
        },
        {
          month: "Mês 3",
          value: "892",
          description: "Comentários acumulam conforme vídeos ganham views"
        },
        {
          month: "Mês 6",
          value: "3.241",
          description: "Vídeos antigos continuam trazendo tráfego"
        },
        {
          month: "Mês 12",
          value: "12.847",
          description: "Crescimento exponencial de todos comentários"
        }
      ],
      benefits: [
        "Construa relacionamentos autênticos com seu público",
        "Organize comentários para gerenciamento eficiente",
        "Estabeleça autoridade através de respostas pensadas",
        "Crie conexões duradouras com sua comunidade"
      ]
    },
    process: {
      title: "Como o Sales Advocates",
      titleHighlight: "Funciona",
      subtitle: "Nosso processo organizado de 6 etapas cria uma bola de neve de tráfego orgânico que cresce continuamente",
      steps: [
        {
          title: "Descoberta de Canais",
          description: "Descubra canais relevantes e verifique novos vídeos quando desejar"
        },
        {
          title: "Análise de Vídeos",
          description: "Organize vídeos por tópicos e temas, facilitando encontrar oportunidades de engajamento"
        },
        {
          title: "Organização de Comentários",
          description: "Organize e categorize comentários de potenciais clientes para resposta eficiente"
        },
        {
          title: "Respostas Pensadas",
          description: "Crie comentários úteis com referências específicas (ex: 'aos 3:42 eles mencionam...')"
        },
        {
          title: "Engajamento Autêntico",
          description: "Equilibre conteúdo promocional e útil para construir conexões genuínas com a comunidade"
        },
        {
          title: "Efeito Bola de Neve",
          description: "Comentários ficam para sempre, trazendo visitantes engajados continuamente conforme vídeos crescem"
        }
      ]
    },
    pricing: {
      title: "Preços Simples,",
      titleHighlight: "Sem Taxas Ocultas",
      subtitle: "Escolha o plano que atende suas necessidades",
      monthly: "por mês",
      plans: {
        single: {
          name: "Projeto Único",
          price: "R$ 50",
          description: "Perfeito para gerenciar um canal do YouTube",
          features: [
            "1 canal do YouTube",
            "Organização ilimitada de comentários",
            "Ferramentas de descoberta de canais",
            "Dashboard de gerenciamento",
            "Exportar comentários para CSV",
            "Suporte por email"
          ]
        },
        multi: {
          name: "Múltiplos Projetos",
          price: "R$ 100",
          description: "Para agências e criadores com vários canais",
          badge: "Melhor Valor",
          features: [
            "Canais ilimitados do YouTube",
            "Todos os recursos do Projeto Único",
            "Análise entre canais",
            "Ferramentas de colaboração",
            "Suporte prioritário",
            "Opções avançadas de exportação"
          ]
        }
      },
      cta: "Iniciar Teste Gratuito"
    },
    testimonials: {
      title: "O Que Nossos",
      titleHighlight: "Clientes Dizem",
      subtitle: "Veja como empresas estão transformando menções em crescimento",
      items: [
        {
          text: "O Sales Advocates transformou como gerenciamos comentários. Agora podemos organizar e responder nossa comunidade de forma mais eficaz.",
          author: "Ana Silva",
          role: "CMO, TechStart"
        },
        {
          text: "As ferramentas de organização de comentários nos ajudaram a identificar feedbacks importantes e melhorar nosso atendimento.",
          author: "Carlos Mendes",
          role: "CEO, E-commerce Plus"
        },
        {
          text: "Resultados incríveis! Em apenas 3 meses, o Sales Advocates nos ajudou a construir relacionamentos mais fortes com nosso público.",
          author: "Juliana Costa",
          role: "Diretora de Vendas, SaaS Co"
        }
      ]
    },
    cta: {
      title: "Pronto para",
      titleHighlight: "Transformar",
      titleEnd: "suas Menções?",
      subtitle: "Junte-se a milhares de empresas que já estão convertendo menções em oportunidades reais",
      button: "Comece a Crescer seu Tráfego Hoje"
    },
    footer: {
      description: "Ajudando criadores a gerenciar comentários do YouTube de forma eficiente e construir relacionamentos autênticos com seu público.",
      product: "Produto",
      company: "Empresa",
      legal: "Legal",
      links: {
        features: "Recursos",
        pricing: "Preços",
        integrations: "Integrações",
        api: "API",
        about: "Sobre",
        blog: "Blog",
        careers: "Carreiras",
        contact: "Contato",
        privacy: "Privacidade",
        terms: "Termos",
        security: "Segurança"
      },
      copyright: "© 2024 Sales Advocates. Todos os direitos reservados."
    }
  }
};

// Animations
const slideUp = keyframes`
  from {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`;

// Styled Components com suporte a tema
const LandingContainer = styled.div`
  font-family: 'Inter', sans-serif;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  overflow-x: hidden;
  position: relative;
  transition: background 0.3s ease, color 0.3s ease;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 64px;
  background: ${props => props.theme.colors.headerBg};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 16px 32px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  background: ${props => props.theme.colors.gradient.landing};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LangButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const LoginButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.borderLight};
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.cardBg};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 64px 80px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 100px 32px 60px;
  }

  @media (max-width: 480px) {
    padding: 80px 16px 40px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${props => props.theme.name === 'dark' ? 0.3 : 0.1};
  background: radial-gradient(circle at 20% 50%, ${props => props.theme.colors.primaryAlpha} 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, ${props => props.theme.colors.secondaryAlpha} 0%, transparent 50%);
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  position: relative;
  text-align: center;

  @media (min-width: 968px) {
    max-width: 1440px;
  }
`;

const HeroText = styled.div``;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.theme.colors.badgeBg};
  border: 1px solid ${props => props.theme.colors.badgeBorder};
  padding: 8px 16px;
  border-radius: 100px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  animation: ${pulseAnimation} 3s infinite;
`;

const Title = styled.h1`
  font-size: 72px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const Gradient = styled.span`
  background: ${props => props.theme.colors.gradient.landing};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 20px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  background: ${props => props.theme.colors.gradient.landing};
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px ${props => props.theme.colors.primaryAlpha};
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border: 2px solid ${props => props.theme.colors.borderLight};
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.theme.colors.cardBg};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 60px;

  @media (max-width: 968px) {
    margin-top: 40px;
  }
`;

const DashboardPreview = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${props => props.theme.name === 'light' 
    ? 'rgba(255, 255, 255, 0.95)' 
    : props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px ${props => props.theme.colors.shadowLarge};

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.theme.colors.primaryAlpha} 0%, transparent 70%);
    animation: ${pulseAnimation} 4s ease-in-out infinite;
  }
`;

const DashboardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  position: relative;
  z-index: 1;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;

const MetricCard = styled.div`
  background: ${props => props.theme.colors.metricCardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.shimmer}, transparent);
    animation: ${shimmerAnimation} 3s infinite;
  }
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FloatingElement = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.floatingBg};
  border: 1px solid ${props => props.theme.colors.floatingBorder};
  border-radius: 12px;
  padding: 16px;
  animation: ${floatAnimation} 6s ease-in-out infinite;
`;


const LiveCounter = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  background: ${props => props.theme.colors.gradient.landing};
  color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 999;
  min-width: 200px;
  animation: ${slideUp} 0.5s ease-out;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LiveCounterTitle = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LiveCounterNumber = styled.div`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 4px;
`;

const LiveCounterLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const TrustSection = styled.section`
  padding: 60px 64px;
  background: ${props => props.theme.colors.trustBg};
  border-top: 1px solid ${props => props.theme.colors.borderLight};
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};

  @media (max-width: 768px) {
    padding: 40px 32px;
  }
`;

const TrustContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TrustIcon = styled.div`
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
`;

const TrustText = styled.div``;

const TrustValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
`;

const TrustLabel = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const PainPointsSection = styled.section`
  padding: 100px 64px;
  background: linear-gradient(135deg, 
    ${props => props.theme.name === 'dark' 
      ? 'rgba(255, 0, 0, 0.05)' 
      : 'rgba(255, 0, 0, 0.02)'} 0%, 
    ${props => props.theme.colors.background} 100%
  );
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 32px;
  }
`;

const PainPointsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const PainPointCard = styled.div`
  text-align: center;
  padding: 40px;
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadowLarge};
    border-color: rgba(255, 0, 0, 0.3);
  }
`;

const PainPointIcon = styled.div<{ icon: string }>`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: ${props => props.icon === 'fire' 
    ? 'linear-gradient(135deg, #FF6B6B 0%, #FF0000 100%)'
    : props.icon === 'warning'
    ? 'linear-gradient(135deg, #FFD93D 0%, #FF9800 100%)'
    : 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
  };
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
`;

const PainPointTitle = styled.h3`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.text.primary};
`;

const PainPointDescription = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const CalculatorSection = styled.section`
  padding: 100px 64px;
  background: ${props => props.theme.colors.background};
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 32px;
  }
`;

const CalculatorContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 60px ${props => props.theme.colors.shadowLarge};

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const CalculatorInput = styled.div`
  margin-bottom: 40px;
`;

const CalculatorLabel = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.text.primary};
`;

const CalculatorSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.borderLight};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.theme.colors.gradient.landing};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.theme.colors.gradient.landing};
    cursor: pointer;
  }
`;

const CalculatorValue = styled.div`
  text-align: center;
  font-size: 48px;
  font-weight: 900;
  background: ${props => props.theme.colors.gradient.landing};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 20px 0;
`;

const CalculatorResults = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 40px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div<{ highlight?: boolean }>`
  padding: 24px;
  background: ${props => props.highlight 
    ? props.theme.colors.gradient.landing 
    : props.theme.colors.metricCardBg};
  border: 1px solid ${props => props.highlight 
    ? 'transparent' 
    : props.theme.colors.borderLight};
  border-radius: 12px;
  text-align: center;
  color: ${props => props.highlight ? 'white' : 'inherit'};
`;

const ResultLabel = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 8px;
`;

const ResultValue = styled.div`
  font-size: 32px;
  font-weight: 800;
`;

const LiveDemoSection = styled.section`
  padding: 100px 64px;
  background: ${props => props.theme.colors.featuresBg};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 32px;
  }
`;

const LiveDemoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ActivityFeed = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 16px;
  padding: 32px;
  max-height: 400px;
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  margin-bottom: 16px;
  background: ${props => props.theme.colors.metricCardBg};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    box-shadow: 0 5px 20px ${props => props.theme.colors.shadowMedium};
  }
`;

const ActivityIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.gradient.landing};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.text.primary};
`;

const ActivityTime = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const UrgencyBanner = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.colors.gradient.landing};
  color: white;
  padding: 16px 32px;
  border-radius: 100px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  animation: ${slideUp} 0.5s ease-out;

  @media (max-width: 640px) {
    width: calc(100% - 40px);
    padding: 12px 20px;
    font-size: 14px;
  }
`;

const FeaturesSection = styled.section`
  padding: 100px 64px;
  background: ${props => props.theme.colors.featuresBg};
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 32px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 16px;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.cardHoverBg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.gradient.landing};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.gradient.landing};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${props => props.theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const VisualDemoSection = styled.section`
  padding: 100px 64px;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 32px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const DemoGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const DemoCard = styled.div<{ reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  ${props => props.reverse && `
    direction: rtl;
    & > * {
      direction: ltr;
    }
  `}

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    direction: ltr;
    
    & > * {
      direction: ltr;
    }
  }
`;

const DemoImage = styled.img`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 60px ${props => props.theme.colors.shadowLarge};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const DemoContent = styled.div`
  max-width: 500px;
`;

const DemoTitle = styled.h3`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.text.primary};

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const DemoDescription = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const ProcessSection = styled.section`
  padding: 100px 64px;
  background: linear-gradient(180deg, 
    ${props => props.theme.colors.background} 0%, 
    ${props => props.theme.colors.statsBg} 100%
  );
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 32px;
  }
`;

const ProcessGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  position: relative;
`;

const ProcessNumber = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.gradient.landing};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin: 0 auto 20px;
  position: relative;
  z-index: 2;
`;

const ProcessTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${props => props.theme.colors.text.primary};
`;

const ProcessDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const ProcessConnector = styled.div`
  position: absolute;
  top: 30px;
  left: 60px;
  right: -40px;
  height: 2px;
  background: ${props => props.theme.colors.borderLight};
  z-index: 1;

  @media (max-width: 968px) {
    display: none;
  }
`;

const ComparisonSection = styled.section`
  padding: 100px 64px;
  background: ${props => props.theme.colors.background};

  @media (max-width: 768px) {
    padding: 60px 32px;
  }
`;

const ComparisonImage = styled.img`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: block;
  border-radius: 16px;
  box-shadow: 0 20px 60px ${props => props.theme.colors.shadowLarge};
`;

// Laptop mockup components
const LaptopContainer = styled.div`
  position: relative;
  max-width: 100%;
  margin: 0 auto;
`;

const LaptopScreen = styled.div`
  position: relative;
  background: #1a1a1a;
  border-radius: 12px 12px 0 0;
  padding: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 20px 40px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #333;
    border-radius: 50%;
  }
`;

const LaptopScreenContent = styled.div`
  position: relative;
  background: #000;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%, 
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
  }
`;

const LaptopBase = styled.div`
  background: linear-gradient(to bottom, #c5c5c5 0%, #a8a8a8 100%);
  height: 20px;
  border-radius: 0 0 20px 20px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #888;
    border-radius: 0 0 10px 10px;
  }
`;

const LaptopWrapper = styled.div<{ rotate?: number; scale?: number }>`
  transform: ${props => `perspective(1000px) rotateY(${props.rotate || 0}deg) scale(${props.scale || 1})`};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: ${props => `perspective(1000px) rotateY(${props.rotate || 0}deg) scale(${(props.scale || 1) * 1.05})`};
  }
`;


const ExponentialSection = styled.section`
  padding: 100px 64px;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primaryAlpha} 0%, 
    ${props => props.theme.colors.secondaryAlpha} 100%
  );
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 32px;
  }
`;

const ExponentialContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ExponentialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 60px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ExponentialItem = styled.div`
  text-align: center;
  padding: 32px;
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadowLarge};
  }
`;

const ExponentialMonth = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const ExponentialValue = styled.div`
  font-size: 48px;
  font-weight: 900;
  background: ${props => props.theme.colors.gradient.landing};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
`;

const ExponentialDescription = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 12px;
`;

const BenefitIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.gradient.landing};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const BenefitText = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 80px 64px;
  background: ${props => props.theme.colors.statsBg};

  @media (max-width: 768px) {
    padding: 60px 32px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  text-align: center;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 900;
  background: ${props => props.theme.colors.gradient.landing};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 18px;
  color: ${props => props.theme.colors.textSecondary};
`;

const PricingSection = styled.section`
  padding: 100px 64px;
  background: ${props => props.theme.colors.pricingBg};

  @media (max-width: 768px) {
    padding: 60px 32px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const PricingGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const PricingCard = styled.div<{ featured?: boolean }>`
  background: ${props => props.featured ? props.theme.colors.pricingFeaturedBg : props.theme.colors.cardBg};
  border: 1px solid ${props => props.featured ? props.theme.colors.primary : props.theme.colors.borderLight};
  border-radius: 16px;
  padding: 40px 32px;
  position: relative;
  transition: all 0.3s ease;

  ${props => props.featured && css`
    transform: scale(1.05);
    
    @media (max-width: 968px) {
      transform: scale(1);
    }
  `}

  &:hover {
    transform: ${props => props.featured ? 'scale(1.08)' : 'translateY(-5px)'};
    
    @media (max-width: 968px) {
      transform: translateY(-5px);
    }
  }
`;

const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.colors.gradient.landing};
  color: white;
  padding: 4px 16px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const PricingPlan = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.text.primary};
`;

const PricingPrice = styled.div`
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text.primary};
  
  span {
    font-size: 20px;
    font-weight: 400;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const PricingDescription = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 32px;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 32px;
`;

const PricingFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.text.primary};
  
  svg {
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
  }
`;

const TestimonialsSection = styled.section`
  padding: 100px 64px;
  background: ${props => props.theme.colors.testimonialsBg};

  @media (max-width: 768px) {
    padding: 60px 32px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

const TestimonialsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 16px;
  padding: 32px;
  position: relative;
`;

const QuoteIcon = styled.div`
  font-size: 48px;
  color: ${props => props.theme.colors.primaryAlpha};
  margin-bottom: 16px;
`;

const TestimonialText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 24px;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient.landing};
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.theme.colors.text.primary};
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const CTASection = styled.section`
  padding: 120px 64px;
  text-align: center;
  background: ${props => props.theme.colors.ctaBg};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 32px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.theme.colors.primaryAlpha} 0%, transparent 70%);
    animation: ${pulseAnimation} 6s ease-in-out infinite;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 24px;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const CTADescription = styled.p`
  font-size: 20px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 40px;
`;

const Footer = styled.footer`
  padding: 60px 64px 40px;
  background: ${props => props.theme.colors.footerBg};
  border-top: 1px solid ${props => props.theme.colors.borderLight};

  @media (max-width: 768px) {
    padding: 40px 32px;
  }

  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`;

const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${props => props.theme.name === 'light' ? '#ffffff' : props.theme.colors.text.primary};
`;

const FooterDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.name === 'light' ? 'rgba(255, 255, 255, 0.8)' : props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 12px;
  
  a {
    color: ${props => props.theme.name === 'light' ? 'rgba(255, 255, 255, 0.7)' : props.theme.colors.textSecondary};
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.name === 'light' ? '#ffffff' : props.theme.colors.primary};
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 60px;
  padding-top: 32px;
  border-top: 1px solid ${props => props.theme.name === 'light' ? 'rgba(255, 255, 255, 0.2)' : props.theme.colors.borderLight};
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.name === 'light' ? 'rgba(255, 255, 255, 0.6)' : props.theme.colors.textSecondary};
`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  // Get initial language from cookie or browser preference
  const getInitialLanguage = (): 'en' | 'pt' => {
    // First check cookie
    const savedLang = Cookies.get('language');
    if (savedLang === 'pt' || savedLang === 'en') {
      return savedLang;
    }
    
    // Then check browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  };

  const [lang, setLang] = useState<'en' | 'pt'>(getInitialLanguage());
  const t = translations[lang];
  
  // Debug
  useEffect(() => {
    console.log('Current language:', lang);
    console.log('Translations available:', Object.keys(translations));
    console.log('Current translations:', t);
  }, [lang, t]);
  
  
  // Live counter state
  const [liveVisitorCount, setLiveVisitorCount] = useState(12847);
  const [recentActivity, setRecentActivity] = useState([
    { channel: "Tech Reviews Brasil", time: "2 min ago", visitors: 47 },
    { channel: "Marketing Digital Pro", time: "5 min ago", visitors: 82 },
    { channel: "Empreendedor Online", time: "8 min ago", visitors: 134 }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show urgency banner after 10 seconds - DISABLED
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowUrgencyBanner(true);
  //   }, 10000);
  //   
  //   return () => clearTimeout(timer);
  // }, []);
  
  // Animate live visitor counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitorCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleDemo = () => {
    // Implementar demonstração
    window.open('https://www.youtube.com/watch?v=demo', '_blank');
  };

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'pt' : 'en';
    console.log('Toggling language from', lang, 'to', newLang);
    setLang(newLang);
    // Save preference in cookie (expires in 365 days)
    Cookies.set('language', newLang, { expires: 365, path: '/' });
  };

  const renderSubtitleWithLink = (text: string) => {
    const parts = text.split(/(Liftlio)/g);
    return (
      <>
        {parts.map((part, index) => 
          part === 'Liftlio' ? (
            <a 
              key={index}
              href="https://liftlio.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: theme.colors.primary,
                textDecoration: 'none',
                fontWeight: 'bold',
                borderBottom: `2px solid ${theme.colors.primary}`
              }}
            >
              {part}
            </a>
          ) : (
            part
          )
        )}
      </>
    );
  };


  return (
    <LandingContainer>
      {/* Privacy Policy Banner for Google OAuth Compliance - EXTREMELY VISIBLE */}
      <div style={{
        background: theme.name === 'dark' ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 123, 255, 0.1)',
        padding: '16px 0',
        textAlign: 'center',
        fontSize: '16px',
        borderBottom: '2px solid ' + theme.colors.primary,
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <strong style={{ color: theme.colors.text.primary, marginRight: '15px' }}>
            📋 Important Legal Information:
          </strong>
          <a href="/privacy" style={{ 
            color: theme.colors.primary, 
            marginRight: '20px',
            fontWeight: 'bold',
            fontSize: '18px',
            textDecoration: 'underline',
            padding: '4px 8px',
            background: theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '4px'
          }}>
            Privacy Policy
          </a>
          <a href="/terms" style={{ 
            color: theme.colors.primary, 
            marginRight: '20px',
            fontWeight: 'bold',
            fontSize: '18px',
            textDecoration: 'underline',
            padding: '4px 8px',
            background: theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '4px'
          }}>
            Terms of Service
          </a>
          <span style={{ color: theme.colors.text.secondary, fontSize: '14px' }}>
            | This application uses YouTube API Services
          </span>
        </div>
      </div>
      
      <Header style={{ 
        background: scrolled ? theme.colors.headerBgSolid : theme.colors.headerBg,
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)'
      }}>
        <HeaderContent>
          <Logo>
            {renderIcon(BiPulse)}
            SALES ADVOCATES
          </Logo>
          <Nav>
            <NavLink href="#features">{t.nav.features}</NavLink>
            <NavLink href="#pricing">{t.nav.pricing}</NavLink>
            <NavLink href="#testimonials">{t.nav.testimonials}</NavLink>
            <NavLink href="/privacy">Privacy</NavLink>
            <NavLink href="/terms">Terms</NavLink>
            <NavButtons>
              <LangButton onClick={toggleLanguage}>
                {renderIcon(FaGlobe)} {lang.toUpperCase()}
              </LangButton>
              <ThemeToggle onClick={toggleTheme}>
                {renderIcon(theme.name === 'dark' ? FaSun : FaMoon)}
              </ThemeToggle>
              <LoginButton onClick={handleLogin}>{t.nav.login}</LoginButton>
            </NavButtons>
          </Nav>
        </HeaderContent>
      </Header>

      {/* Live Counter */}
      {/* LiveCounter removido 
      <LiveCounter>
        <LiveCounterTitle>
          <span style={{ color: '#00ff00' }}>●</span>
          {lang === 'pt' ? 'AO VIVO' : 'LIVE'}
        </LiveCounterTitle>
        <LiveCounterNumber>
          {liveVisitorCount.toLocaleString()}
        </LiveCounterNumber>
        <LiveCounterLabel>
          {lang === 'pt' 
            ? 'visitantes engajados hoje' 
            : 'engaged visitors today'
          }
        </LiveCounterLabel>
      </LiveCounter> */}

      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <HeroText>
            <Badge>
              {renderIcon(HiSparkles)}
              <span>{t.hero.badge}</span>
            </Badge>
            <Title>
              {t.hero.title}
              <br />
              <Gradient>{t.hero.titleHighlight}</Gradient>
            </Title>
            <Description>
              {renderSubtitleWithLink(t.hero.subtitle)}
            </Description>
            
            {/* Privacy Policy Link - HIGHLY VISIBLE */}
            <div style={{
              margin: '20px 0',
              fontSize: '16px',
              color: theme.colors.text.secondary,
              textAlign: 'center'
            }}>
              <span>By using our service, you agree to our </span>
              <a href="/privacy" style={{
                color: theme.colors.primary,
                fontWeight: 'bold',
                textDecoration: 'underline',
                fontSize: '16px'
              }}>
                Privacy Policy
              </a>
              <span> and </span>
              <a href="/terms" style={{
                color: theme.colors.primary,
                fontWeight: 'bold',
                textDecoration: 'underline',
                fontSize: '16px'
              }}>
                Terms of Service
              </a>
            </div>
            
            <CTAButtons>
              <PrimaryButton onClick={handleGetStarted}>
                {renderIcon(FaRocket)}
                {t.hero.cta.primary}
              </PrimaryButton>
              <SecondaryButton onClick={handleDemo}>
                {renderIcon(FaPlay)}
                {t.hero.cta.secondary}
              </SecondaryButton>
            </CTAButtons>
            
            {/* Additional Privacy Policy Button - SUPER VISIBLE */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <a href="/privacy" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                  background: theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'white',
                  border: `2px solid ${theme.colors.primary}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                  📄 View Privacy Policy
                </button>
              </a>
              <a href="/terms" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                  background: theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'white',
                  border: `2px solid ${theme.colors.primary}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                  📋 Terms of Service
                </button>
              </a>
            </div>
          </HeroText>

          <HeroVisual>
            <DashboardPreview>
              <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '700' }}>
                Dashboard {lang === 'pt' ? 'de Organização' : 'Organization'}
              </h3>
              
              {/* Dashboard Visual Placeholder */}
              <div style={{
                background: theme.name === 'dark' 
                  ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(139, 0, 255, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(0, 245, 255, 0.05) 0%, rgba(139, 0, 255, 0.05) 100%)',
                border: `2px solid ${theme.colors.borderLight}`,
                borderRadius: '16px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                marginBottom: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                  <p style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>
                    {lang === 'pt' ? 'Visualização organizada' : 'Organized visualization'}
                  </p>
                </div>
              </div>
              
              <MetricsGrid>
                <MetricCard>
                  <MetricValue>2.8K</MetricValue>
                  <MetricLabel>{t.hero.metrics.mentions}</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>89%</MetricValue>
                  <MetricLabel>{t.hero.metrics.positive}</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>147</MetricValue>
                  <MetricLabel>{t.hero.metrics.leads}</MetricLabel>
                </MetricCard>
              </MetricsGrid>
            </DashboardPreview>
            
            {/* Elementos flutuantes */}
            <FloatingElement style={{ bottom: '40px', left: '-30px', animationDelay: '2s' }}>
              <span style={{ fontSize: '24px', color: theme.colors.secondary }}>{renderIcon(FaChartLine)}</span>
            </FloatingElement>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      {/* Trust Indicators */}
      <TrustSection>
        <TrustContainer>
          <TrustItem>
            <TrustIcon>{renderIcon(FaShieldAlt)}</TrustIcon>
            <TrustText>
              <TrustValue>100%</TrustValue>
              <TrustLabel>{lang === 'pt' ? 'Seguro' : 'Secure'}</TrustLabel>
            </TrustText>
          </TrustItem>
          <TrustItem>
            <TrustIcon>{renderIcon(FaClock)}</TrustIcon>
            <TrustText>
              <TrustValue>Daily</TrustValue>
              <TrustLabel>{lang === 'pt' ? 'Acompanhamento' : 'Updates'}</TrustLabel>
            </TrustText>
          </TrustItem>
          <TrustItem>
            <TrustIcon>{renderIcon(FaUsers)}</TrustIcon>
            <TrustText>
              <TrustValue>2,000+</TrustValue>
              <TrustLabel>{lang === 'pt' ? 'Clientes Ativos' : 'Active Clients'}</TrustLabel>
            </TrustText>
          </TrustItem>
          <TrustItem>
            <TrustIcon>{renderIcon(FaTrophy)}</TrustIcon>
            <TrustText>
              <TrustValue>95%</TrustValue>
              <TrustLabel>{lang === 'pt' ? 'Satisfação' : 'Satisfaction'}</TrustLabel>
            </TrustText>
          </TrustItem>
        </TrustContainer>
      </TrustSection>



      <FeaturesSection id="features">
        <FeaturesContainer>
          <SectionHeader>
            <SectionTitle>
              {t.features.title} <Gradient>{t.features.titleHighlight}</Gradient>
            </SectionTitle>
            <SectionDescription>
              {t.features.subtitle}
            </SectionDescription>
          </SectionHeader>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                {renderIcon(FaBell)}
              </FeatureIcon>
              <FeatureTitle>{t.features.items[0].title}</FeatureTitle>
              <FeatureDescription>
                {t.features.items[0].description}
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                {renderIcon(FaChartLine)}
              </FeatureIcon>
              <FeatureTitle>{t.features.items[1].title}</FeatureTitle>
              <FeatureDescription>
                {t.features.items[1].description}
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                {renderIcon(FaRocket)}
              </FeatureIcon>
              <FeatureTitle>{t.features.items[2].title}</FeatureTitle>
              <FeatureDescription>
                {t.features.items[2].description}
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                {renderIcon(FaYoutube)}
              </FeatureIcon>
              <FeatureTitle>{t.features.items[3].title}</FeatureTitle>
              <FeatureDescription>
                {t.features.items[3].description}
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                {renderIcon(MdAutoGraph)}
              </FeatureIcon>
              <FeatureTitle>{t.features.items[4].title}</FeatureTitle>
              <FeatureDescription>
                {t.features.items[4].description}
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                {renderIcon(HiLightningBolt)}
              </FeatureIcon>
              <FeatureTitle>{t.features.items[5].title}</FeatureTitle>
              <FeatureDescription>
                {t.features.items[5].description}
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>


      {/* Process Section */}
      <ProcessSection>
        <SectionHeader>
          <SectionTitle>
            {t.process.title} <Gradient>{t.process.titleHighlight}</Gradient>
          </SectionTitle>
          <SectionDescription>
            {t.process.subtitle}
          </SectionDescription>
        </SectionHeader>

        <ProcessGrid>
          {t.process.steps.map((step, index) => (
            <ProcessStep key={index}>
              <ProcessNumber>{index + 1}</ProcessNumber>
              <ProcessTitle>{step.title}</ProcessTitle>
              <ProcessDescription>{step.description}</ProcessDescription>
              {index < t.process.steps.length - 1 && index % 3 !== 2 && (
                <ProcessConnector />
              )}
            </ProcessStep>
          ))}
        </ProcessGrid>
      </ProcessSection>

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <StatNumber>10M+</StatNumber>
            <StatLabel>{t.stats.monitored}</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>50K+</StatNumber>
            <StatLabel>{t.stats.leads}</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>95%</StatNumber>
            <StatLabel>{t.stats.accuracy}</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>Daily</StatNumber>
            <StatLabel>{t.stats.tracking}</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      {/* Exponential Growth Section */}
      <ExponentialSection>
        <ExponentialContent>
          <SectionHeader>
            <SectionTitle>
              {t.exponential.title} <Gradient>{t.exponential.titleHighlight}</Gradient>
            </SectionTitle>
            <SectionDescription>
              {t.exponential.subtitle}
            </SectionDescription>
          </SectionHeader>

          <ExponentialGrid>
            {t.exponential.items.map((item, index) => (
              <ExponentialItem key={index}>
                <ExponentialMonth>{item.month}</ExponentialMonth>
                <ExponentialValue>{item.value}</ExponentialValue>
                <ExponentialDescription>{item.description}</ExponentialDescription>
              </ExponentialItem>
            ))}
          </ExponentialGrid>

          <BenefitsList>
            {t.exponential.benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <BenefitIcon>
                  {renderIcon(FaCheck)}
                </BenefitIcon>
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsList>
        </ExponentialContent>
      </ExponentialSection>

      <PricingSection id="pricing">
        <SectionHeader>
          <SectionTitle>
            {t.pricing.title} <Gradient>{t.pricing.titleHighlight}</Gradient>
          </SectionTitle>
          <SectionDescription>
            {t.pricing.subtitle}
          </SectionDescription>
        </SectionHeader>

        <PricingGrid style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '800px', margin: '0 auto' }}>
          <PricingCard>
            <PricingPlan>{t.pricing.plans.single.name}</PricingPlan>
            <PricingPrice>
              {t.pricing.plans.single.price}<span>/{t.pricing.monthly}</span>
            </PricingPrice>
            <PricingDescription>
              {t.pricing.plans.single.description}
            </PricingDescription>
            <PricingFeatures>
              {t.pricing.plans.single.features.map((feature, index) => (
                <PricingFeature key={index}>
                  {renderIcon(FaCheck)} {feature}
                </PricingFeature>
              ))}
            </PricingFeatures>
            <PrimaryButton onClick={handleGetStarted} style={{ width: '100%' }}>
              {t.pricing.cta}
            </PrimaryButton>
          </PricingCard>

          <PricingCard featured>
            <PricingBadge>{t.pricing.plans.multi.badge}</PricingBadge>
            <PricingPlan>{t.pricing.plans.multi.name}</PricingPlan>
            <PricingPrice>
              {t.pricing.plans.multi.price}<span>/{t.pricing.monthly}</span>
            </PricingPrice>
            <PricingDescription>
              {t.pricing.plans.multi.description}
            </PricingDescription>
            <PricingFeatures>
              {t.pricing.plans.multi.features.map((feature, index) => (
                <PricingFeature key={index}>
                  {renderIcon(FaCheck)} {feature}
                </PricingFeature>
              ))}
            </PricingFeatures>
            <PrimaryButton onClick={handleGetStarted} style={{ width: '100%' }}>
              {t.pricing.cta}
            </PrimaryButton>
          </PricingCard>
        </PricingGrid>
      </PricingSection>

      <div id="testimonials">
        <Testimonials language={lang} />
      </div>

      <CTASection style={{ background: theme.name === 'dark' ? '#1a1a1a' : '#f5f5f5' }}>
        <CTAContent>
          <CTATitle>
            {t.cta.title} <Gradient>{t.cta.titleHighlight}</Gradient> {t.cta.titleEnd}
          </CTATitle>
          <CTADescription>
            {t.cta.subtitle}
          </CTADescription>
          <PrimaryButton onClick={handleGetStarted} style={{ fontSize: '18px', padding: '20px 40px', margin: '0 auto' }}>
            {renderIcon(FaRocket)}
            {t.cta.button}
          </PrimaryButton>
        </CTAContent>
      </CTASection>

      <Footer>
        <FooterContent>
          <FooterColumn>
            <FooterTitle>
              <Logo style={{ 
                fontSize: '24px', 
                color: theme.name === 'light' ? '#ffffff' : theme.colors.primary,
                fontWeight: 900,
                opacity: 1
              }}>
                {renderIcon(BiPulse)}
                SALES ADVOCATES
              </Logo>
            </FooterTitle>
            <FooterDescription>
              {t.footer.description}
            </FooterDescription>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>{t.footer.product}</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="#features">{t.footer.links.features}</a></FooterLink>
              <FooterLink><a href="#pricing">{t.footer.links.pricing}</a></FooterLink>
              <FooterLink><a href="#">{t.footer.links.integrations}</a></FooterLink>
              <FooterLink><a href="#">{t.footer.links.api}</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>{t.footer.company}</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="/about">{t.footer.links.about}</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>{t.footer.legal}</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="/privacy">{t.footer.links.privacy}</a></FooterLink>
              <FooterLink><a href="/terms">{t.footer.links.terms}</a></FooterLink>
              <FooterLink><a href="/security">{t.footer.links.security}</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <div>{t.footer.copyright}</div>
          <div style={{ marginTop: '12px', fontSize: '12px', opacity: 0.8 }}>
            By using Sales Advocates, you agree to be bound by the{' '}
            <a 
              href="https://www.youtube.com/t/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: theme.colors.primary, textDecoration: 'none' }}
            >
              YouTube Terms of Service
            </a>
            . This application uses the YouTube API Services.
          </div>
          <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
            <a href="/privacy" style={{ color: theme.colors.primary, textDecoration: 'none', marginRight: '16px' }}>
              Privacy Policy
            </a>
            <a href="/terms" style={{ color: theme.colors.primary, textDecoration: 'none', marginRight: '16px' }}>
              Terms of Use
            </a>
            <a 
              href="https://www.youtube.com/t/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: theme.colors.primary, textDecoration: 'none' }}
            >
              YouTube Terms
            </a>
          </div>
        </FooterBottom>
      </Footer>

      {/* Urgency Banner - DISABLED */}
      {/* {showUrgencyBanner && (
        <UrgencyBanner>
          <span>{renderIcon(FaDollarSign)}</span>
          <span style={{ fontSize: '16px' }}>
            {t.urgency.price}
          </span>
          <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>
            {t.urgency.guarantee}
          </div>
        </UrgencyBanner>
      )} */}
    </LandingContainer>
  );
};

export default LandingPage;