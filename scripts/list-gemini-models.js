#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function listGeminiModels() {
  console.log('📋 Modelos Disponíveis no Gemini');
  console.log('=================================\n');

  const apiKey = process.env.GEMINI_API_KEY;
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Modelos encontrados:', data.models?.length || 0);
      console.log('\n📝 Modelos com suporte a generateContent:');
      
      data.models?.forEach(model => {
        if (model.supportedGenerationMethods?.includes('generateContent')) {
          console.log(`  - ${model.name}`);
        }
      });
    } else {
      console.log('❌ Erro ao listar modelos:', response.status);
    }
  } catch (error) {
    console.log('❌ Erro:', error.message);
  }
}

listGeminiModels();
