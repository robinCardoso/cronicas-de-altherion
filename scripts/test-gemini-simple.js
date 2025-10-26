#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function testGeminiSimple() {
  console.log('🧪 Teste Simples do Gemini');
  console.log('==========================\n');

  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Chave:', apiKey ? `${apiKey.substring(0, 20)}...` : 'Não encontrada');

  if (!apiKey) {
    console.log('❌ Chave não encontrada');
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Conexão OK! Modelos disponíveis:', data.models?.length || 0);
    } else {
      const text = await response.text();
      console.log('❌ Erro:', text);
    }
  } catch (error) {
    console.log('❌ Erro de rede:', error.message);
  }
}

testGeminiSimple();
