import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaLock, FaUserShield, FaDatabase } from 'react-icons/fa';
import { BiPulse } from 'react-icons/bi';
import { useLanguage } from '../context/LanguageContext';
import { IconComponent } from '../utils/IconHelper';
import InstitutionalWrapper from './InstitutionalWrapper';

const PrivacyContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
`;

const Header = styled.header`
  padding: 20px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  
  @media (max-width: 768px) {
    padding: 20px 32px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 900;
  color: ${props => props.theme.colors.primary};
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 32px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const LastUpdated = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 48px;
`;

const Section = styled.section`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionIcon = styled.span`
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const List = styled.ul`
  margin: 16px 0;
  padding-left: 24px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const Privacy: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const content = {
    en: {
      back: "Back",
      title: "Privacy Policy",
      lastUpdated: "Last updated: August 16, 2024",
      sections: {
        introduction: {
          title: "Introduction",
          icon: FaShieldAlt,
          content: "Welcome to Sales Advocates. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services, including our use of the YouTube API Services."
        },
        dataCollection: {
          title: "Information We Collect",
          icon: FaDatabase,
          content: "We collect information you provide directly to us, as well as data we receive from the YouTube API Services, including but not limited to:",
          items: [
            "Personal information (e.g., name, email address)",
            "YouTube account information",
            "Video viewing history and preferences",
            "Comments and interactions on YouTube"
          ]
        },
        dataUsage: {
          title: "How We Use Your Information",
          icon: FaUserShield,
          content: "We use the collected information for various purposes, including:",
          items: [
            "Providing and improving our services",
            "Personalizing user experience",
            "Analyzing usage patterns",
            "Communicating with users"
          ]
        },
        dataSharing: {
          title: "Data Sharing and Disclosure",
          icon: FaUserShield,
          content: "We may share your information with:",
          items: [
            "Service providers and partners who assist in our operations",
            "Legal authorities when required by law",
            "Other parties with your consent"
          ]
        },
        youtubeApi: {
          title: "YouTube API Services",
          icon: FaDatabase,
          content: "Our application uses the YouTube API Services. By using our service, you are also bound by YouTube's Terms of Service. Additionally, Google's Privacy Policy applies to our use of the YouTube API Services."
        },
        dataSecurity: {
          title: "Data Storage and Security",
          icon: FaLock,
          content: "We implement appropriate security measures to protect your data. Information obtained through the YouTube API Services is stored temporarily and is refreshed or deleted after 30 days."
        },
        yourRights: {
          title: "Your Rights and Choices",
          content: "You have the right to access, correct, or delete your personal information. You can also revoke our access to your YouTube data through the Google security settings page."
        },
        cookies: {
          title: "Cookies and Similar Technologies",
          content: "We use cookies and similar tracking technologies to collect and store certain information about your use of our services."
        },
        changes: {
          title: "Changes to This Policy",
          content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
        },
        contact: {
          title: "Contact Us",
          content: "If you have any questions about this Privacy Policy, please contact us at:",
          items: [
            "Email: privacy@salesadvocates.com",
            "Address: 1309 Coffeen Ave STE 1200, Sheridan, WY 82801"
          ]
        }
      }
    },
    pt: {
      back: "Voltar",
      title: "Política de Privacidade",
      lastUpdated: "Última atualização: 16 de Agosto de 2024",
      sections: {
        introduction: {
          title: "Introdução",
          icon: FaShieldAlt,
          content: "Bem-vindo ao Sales Advocates. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa nosso aplicativo e serviços, incluindo nosso uso dos Serviços da API do YouTube."
        },
        dataCollection: {
          title: "Informações que Coletamos",
          icon: FaDatabase,
          content: "Coletamos informações que você nos fornece diretamente, bem como dados que recebemos dos Serviços da API do YouTube, incluindo, mas não limitado a:",
          items: [
            "Informações pessoais (por exemplo, nome, endereço de e-mail)",
            "Informações da conta do YouTube",
            "Histórico e preferências de visualização de vídeos",
            "Comentários e interações no YouTube"
          ]
        },
        dataUsage: {
          title: "Como Usamos Suas Informações",
          icon: FaUserShield,
          content: "Usamos as informações coletadas para vários fins, incluindo:",
          items: [
            "Fornecer e melhorar nossos serviços",
            "Personalizar a experiência do usuário",
            "Analisar padrões de uso",
            "Comunicar-se com os usuários"
          ]
        },
        dataSharing: {
          title: "Compartilhamento e Divulgação de Dados",
          icon: FaUserShield,
          content: "Podemos compartilhar suas informações com:",
          items: [
            "Provedores de serviços e parceiros que auxiliam em nossas operações",
            "Autoridades legais quando exigido por lei",
            "Outras partes com seu consentimento"
          ]
        },
        youtubeApi: {
          title: "Serviços da API do YouTube",
          icon: FaDatabase,
          content: "Nosso aplicativo usa os Serviços da API do YouTube. Ao usar nosso serviço, você também está vinculado aos Termos de Serviço do YouTube. Além disso, a Política de Privacidade do Google se aplica ao nosso uso dos Serviços da API do YouTube."
        },
        dataSecurity: {
          title: "Armazenamento e Segurança de Dados",
          icon: FaLock,
          content: "Implementamos medidas de segurança apropriadas para proteger seus dados. As informações obtidas por meio dos Serviços da API do YouTube são armazenadas temporariamente e são atualizadas ou excluídas após 30 dias."
        },
        yourRights: {
          title: "Seus Direitos e Escolhas",
          content: "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode revogar nosso acesso aos seus dados do YouTube através da página de configurações de segurança do Google."
        },
        cookies: {
          title: "Cookies e Tecnologias Similares",
          content: "Usamos cookies e tecnologias de rastreamento similares para coletar e armazenar certas informações sobre seu uso de nossos serviços."
        },
        changes: {
          title: "Alterações nesta Política",
          content: "Podemos atualizar esta Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página."
        },
        contact: {
          title: "Entre em Contato",
          content: "Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:",
          items: [
            "Email: privacy@salesadvocates.com",
            "Endereço: 1309 Coffeen Ave STE 1200, Sheridan, WY 82801"
          ]
        }
      }
    }
  };
  
  const t = content[language];
  
  return (
    <InstitutionalWrapper>
      <PrivacyContainer>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <IconComponent icon={FaArrowLeft} />
          {t.back}
        </BackButton>
        <Logo>
          <IconComponent icon={BiPulse} />
          SALES ADVOCATES
        </Logo>
      </Header>
      
      <Content>
        <Title>{t.title}</Title>
        <LastUpdated>{t.lastUpdated}</LastUpdated>
        
        <Section>
          <SectionTitle>
            <SectionIcon><IconComponent icon={t.sections.introduction.icon} /></SectionIcon>
            {t.sections.introduction.title}
          </SectionTitle>
          <Paragraph>{t.sections.introduction.content}</Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>
            <SectionIcon><IconComponent icon={t.sections.dataCollection.icon} /></SectionIcon>
            {t.sections.dataCollection.title}
          </SectionTitle>
          <Paragraph>{t.sections.dataCollection.content}</Paragraph>
          <List>
            {t.sections.dataCollection.items.map((item: string, index: number) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
        
        <Section>
          <SectionTitle>
            <SectionIcon><IconComponent icon={t.sections.dataUsage.icon} /></SectionIcon>
            {t.sections.dataUsage.title}
          </SectionTitle>
          <Paragraph>{t.sections.dataUsage.content}</Paragraph>
          <List>
            {t.sections.dataUsage.items.map((item: string, index: number) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
        
        <Section>
          <SectionTitle>
            <SectionIcon><IconComponent icon={t.sections.dataSharing.icon} /></SectionIcon>
            {t.sections.dataSharing.title}
          </SectionTitle>
          <Paragraph>{t.sections.dataSharing.content}</Paragraph>
          <List>
            {t.sections.dataSharing.items.map((item: string, index: number) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
        
        <Section>
          <SectionTitle>
            <SectionIcon><IconComponent icon={t.sections.youtubeApi.icon} /></SectionIcon>
            {t.sections.youtubeApi.title}
          </SectionTitle>
          <Paragraph>
            {language === 'en' ? (
              <>Our application uses the YouTube API Services. By using our service, you are also bound by <Link href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube's Terms of Service</Link>. Additionally, Google's Privacy Policy applies to our use of the YouTube API Services. You can find Google's Privacy Policy at <Link href="http://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer">http://www.google.com/policies/privacy</Link>.</>
            ) : (
              <>Nosso aplicativo usa os Serviços da API do YouTube. Ao usar nosso serviço, você também está vinculado aos <Link href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">Termos de Serviço do YouTube</Link>. Além disso, a Política de Privacidade do Google se aplica ao nosso uso dos Serviços da API do YouTube. Você pode encontrar a Política de Privacidade do Google em <Link href="http://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer">http://www.google.com/policies/privacy</Link>.</>
            )}
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>
            <SectionIcon><IconComponent icon={t.sections.dataSecurity.icon} /></SectionIcon>
            {t.sections.dataSecurity.title}
          </SectionTitle>
          <Paragraph>{t.sections.dataSecurity.content}</Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>{t.sections.yourRights.title}</SectionTitle>
          <Paragraph>
            {language === 'en' ? (
              <>You have the right to access, correct, or delete your personal information. You can also revoke our access to your YouTube data through the <Link href="https://security.google.com/settings/security/permissions" target="_blank" rel="noopener noreferrer">Google security settings page</Link>.</>
            ) : (
              <>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode revogar nosso acesso aos seus dados do YouTube através da <Link href="https://security.google.com/settings/security/permissions" target="_blank" rel="noopener noreferrer">página de configurações de segurança do Google</Link>.</>
            )}
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>{t.sections.cookies.title}</SectionTitle>
          <Paragraph>{t.sections.cookies.content}</Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>{t.sections.changes.title}</SectionTitle>
          <Paragraph>{t.sections.changes.content}</Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>{t.sections.contact.title}</SectionTitle>
          <Paragraph>{t.sections.contact.content}</Paragraph>
          <List>
            {t.sections.contact.items.map((item: string, index: number) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
      </Content>
    </PrivacyContainer>
    </InstitutionalWrapper>
  );
};

export default Privacy;