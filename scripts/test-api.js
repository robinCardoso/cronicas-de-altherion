#!/usr/bin/env node

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' });

const OpenAI = require('openai');

async function testOpenAI() {
  console.log('🧪 Testando Conexão com OpenAI API');
  console.log('==================================\n');

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY não encontrada no .env.local');
    }

    console.log('✅ Chave API encontrada');
    console.log(`   Chave: ${apiKey.substring(0, 20)}...\n`);

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    console.log('🔄 Testando conexão com OpenAI...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Responda apenas 'Teste de conexão bem-sucedido!' em português."
        }
      ],
      max_tokens: 50,
    });

    const response = completion.choices[0]?.message?.content;
    console.log('✅ Conexão bem-sucedida!');
    console.log(`   Resposta: ${response}\n`);

    console.log('🎯 A API OpenAI está funcionando perfeitamente!');
    console.log('🚀 Você pode acessar o jogo em: http://localhost:3000');

  } catch (error) {
    console.error('❌ Erro ao testar OpenAI API:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('API key')) {
      console.log('💡 Soluções possíveis:');
      console.log('   1. Verifique se a chave está correta no .env.local');
      console.log('   2. Certifique-se de ter créditos na conta OpenAI');
      console.log('   3. Verifique se a chave não expirou');
    }
  }
}

testOpenAI();
