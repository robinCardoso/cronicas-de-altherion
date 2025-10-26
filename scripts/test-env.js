#!/usr/bin/env node

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testando Configuração das Variáveis de Ambiente');
console.log('================================================\n');

// Verificar OpenAI API Key
const openaiKey = process.env.OPENAI_API_KEY;
if (openaiKey && openaiKey !== 'your_openai_api_key_here') {
  console.log('✅ OpenAI API Key: Configurada');
  console.log(`   Chave: ${openaiKey.substring(0, 20)}...`);
} else {
  console.log('❌ OpenAI API Key: Não configurada ou inválida');
}

// Verificar Gemini API Key
const geminiKey = process.env.GEMINI_API_KEY;
if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
  console.log('✅ Gemini API Key: Configurada');
  console.log(`   Chave: ${geminiKey.substring(0, 20)}...`);
} else {
  console.log('❌ Gemini API Key: Não configurada ou inválida');
}

// Verificar outras variáveis
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
console.log(`✅ App URL: ${appUrl || 'Não configurada'}`);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl && supabaseUrl !== 'your_supabase_url_here') {
  console.log('✅ Supabase URL: Configurada');
} else {
  console.log('⚠️  Supabase URL: Não configurada (opcional)');
}

console.log('\n📋 Resumo:');
if (openaiKey && openaiKey !== 'your_openai_api_key_here') {
  console.log('🎯 OpenAI API está pronta para uso!');
} else if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
  console.log('🎯 Gemini API está pronta para uso!');
} else {
  console.log('❌ Nenhuma API de IA configurada corretamente!');
  console.log('   Configure pelo menos uma das APIs no arquivo .env.local');
}

console.log('\n🚀 Para testar, acesse: http://localhost:3000');
