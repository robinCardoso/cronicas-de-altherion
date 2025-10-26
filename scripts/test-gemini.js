#!/usr/bin/env node

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' });

async function testGemini() {
  console.log('🧪 Testando Conexão com Gemini API');
  console.log('==================================\n');

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não encontrada no .env.local');
    }

    console.log('✅ Chave Gemini encontrada');
    console.log(`   Chave: ${apiKey.substring(0, 20)}...\n`);

    console.log('🔄 Testando conexão com Gemini...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Responda apenas 'Teste de conexão bem-sucedido!' em português."
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const geminiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    console.log('✅ Conexão com Gemini bem-sucedida!');
    console.log(`   Resposta: ${geminiResponse}\n`);

    console.log('🎯 A API Gemini está funcionando perfeitamente!');
    console.log('🚀 Você pode usar o Gemini como alternativa gratuita!');

  } catch (error) {
    console.error('❌ Erro ao testar Gemini API:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('API key')) {
      console.log('💡 Soluções possíveis:');
      console.log('   1. Verifique se a chave está correta no .env.local');
      console.log('   2. Certifique-se de ter acesso ao Gemini API');
    }
  }
}

testGemini();
