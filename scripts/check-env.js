#!/usr/bin/env node

/**
 * Script de Verificação de Variáveis de Ambiente
 * Crônicas de Altherion
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Verificando configuração do ambiente...\n');

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Verificar se o arquivo .env.local existe
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log(`${colors.blue}📁 Arquivo .env.local:${colors.reset}`);
if (envExists) {
  console.log(`${colors.green}✅ Arquivo .env.local encontrado${colors.reset}`);
} else {
  console.log(`${colors.red}❌ Arquivo .env.local não encontrado${colors.reset}`);
  console.log(`${colors.yellow}💡 Execute: cp env.example .env.local${colors.reset}`);
  process.exit(1);
}

// Carregar variáveis de ambiente
require('dotenv').config({ path: envPath });

// Verificar variáveis obrigatórias (pelo menos uma IA)
const requiredVars = [
  'OPENAI_API_KEY',
  'GEMINI_API_KEY'
];

// Verificar variáveis opcionais
const optionalVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

console.log(`\n${colors.blue}🤖 APIs de IA Disponíveis:${colors.reset}`);
let hasOpenAI = false;
let hasGemini = false;

// Verificar OpenAI
const openaiKey = process.env.OPENAI_API_KEY;
if (openaiKey && openaiKey !== 'your_openai_api_key_here' && openaiKey !== 'sk-your-openai-api-key-here') {
  console.log(`${colors.green}✅ OpenAI API: Configurada${colors.reset}`);
  hasOpenAI = true;
} else {
  console.log(`${colors.yellow}⚠️  OpenAI API: Não configurada${colors.reset}`);
}

// Verificar Gemini
const geminiKey = process.env.GEMINI_API_KEY;
if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
  console.log(`${colors.green}✅ Gemini API: Configurada${colors.reset}`);
  hasGemini = true;
} else {
  console.log(`${colors.yellow}⚠️  Gemini API: Não configurada${colors.reset}`);
}

const hasAnyAI = hasOpenAI || hasGemini;

console.log(`\n${colors.blue}🔧 Variáveis Opcionais:${colors.reset}`);
let optionalCount = 0;

optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== `your_${varName.toLowerCase()}_here`) {
    console.log(`${colors.green}✅ ${varName}: Configurada${colors.reset}`);
    optionalCount++;
  } else {
    console.log(`${colors.yellow}⚠️  ${varName}: Não configurada (opcional)${colors.reset}`);
  }
});

// Resumo
console.log(`\n${colors.bold}📊 Resumo da Configuração:${colors.reset}`);
console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);

if (hasAnyAI) {
  console.log(`${colors.green}✅ Configuração de IA: OK${colors.reset}`);
  if (hasOpenAI && hasGemini) {
    console.log(`${colors.green}🎯 Duas APIs configuradas: OpenAI (prioridade) + Gemini (fallback)${colors.reset}`);
  } else if (hasOpenAI) {
    console.log(`${colors.green}🎯 OpenAI configurado: Qualidade premium${colors.reset}`);
  } else {
    console.log(`${colors.green}🎯 Gemini configurado: Gratuito e eficiente${colors.reset}`);
  }
  console.log(`${colors.green}🎮 O jogo está pronto para funcionar!${colors.reset}`);
} else {
  console.log(`${colors.red}❌ Configuração de IA: Incompleta${colors.reset}`);
  console.log(`${colors.yellow}💡 Configure pelo menos uma API de IA no .env.local${colors.reset}`);
}

if (optionalCount > 0) {
  console.log(`${colors.green}✅ Recursos avançados: ${optionalCount}/${optionalVars.length} configurados${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠️  Recursos avançados: Não configurados${colors.reset}`);
  console.log(`${colors.yellow}💡 Configure Supabase para persistência de dados${colors.reset}`);
}

// Instruções
console.log(`\n${colors.bold}🚀 Próximos Passos:${colors.reset}`);
console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);

if (!hasAnyAI) {
  console.log(`${colors.yellow}1. Configure pelo menos uma API de IA:${colors.reset}`);
  console.log(`${colors.blue}   Opção A - OpenAI (Pago, Premium):${colors.reset}`);
  console.log(`   - Acesse: https://platform.openai.com/api-keys`);
  console.log(`   - Edite o arquivo .env.local`);
  console.log(`   - Substitua "sk-your-openai-api-key-here" pela sua chave`);
  console.log(`${colors.blue}   Opção B - Gemini (Gratuito):${colors.reset}`);
  console.log(`   - Acesse: https://aistudio.google.com/app/apikey`);
  console.log(`   - Crie uma chave API`);
  console.log(`   - Substitua "your_gemini_api_key_here" pela sua chave`);
}

if (optionalCount === 0) {
  console.log(`${colors.yellow}2. (Opcional) Configure Supabase:${colors.reset}`);
  console.log(`   - Acesse: https://supabase.com/dashboard`);
  console.log(`   - Crie um projeto`);
  console.log(`   - Copie as chaves para .env.local`);
}

console.log(`${colors.green}3. Inicie o projeto:${colors.reset}`);
console.log(`   npm run dev`);

console.log(`\n${colors.bold}🎯 Status: ${hasAnyAI ? 'Pronto para jogar!' : 'Configuração necessária'}${colors.reset}`);
console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
