import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import { IconComponent } from '../utils/IconHelper';
import { useProject } from '../context/ProjectContext';
import { supabase, callRPC } from '../lib/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tags?: string[];
  duration?: string;
}

interface Comment {
  id: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  publishedAt: string;
  likeCount: number;
  totalReplyCount: number;
  videoId: string;
  parentId?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: ${props => props.theme.colors.bg.secondary};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  
  svg {
    color: #FF0000;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VideoList = styled.div`
  width: 400px;
  background: ${props => props.theme.colors.bg.secondary};
  border-right: 1px solid ${props => props.theme.colors.border};
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const VideoItem = styled.div<{ selected?: boolean }>`
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.selected ? props.theme.colors.primary + '10' : 'transparent'};
  
  &:hover {
    background: ${props => props.theme.colors.bg.hover};
  }
`;

const VideoThumbnail = styled.img`
  width: 120px;
  height: 67px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VideoTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const VideoStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
  
  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const CommentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CommentHeader = styled.div`
  padding: 20px;
  background: ${props => props.theme.colors.bg.secondary};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const CommentCount = styled.h2`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border}20;
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentDate = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 400;
`;

const CommentText = styled.div`
  margin: 8px 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary}10;
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ReplyBox = styled.div`
  margin-top: 12px;
  margin-left: 52px;
  padding: 12px;
  background: ${props => props.theme.colors.bg.secondary};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const ReplyInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  color: ${props => props.theme.colors.text.primary};
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ReplyActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: flex-end;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.text.secondary};
  border: 1px solid ${props => props.primary ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: ${props => props.theme.colors.text.secondary};
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: ${props => props.theme.colors.text.secondary};
  text-align: center;
  
  svg {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background: ${props => props.theme.colors.error}20;
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: 8px;
  color: ${props => props.theme.colors.error};
  margin: 16px;
  
  button {
    margin-top: 12px;
  }
`;

export default function VideoManager() {
  const { currentProject } = useProject();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingStats, setUpdatingStats] = useState(false);

  const t = {
    pt: {
      title: 'Meu Canal',
      noVideos: 'Nenhum vídeo encontrado',
      noComments: 'Nenhum comentário encontrado',
      selectVideo: 'Selecione um vídeo para ver os comentários',
      comments: 'comentários',
      reply: 'Responder',
      cancel: 'Cancelar',
      send: 'Enviar',
      loading: 'Carregando...',
      error: 'Erro ao carregar dados',
      views: 'visualizações',
      likes: 'curtidas',
      replyPlaceholder: 'Escreva sua resposta...',
      publishedAt: 'Publicado em',
      noIntegration: 'Integração do YouTube não configurada',
      updateStats: 'Atualizar Estatísticas',
      duration: 'Duração',
      tags: 'Tags',
      authExpired: 'Sua autenticação do YouTube expirou. Por favor, vá para Integrações e reconecte sua conta.',
      reconnect: 'Ir para Integrações'
    },
    en: {
      title: 'My Channel',
      noVideos: 'No videos found',
      noComments: 'No comments found',
      selectVideo: 'Select a video to view comments',
      comments: 'comments',
      reply: 'Reply',
      cancel: 'Cancel',
      send: 'Send',
      loading: 'Loading...',
      error: 'Error loading data',
      views: 'views',
      likes: 'likes',
      replyPlaceholder: 'Write your reply...',
      publishedAt: 'Published at',
      noIntegration: 'YouTube integration not configured',
      updateStats: 'Update Stats',
      duration: 'Duration',
      tags: 'Tags',
      authExpired: 'Your YouTube authentication has expired. Please go to Integrations and reconnect your account.',
      reconnect: 'Go to Integrations'
    }
  };

  const texts = t[language as keyof typeof t];

  useEffect(() => {
    console.log('\n\n🎬 MY CHANNEL - useEffect triggered');
    console.log('🎬 Current Project:', currentProject);
    console.error('MY CHANNEL PAGE LOADED - Project ID:', currentProject?.id || 'NO PROJECT');
    if (currentProject?.id) {
      console.log('🎬 Project found, loading videos...');
      loadVideos();
    } else {
      console.log('🎬 No project found!');
      console.error('NO PROJECT SELECTED IN MY CHANNEL');
    }
  }, [currentProject]);


  const loadVideos = async () => {
    console.log('=== INICIANDO loadVideos ===');
    console.log('currentProject:', currentProject);
    
    if (!currentProject?.id) {
      console.log('Sem projeto atual, saindo...');
      return;
    }

    setLoadingVideos(true);
    setError(null);

    try {
      // Verificar se existe integração do YouTube
      console.log('Verificando integração para projeto:', currentProject.id);
      const { data: integration, error: integrationError } = await supabase
        .from('Integrações')
        .select('*')
        .eq('PROJETO id', currentProject.id)
        .eq('Tipo de integração', 'youtube')
        .eq('ativo', true)
        .single();

      console.log('Integração encontrada:', integration);
      console.log('Erro ao buscar integração:', integrationError);

      if (!integration) {
        setError(texts.noIntegration);
        setLoadingVideos(false);
        return;
      }

      // Usar a nova RPC que já busca o canal automaticamente
      console.log('Chamando get_my_channel_videos com project_id:', currentProject.id);
      
      const response = await callRPC('get_my_channel_videos', {
        max_results: 50,
        order_by: 'date',
        page_token: null,
        project_id: currentProject.id,
        published_after: null
      });

      console.log('Resposta do get_my_channel_videos:', response);
      console.log('Tipo da resposta:', typeof response);
      console.log('É array?', Array.isArray(response));

      // Verificar diferentes formatos de resposta
      let videosData = null;
      
      // Formato 1: Array direto
      if (Array.isArray(response)) {
        videosData = response;
      }
      // Formato 2: Objeto com propriedade data
      else if (response && response.data && Array.isArray(response.data)) {
        videosData = response.data;
      }
      // Formato 3: Objeto com propriedade items (formato YouTube API)
      else if (response && response.items && Array.isArray(response.items)) {
        videosData = response.items;
        console.log('📌 Usando formato YouTube API - response.items');
      }
      // Formato 4: Array dentro do primeiro elemento
      else if (response && response[0] && Array.isArray(response[0])) {
        videosData = response[0];
      }

      console.log('Videos data extraído:', videosData);

      if (videosData && videosData.length > 0) {
        // Detectar o formato dos dados e mapear adequadamente
        const firstVideo = videosData[0];
        console.log('Primeiro vídeo:', firstVideo);
        
        let formattedVideos;
        
        // Se tem video_id, é o formato esperado da RPC
        if (firstVideo.video_id) {
          console.log('🔍 Formato do video_id:', firstVideo.video_id);
          console.log('🔍 Tipo do video_id:', typeof firstVideo.video_id);
          
          formattedVideos = videosData.map((video: any) => {
            // Verificar se video_id é string ou objeto
            const videoId = typeof video.video_id === 'object' && video.video_id !== null 
              ? video.video_id.video_id || video.video_id.id || JSON.stringify(video.video_id)
              : video.video_id;
              
            console.log('Video ID extraído:', videoId, 'do objeto:', video.video_id);
            
            return {
              id: videoId,
              title: video.title,
              description: video.description || '',
              thumbnail: video.thumbnail_url,
              publishedAt: video.published_at,
              viewCount: video.view_count || 0,
              likeCount: video.like_count || 0,
              commentCount: video.comment_count || 0
            };
          });
        }
        // Se tem id e snippet, é formato YouTube API
        else if (firstVideo.id && firstVideo.snippet) {
          console.log('📌 Detectado formato YouTube API');
          formattedVideos = videosData.map((item: any) => {
            // O ID pode vir como objeto {kind: "youtube#video", videoId: "abc123"}
            const videoId = typeof item.id === 'object' && item.id.videoId 
              ? item.id.videoId 
              : typeof item.id === 'string' 
                ? item.id 
                : JSON.stringify(item.id);
                
            console.log('Video ID extraído (YouTube API):', videoId, 'do objeto:', item.id);
            
            return {
              id: videoId,
              title: item.snippet.title,
              description: item.snippet.description || '',
              thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
              publishedAt: item.snippet.publishedAt,
              viewCount: parseInt(item.statistics?.viewCount || '0'),
              likeCount: parseInt(item.statistics?.likeCount || '0'),
              commentCount: parseInt(item.statistics?.commentCount || '0')
            };
          });
        }
        // Formato já está correto
        else if (firstVideo.id && firstVideo.title) {
          formattedVideos = videosData;
        }

        console.log('Vídeos formatados:', formattedVideos);
        
        if (formattedVideos) {
          setVideos(formattedVideos);
          
          if (formattedVideos.length > 0) {
            setSelectedVideo(formattedVideos[0]);
            // Carregar comentários do primeiro vídeo automaticamente
            loadComments(formattedVideos[0].id);
            
            // Buscar estatísticas detalhadas dos vídeos depois de exibir
            console.log('🎯 CHAMANDO updateVideoStats com', formattedVideos.length, 'vídeos');
            updateVideoStats(formattedVideos);
          }
        }
      } else {
        setVideos([]);
        console.log('Nenhum vídeo encontrado no canal');
      }
    } catch (err) {
      console.error('Error loading videos:', err);
      setError(texts.error);
    } finally {
      setLoadingVideos(false);
    }
  };

  const updateVideoStats = async (videos: Video[]) => {
    if (!currentProject?.id || videos.length === 0) return;

    setUpdatingStats(true);
    try {
      // Pegar os IDs dos vídeos
      const videoIds = videos.map(v => v.id).join(',');
      
      console.log('=== ATUALIZANDO ESTATÍSTICAS ===');
      console.log('Vídeos recebidos:', videos);
      console.log('IDs dos vídeos:', videoIds);
      console.log('Project ID:', currentProject.id);
      
      const response = await callRPC('get_youtube_video_stats', {
        project_id: currentProject.id,
        video_ids: videoIds,
        parts: 'statistics,snippet,contentDetails'
      });

      console.log('Resposta COMPLETA de get_youtube_video_stats:', response);
      console.log('Tipo da resposta:', typeof response);
      console.log('É array?', Array.isArray(response));

      // Verificar diferentes formatos de resposta da RPC
      let items: any[] | null = null;
      
      // Formato 1: Array direto de items
      if (Array.isArray(response)) {
        console.log('✅ Resposta é array direto!');
        items = response;
      }
      // Formato 2: response[0].get_youtube_video_stats.items (formato antigo)
      else if (response && response[0]?.get_youtube_video_stats?.items) {
        console.log('✅ Encontrou items no formato antigo!');
        items = response[0].get_youtube_video_stats.items;
      }
      // Formato 3: response.items direto (formato novo)
      else if (response && response.items && Array.isArray(response.items)) {
        console.log('✅ Encontrou items no formato novo!');
        items = response.items;
      }
      // Formato 4: response.data
      else if (response && response.data && Array.isArray(response.data)) {
        console.log('✅ Encontrou items em response.data!');
        items = response.data;
      }
      // Formato 5: Primeiro elemento do array contém items
      else if (Array.isArray(response) && response[0]?.items) {
        console.log('✅ Encontrou items em response[0].items!');
        items = response[0].items;
      }
      
      console.log('Items extraídos:', items);
      
      if (items && Array.isArray(items) && items.length > 0) {
        console.log(`📊 Processando ${items.length} items de estatísticas`);
        
        // Atualizar os vídeos com as estatísticas mais recentes
        const updatedVideos = videos.map(video => {
          console.log(`Procurando stats para vídeo ${video.id}`);
          const stats = items!.find((item: any) => item.id === video.id);
          
          if (stats) {
            console.log(`✅ Encontrou stats para ${video.id}:`, stats);
            
            // Atualizar também o vídeo selecionado se for o mesmo
            const updatedVideo = {
              ...video,
              viewCount: parseInt(stats.statistics?.viewCount || '0'),
              likeCount: parseInt(stats.statistics?.likeCount || '0'),
              commentCount: parseInt(stats.statistics?.commentCount || '0'),
              duration: stats.contentDetails?.duration || '',
              tags: stats.snippet?.tags || []
            };
            
            // Se este é o vídeo selecionado, atualizar também
            if (selectedVideo && selectedVideo.id === video.id) {
              setSelectedVideo(updatedVideo);
            }
            
            return updatedVideo;
          } else {
            console.log(`❌ Não encontrou stats para ${video.id}`);
          }
          return video;
        });

        console.log('✅ Vídeos com estatísticas atualizadas:', updatedVideos);
        setVideos(updatedVideos);
      } else {
        console.log('❌ Resposta não tem o formato esperado ou está vazia');
        console.log('response:', response);
        console.log('items:', items);
        
        // Log mais detalhado para debug
        if (response) {
          console.log('Chaves do response:', Object.keys(response));
          console.log('response stringified:', JSON.stringify(response, null, 2));
        }
      }
    } catch (err) {
      console.error('Erro ao atualizar estatísticas dos vídeos:', err);
      // Não fazer nada se der erro, manter os vídeos como estão
    } finally {
      setUpdatingStats(false);
    }
  };

  const loadComments = async (videoId: string) => {
    if (!currentProject?.id) return;

    setLoadingComments(true);
    setComments([]);

    try {
      console.log('🔍 Carregando comentários para o vídeo:', videoId);
      
      const response = await callRPC('get_youtube_video_comments', {
        project_id: currentProject.id,
        video_id: videoId,
        max_results: 100,
        page_token: null
      });

      console.log('📝 Resposta de get_youtube_video_comments:', response);

      // Verificar diferentes formatos de resposta
      let commentsData = null;
      
      if (Array.isArray(response)) {
        commentsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        commentsData = response.data;
      } else if (response && response.items && Array.isArray(response.items)) {
        commentsData = response.items;
      }

      if (commentsData && commentsData.length > 0) {
        console.log(`✅ ${commentsData.length} comentários encontrados`);
        console.log('Primeiro comentário (para debug):', commentsData[0]);
        console.log('Campos do primeiro comentário:', Object.keys(commentsData[0]));
        
        // Mapear os comentários do formato YouTube API para o formato esperado
        const formattedComments = commentsData.map((item: any) => {
          const topLevelComment = item.snippet?.topLevelComment?.snippet || item.snippet;
          
          return {
            id: item.id,
            authorDisplayName: topLevelComment.authorDisplayName || 'Unknown',
            authorProfileImageUrl: topLevelComment.authorProfileImageUrl || '',
            textDisplay: topLevelComment.textDisplay || topLevelComment.textOriginal || '',
            publishedAt: topLevelComment.publishedAt || '',
            likeCount: topLevelComment.likeCount || 0,
            totalReplyCount: item.snippet?.totalReplyCount || 0,
            videoId: topLevelComment.videoId || videoId,
            parentId: topLevelComment.parentId
          };
        });
        
        console.log('Comentários formatados:', formattedComments);
        setComments(formattedComments);
      } else {
        console.log('❌ Nenhum comentário encontrado');
        setComments([]);
      }
    } catch (err) {
      console.error('❌ Error loading comments:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    // Carregar comentários quando selecionar um vídeo
    loadComments(video.id);
    console.log('📹 Vídeo selecionado:', video.id, video.title);
  };

  const handleReply = async () => {
    if (!replyingTo || !replyText.trim() || !currentProject?.id) return;

    setSubmittingReply(true);

    try {
      await callRPC('reply_to_comment', {
        p_comment_id: replyingTo,
        p_reply_text: replyText,
        p_project_id: currentProject.id
      });

      // Recarregar comentários
      if (selectedVideo) {
        await loadComments(selectedVideo.id);
      }

      setReplyingTo(null);
      setReplyText('');
    } catch (err) {
      console.error('Error replying to comment:', err);
    } finally {
      setSubmittingReply(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    // Log para debug
    console.log('Formatando data:', dateString);
    
    if (!dateString) return '';
    
    // Tentar diferentes formatos de data
    let date = new Date(dateString);
    
    // Se a data é inválida, tentar outros formatos
    if (isNaN(date.getTime())) {
      // Tentar formato ISO sem timezone
      if (dateString.includes('T')) {
        date = new Date(dateString.replace(' ', 'T') + 'Z');
      }
      // Se ainda for inválido, retornar a string original
      if (isNaN(date.getTime())) {
        console.warn('Data inválida:', dateString);
        return dateString;
      }
    }
    
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    const locale = language === 'pt' ? 'pt-BR' : 'en-US';
    return date.toLocaleDateString(locale, options);
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return '';
    
    // Formato YouTube: PT14M58S (14 minutos e 58 segundos)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return duration;
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <IconComponent icon={FaIcons.FaYoutube} />
          {texts.title}
        </Title>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            onClick={() => {
              console.log('🔴 BOTÃO CLICADO! Videos:', videos.length);
              if (videos.length > 0) {
                updateVideoStats(videos);
              }
            }}
            disabled={updatingStats || videos.length === 0}
          >
            {updatingStats ? <IconComponent icon={FaIcons.FaSpinner} /> : <IconComponent icon={FaIcons.FaSync} />}
            {' '}{texts.updateStats}
          </Button>
        </div>
      </Header>

      <MainContent>
        <VideoList>
          {loadingVideos ? (
            <LoadingContainer>
              <IconComponent icon={FaIcons.FaSpinner} />
            </LoadingContainer>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : videos.length === 0 ? (
            <EmptyState>
              <IconComponent icon={FaIcons.FaVideo} />
              <div>{texts.noVideos}</div>
            </EmptyState>
          ) : (
            videos.map(video => (
              <VideoItem
                key={video.id}
                selected={selectedVideo?.id === video.id}
                onClick={() => handleVideoSelect(video)}
              >
                <VideoThumbnail src={video.thumbnail} alt={video.title} />
                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoStats>
                    <span>
                      <IconComponent icon={FaIcons.FaEye} />
                      {formatNumber(video.viewCount)}
                    </span>
                    <span>
                      <IconComponent icon={FaIcons.FaThumbsUp} />
                      {formatNumber(video.likeCount)}
                    </span>
                    <span>
                      <IconComponent icon={FaIcons.FaComments} />
                      {formatNumber(video.commentCount)}
                    </span>
                    {video.duration && (
                      <span>
                        <IconComponent icon={FaIcons.FaClock} />
                        {formatDuration(video.duration)}
                      </span>
                    )}
                  </VideoStats>
                </VideoInfo>
              </VideoItem>
            ))
          )}
        </VideoList>

        <CommentSection>
          {selectedVideo ? (
            <>
              <CommentHeader>
                <CommentCount>
                  <IconComponent icon={FaIcons.FaComments} />
                  {selectedVideo.commentCount} {texts.comments}
                </CommentCount>
              </CommentHeader>

              <CommentList>
                {loadingComments ? (
                  <LoadingContainer>
                    <IconComponent icon={FaIcons.FaSpinner} />
                  </LoadingContainer>
                ) : comments.length === 0 ? (
                  <EmptyState>
                    <IconComponent icon={FaIcons.FaComments} />
                    <div>{texts.noComments}</div>
                  </EmptyState>
                ) : (
                  comments.map(comment => (
                    <CommentItem key={comment.id}>
                      <AuthorAvatar src={comment.authorProfileImageUrl} alt={comment.authorDisplayName} />
                      <CommentContent>
                        <AuthorName>
                          {comment.authorDisplayName}
                          <CommentDate>• {formatDate(comment.publishedAt)}</CommentDate>
                        </AuthorName>
                        <CommentText>{comment.textDisplay}</CommentText>
                        <CommentActions>
                          <ActionButton>
                            <IconComponent icon={FaIcons.FaThumbsUp} />
                            {comment.likeCount > 0 && formatNumber(comment.likeCount)}
                          </ActionButton>
                          <ActionButton
                            onClick={() => setReplyingTo(comment.id)}
                            disabled={replyingTo === comment.id}
                          >
                            <IconComponent icon={FaIcons.FaReply} />
                            {texts.reply}
                          </ActionButton>
                        </CommentActions>

                        {replyingTo === comment.id && (
                          <ReplyBox>
                            <ReplyInput
                              placeholder={texts.replyPlaceholder}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              disabled={submittingReply}
                            />
                            <ReplyActions>
                              <Button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                disabled={submittingReply}
                              >
                                {texts.cancel}
                              </Button>
                              <Button
                                primary
                                onClick={handleReply}
                                disabled={!replyText.trim() || submittingReply}
                              >
                                {submittingReply ? <IconComponent icon={FaIcons.FaSpinner} /> : texts.send}
                              </Button>
                            </ReplyActions>
                          </ReplyBox>
                        )}
                      </CommentContent>
                    </CommentItem>
                  ))
                )}
              </CommentList>
            </>
          ) : (
            <EmptyState>
              <IconComponent icon={FaIcons.FaVideo} />
              <div>{texts.selectVideo}</div>
            </EmptyState>
          )}
        </CommentSection>
      </MainContent>
    </Container>
  );
}