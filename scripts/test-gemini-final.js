#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function testGeminiFinal() {
  console.log('🧪 Teste Final do Gemini');
  console.log('========================\n');

  const apiKey = process.env.GEMINI_API_KEY;
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Responda apenas 'Teste de conexão bem-sucedido!' em português."
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 50,
        }
      })
    });

    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('✅ Sucesso!');
      console.log('Resposta:', text);
    } else {
      const error = await response.text();
      console.log('❌ Erro:', error);
    }
  } catch (error) {
    console.log('❌ Erro:', error.message);
  }
}

testGeminiFinal();
