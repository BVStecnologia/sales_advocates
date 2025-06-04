const { createClient } = require('@supabase/supabase-js');

// Substitua com suas credenciais reais
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchComments() {
  try {
    const { data, error } = await supabase
      .from('Comentarios_Principais')
      .select('id_do_comentario, text_display, author_name, published_at')
      .limit(3);

    if (error) {
      console.error('Erro ao buscar comentários:', error);
      return;
    }

    console.log('3 comentários da tabela Comentarios_Principais:\n');
    data.forEach((comment, index) => {
      console.log(`${index + 1}. Comentário ID: ${comment.id_do_comentario}`);
      console.log(`   Autor: ${comment.author_name}`);
      console.log(`   Texto: ${comment.text_display}`);
      console.log(`   Data: ${comment.published_at}`);
      console.log('---');
    });
  } catch (err) {
    console.error('Erro:', err);
  }
}

fetchComments();