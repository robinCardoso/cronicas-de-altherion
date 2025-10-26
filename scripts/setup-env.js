#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example');

console.log('🔧 Configuração do Arquivo .env.local');
console.log('=====================================\n');

// Verificar se o arquivo .env.local já existe
if (fs.existsSync(envPath)) {
  console.log('⚠️  O arquivo .env.local já existe!');
  rl.question('Deseja sobrescrever? (s/N): ', (answer) => {
    if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim') {
      createEnvFile();
    } else {
      console.log('❌ Operação cancelada.');
      rl.close();
    }
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log('\n📋 Configurando variáveis de ambiente...\n');
  
  // Ler o arquivo de exemplo
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  
  // Criar o arquivo .env.local
  fs.writeFileSync(envPath, envExample);
  
  console.log('✅ Arquivo .env.local criado com sucesso!');
  console.log('\n🔑 PRÓXIMOS PASSOS:');
  console.log('1. Abra o arquivo .env.local');
  console.log('2. Configure pelo menos uma das APIs de IA:');
  console.log('   - OpenAI API (pago): https://platform.openai.com/api-keys');
  console.log('   - Gemini API (gratuito): https://aistudio.google.com/app/apikey');
  console.log('3. Substitua "your_openai_api_key_here" ou "your_gemini_api_key_here" pela sua chave');
  console.log('4. Salve o arquivo');
  console.log('5. Execute: npm run dev');
  
  console.log('\n📖 Para mais detalhes, consulte: CONFIGURACAO-ENV.md');
  
  rl.close();
}
