import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  padding: 20px 0;
  border-top: 1px solid ${props => props.theme.name === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
  background-color: ${props => props.theme.name === 'dark' 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(255, 255, 255, 0.8)'};
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const FooterLinkInternal = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinkInternal to="/privacy">
          Privacy Policy
        </FooterLinkInternal>
        
        <FooterLinkInternal to="/terms">
          Terms of Service
        </FooterLinkInternal>
        
        <FooterLink 
          href="https://policies.google.com/privacy" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Privacy Policy Google
        </FooterLink>
        
        <FooterLink 
          href="https://www.youtube.com/t/terms" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          YouTube Terms of Service
        </FooterLink>
        
        <FooterLink 
          href="https://myaccount.google.com/security" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Google security settings page
        </FooterLink>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;